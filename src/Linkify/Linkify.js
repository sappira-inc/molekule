import React from 'react';

const URL_REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

const detectLinks = ({ children, linkStyle = {} }) =>
  React.Children.map(children, child => {
    if (!child) return null;

    if (typeof child === 'string') {
      const words = child.split(' ');
      return words.map((word, index) => {
        const isLastWord = words.length === index - 1;

        if (URL_REGEX.test(word)) {
          return (
            <>
              <a
                key={word}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'inherit',
                  textDecoration: 'underline',
                  ...linkStyle,
                }}
                href={word}>
                {word}
              </a>

              {isLastWord ? '' : ' '}
            </>
          );
        }

        return isLastWord ? word : `${word} `;
      });
    }

    if (React.isValidElement(child)) {
      return detectLinks({ children: child.props.children, linkStyle });
    }

    return child;
  });

export default props => detectLinks(props);
