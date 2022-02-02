import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('My app loaded', () => {
  render(<App />);
  const linkElement = screen.getByText(/This is my app/i);
  expect(linkElement).toBeInTheDocument();
});
