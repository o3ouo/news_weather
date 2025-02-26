import { BrowserRouter } from 'react-router-dom';
import './css/base.css';
import useWindowDimensions from './customHook/useWindowDimensions';
import Home from './pages/Home';
import MediaHome from './pages/MediaHome';

function App() {
  const { width } = useWindowDimensions();
  const isTablet = width <= 1440;

  return (
    <BrowserRouter>
      <div className="App">
        {isTablet ? <MediaHome /> : <Home />}
      </div>
    </BrowserRouter>

  );
}

export default App;
