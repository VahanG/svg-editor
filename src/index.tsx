import { createRoot } from 'react-dom/client';

import Providers from './providers';

import App from './App';

const root = createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Providers>
    <App />
  </Providers>,
);
