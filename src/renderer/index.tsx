import { createRoot } from 'react-dom/client';
import App from './App';

const container = document.getElementById('root') as HTMLElement;
container.classList.add('container');
const root = createRoot(container);
root.render(<App />);
