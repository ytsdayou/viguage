import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
container.classList.add('bg-gray-100');
const root = createRoot(container);
root.render(<App />);
