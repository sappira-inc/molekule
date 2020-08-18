import React from 'react';

const style = { backgroundColor: '#3E4D4D', borderRadius: 4, width: '100%', color: 'white', padding: '12px' };

const Box = ({ children }: any) => <div style={style}>{children}</div>;

export default Box;
