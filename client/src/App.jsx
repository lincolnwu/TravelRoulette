import logo from './logo.svg';
import './App.css';
import { ErrorPage, GlobalLocation, HomePage, LocationDetails, RegionPage } from './components'
import { BrowserRouter as Router, Routes, Route, NavLink} from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/*" element={<ErrorPage />} />
          <Route path="/places/:location" element={<LocationDetails />} />
          <Route path="/places/*" element={<ErrorPage />} />
          <Route path="/region/:area" element={<RegionPage />} />
        </Routes>
      </div>
    </Router>
    
  );
}

export default App;
