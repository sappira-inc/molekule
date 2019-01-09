import React from 'react';
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

const defaultOptions = {
  className: 'linkify-container',
  renderers: {
    paragraph: 'div',
    root: props => <Root {...props} />,
    link: props => <Link {...props} />,
  },
};

export default props => (
  <ReactMarkdown {...defaultOptions} {...props}>
    {props.children}
  </ReactMarkdown>
);
