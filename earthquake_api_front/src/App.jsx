import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FeaturesList from './components/features/FeaturesList.jsx';
import CreateComment from './components/features/FeaturesComments.jsx';

function App() {

  return (
    <Router>
      <div>
        <h1>Earthquakes info!</h1>
        <Routes>
          <Route path="/" element={<FeaturesList />} />
          <Route path="/create-comment/:id" element={<CreateComment />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
