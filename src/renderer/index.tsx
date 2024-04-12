import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './libs/store';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
container.classList.add('bg-gray-100');
const root = createRoot(container);
root.render(
  <Provider store={store}>
    <App />
  </Provider>,
);
