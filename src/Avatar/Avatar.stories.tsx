import React from 'react';
import Avatar from './Avatar';

export default {
  title: 'Components|Avatar',
  component: Avatar,
};

export const Basic = () => (
  <>
    <Avatar size={25} name="Potato Head" />
    <Avatar size={50} name="Morty" />
    <Avatar size={30} src="https://help.github.com/assets/images/help/profile/identicon.png" />
  </>
);
