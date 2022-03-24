import React from 'react';
import { render  } from '@testing-library/react';
import App from './App';

test('My app loaded', () => {
  render(<App />);
  // const linkElement = screen.getByText(/Heating/i);
  // expect(linkElement).toBeInTheDocument();
});
