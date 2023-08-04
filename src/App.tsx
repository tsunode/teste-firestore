import './App.css'
import { Route, Routes } from 'react-router-dom'
import { Home } from './pages/Home'
import { Chat } from './pages/Chat'

export function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/chat' element={<Chat />} />
      </Routes>
    </>
  )
}


