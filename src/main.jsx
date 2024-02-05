import { Suspense } from 'react';
import { RecoilRoot } from 'recoil';
import ReactDOM from 'react-dom/client';
import { SnackbarProvider } from 'notistack';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

import App from './app';

// ----------------------------------------------------------------------

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <HelmetProvider>
    <RecoilRoot>
      <BrowserRouter>
        <Suspense>
          <SnackbarProvider maxSnack={3}>
            <App />
          </SnackbarProvider>
        </Suspense>
      </BrowserRouter>
    </RecoilRoot>
  </HelmetProvider>
);
