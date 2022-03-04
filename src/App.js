import { HashRouter, Route, Routes, Navigate } from 'react-router-dom'
import Login from '@/pages/login'
import Home from '@/pages/home'

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route exact path='/home' element={<Home />} />
        <Route exact path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to='/login' />} />
      </Routes>
    </HashRouter>
    // <div className="App">
    //   <h1>Marvel-Moba</h1>
    //   <Button type="primary">Button</Button>
    // </div>
  );
}

export default App;
