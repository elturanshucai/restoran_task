import './App.css';
import Main from './components/Main/Main'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Auth from './components/Auth/Auth';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main />} />
          <Route path='/admin' element={<Auth />} />
        </Routes>
      </BrowserRouter>
    </div>

  )
}

export default App;
