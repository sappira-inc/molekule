import React from 'react';
import { OrderedList } from './OrderedList';

export default {
  title: 'Components|OrderedList',
  component: OrderedList,
};

export const Basic = () => (
  <OrderedList>
    <li>Apple</li>
    <li>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore
      magna aliqua.
    </li>
    <li>Peaches</li>
  </OrderedList>
);
