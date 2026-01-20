import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { initDB } from './src/database/db';

export default function App() {
  useEffect(() => {
    initDB();
  }, []);
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

