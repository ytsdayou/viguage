import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './page/home';
import './static/css/index.css';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}
