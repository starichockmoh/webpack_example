import { Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { App } from '@/components/App';
import { About } from '@/pages/About';
import { Shop } from '@/pages/Shop';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/about',
        element: (
          <Suspense fallback={'Ожидайте...'}>
            <About />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={'Ожидайте...'}>
            <Shop />
          </Suspense>
        ),
      },
    ],
  },
]);
