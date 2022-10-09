import React from 'react';
import { render, screen } from '@testing-library/react';
import App from '../components/App';

test('renders learn react link', () => {
  const element = render(<App />);
  expect(element.baseElement).toBeDefined();
});
