import { Routes, Route } from 'react-router-dom';

import LoginForm from './components/LoginForm';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

const App = () => (
 <Routes>
    <Route path="/login" element={<LoginForm />} />
    
    <Route path="/" element={<ProtectedRoute element={<Home />} />} />
  </Routes>
);

 
export default App;
