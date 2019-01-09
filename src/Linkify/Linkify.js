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

const defaultOptions = {
  className: 'linkify-container',
  renderers: {
    paragraph: 'span',
    link: props => <Link {...props} />,
  },
};

export default props => (
  <ReactMarkdown {...defaultOptions} {...props}>
    {props.children}
  </ReactMarkdown>
);
