import { render, screen } from '@testing-library/react';//import for fns needed,render to render,screen provide utilities for quering on screen
import App from './App';

test('renders learn react link', () => {//defines test case
  render(<App />);//render app component
  const linkElement = screen.getByText(/learn react/i);//returns DOM element that matches text query
  expect(linkElement).toBeInTheDocument();//if not present fails
});
