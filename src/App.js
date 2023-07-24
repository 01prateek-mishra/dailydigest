import './App.css';
import React, { useState } from 'react'
import Navbar from './components/Navbar';
import News from './components/News';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const apiKey = 'c11faf6f4ae84c59b73bf2ecfff5c2bf';

  const [progress, setProgress] = useState(0)

  return (

    <BrowserRouter>
      <Navbar />
      <div>
        <LoadingBar
          color='red'
          progress={progress}
          style={{ height: '3px' }}
        />
      </div>
      <Routes>
        <Route eact path='/' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='General' key='General' />}></Route>
        <Route eact path='/Business' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='Business' key='Business' />}></Route>
        <Route eact path='/Entertainment' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='Entertainment' key='Entertainment' />}></Route>
        <Route eact path='/Health' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='Health' key='Health' />}></Route>
        <Route eact path='/Science' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='Science' key='Science' />}></Route>
        <Route eact path='/Sports' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='Sports' key='Sports' />}></Route>
        <Route eact path='/Technology' element={<News apiKey={apiKey} setProgress={setProgress} pageSize={6} category='Technology' key='Technology' />}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App