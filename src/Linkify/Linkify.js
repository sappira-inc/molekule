import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import ReactMarkdown from 'react-markdown';
import styled from 'styled-components';

const Link = styled.a.attrs({
  target: '_blank',
  rel: 'noopener noreferrer',
})`
  color: inherit;
  text-decoration: underline;
`;

const Root = styled.div`
  div:nth-child(n + 2) {
    margin-top: 5px;
  }
`;

const defaultOptions = ({ children, source, linkStyle, ...props }) => ({
  source: renderToStaticMarkup(children || source),
  className: 'linkify-container',
  renderers: {
    paragraph: 'div',
    root: p => <Root {...p} />,
    link: p => <Link {...p} style={linkStyle} />,
  },
  ...props,
});

export default props => <ReactMarkdown {...defaultOptions(props)} />;
