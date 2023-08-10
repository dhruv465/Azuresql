import './App.css';
import Registration from './Registration';
import SubmittedData from './SubmittedData';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'; // Note the addition of 'Routes'
function App() {
  return (
    <Router>
     
      <Routes> {/* Use the <Routes> component */}
        <Route path="/" element={<Registration />} />
        <Route path="/submitted-data" element={<SubmittedData />} />
      </Routes>
    </Router>
  );
}

export default App;
