import React from 'react';

const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

const Link = ({ href, linkStyle }) => (
  <a
    target="_blank"
    rel="noopener noreferrer"
    style={{
      color: 'inherit',
      textDecoration: 'underline',
      ...linkStyle,
    }}
    href={href}>
    {href}
  </a>
);

const linkify = ({ children, linkStyle = {} }) =>
  React.Children.map(children, child => {
    if (!child) return null;

    if (typeof child === 'string') {
      const matches = child.match(URL_REGEX);

      if (!matches) {
        return child;
      }

      // Clone the string for manipulation
      let string = `${child}`;

      // Run through the url matches to create our array of string parts and Link components
      const stringParts = matches.reduce((parts, url) => {
        const urlStartIndex = string.indexOf(url);
        const partBeforeUrl = string.substring(0, urlStartIndex);
        parts.push(partBeforeUrl, <Link href={url} linkStyle={linkStyle} />);
        string = string.substring(urlStartIndex + url.length);
        return parts;
      }, []);

      // Add any leftovers after the last url
      return [...stringParts, string].filter(Boolean);
    }

    return linkify({ children: child.props.children, linkStyle });
  });

export default props => linkify(props);
