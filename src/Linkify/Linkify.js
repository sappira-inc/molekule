import React from 'react';
import PropTypes from 'prop-types';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Link = styled.a.attrs(() => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  color: inherit;
  text-decoration: underline;
`;

const Root = styled.div`
  div:nth-child(n + 2) {
    margin-top: 5px;
  }
`;

export default function Linkify({ children, source, linkStyle, renderers, ...props }) {
  let linkContent = children || source;
  if (typeof linkContent === 'string') linkContent = linkContent.replace(/\r/g, '\n').replace(/[ \t]+/g, ' ');
  return (
    <ReactMarkdown
      source={renderToStaticMarkup(linkContent)}
      renderers={{
        paragraph: 'div',
        root: p => <Root {...p} />,
        link: p => <Link {...p} style={linkStyle} />,
        ...renderers,
      }}
      {...props}
    />
  );
}

Linkify.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  source: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  className: PropTypes.string,
  renderers: PropTypes.shape(),
  linkStyle: PropTypes.shape(),
};

Linkify.defaultProps = {
  className: 're-linkify',
  renderers: {},
};
