import '@babel/polyfill';
import 'jest-styled-components';
import 'jest-dom/extend-expect';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });
