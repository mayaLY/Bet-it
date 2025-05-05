// App.tsx
import React from 'react';
import AppNavigator from './router/AppNavigator';
import { ThemeProvider } from './context/Theme/ThemeContext';

export default function App() {
  return (
    <ThemeProvider>
      <AppNavigator />
    </ThemeProvider>
  );
}
