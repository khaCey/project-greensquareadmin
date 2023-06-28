import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { EmployeeDataProvider } from './contexts/EmployeeDataContext';

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StrictMode>
    <EmployeeDataProvider>
      <App />
    </EmployeeDataProvider>
  </StrictMode>
);
