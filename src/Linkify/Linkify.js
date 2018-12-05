import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  a {
    color: inherit;
    text-decoration: underline;
  }
`;

const escapeHtmlChars = (unsafe = '') =>
  unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');

const REGEX = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#/%?=~_|!:,.;]*[-A-Z0-9+&@#/%=~_|])/gi;

const parse = string =>
  escapeHtmlChars(string).replace(
    REGEX,
    url => `<a target="_blank" rel="noopener noreferrer" href="${url}">${url}</a>`
  );

const Linkify = props => (
  <Container style={props.style || {}} dangerouslySetInnerHTML={{ __html: parse(props.children) }} />
);

export default Linkify;
