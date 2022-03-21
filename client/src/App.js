
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/home/Home';
import PrimarySearchAppBar from './components/footer/appbar/Appbar';

function App() {
  return (
    <div className="App">
      <PrimarySearchAppBar />
     <Routes>
       <Route path='/' element={<Home />}/>
     </Routes>
    </div>
  );
}

export default App;
