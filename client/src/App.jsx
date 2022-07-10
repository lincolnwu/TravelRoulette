import logo from './logo.svg';
import './App.css';
import { GlobalLocation, HomePage, LocationDetails } from './components'
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/places/:location" element={<LocationDetails />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
