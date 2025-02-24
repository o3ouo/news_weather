import './css/base.css';
import { BrowserRouter } from 'react-router-dom';
import Home from './pages/Home';
import MediaHome from './pages/MediaHome';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Home />
        <MediaHome />
      </div>
    </BrowserRouter>

  );
}

export default App;
