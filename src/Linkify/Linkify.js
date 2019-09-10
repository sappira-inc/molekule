import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

const Link = styled.a.attrs(() => ({
  target: '_blank',
  rel: 'noopener noreferrer',
}))`
  color: inherit;
  text-decoration: underline;
`;

const Root = styled.div`
  white-space: pre-wrap;

  p:first-child {
    margin-top: 0;
  }

  div + div {
    margin-top: 8px;
  }
`;

/** Automatically parse links contained in a body of text. All props except for `linkStyle` are passed through directly to [react-markdown](https://github.com/rexxars/react-markdown), which `Linkify` uses internally. */
export default function Linkify({ source, linkStyle, renderers, ...props }) {
  if (typeof source !== 'string') {
    throw new Error('Molekule: source prop must be a valid markdown string');
  }

  // Convert all carriage returns to new lines
  const markdownString = source.replace(/\r/g, '\n');

  return (
    <ReactMarkdown
      source={markdownString}
      renderers={{
        paragraph: 'div',
        root: p => <Root {...p} />,
        link: p => <Link {...p} style={linkStyle} />,
        code: ({ value }) => <div>{value}</div>,
        ...renderers,
      }}
      {...props}
    />
  );
}

Linkify.propTypes = {
  source: PropTypes.string,
  className: PropTypes.string,
  renderers: PropTypes.shape(),
  linkStyle: PropTypes.shape(),
};

Linkify.defaultProps = {
  className: 're-linkify',
  renderers: {},
};
