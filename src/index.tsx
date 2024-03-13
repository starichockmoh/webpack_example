import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/router/router';

const root = document.getElementById('root');

if (!root) {
  throw new Error('element root not found');
}

const container = createRoot(root);

container.render(<RouterProvider router={router} />);
