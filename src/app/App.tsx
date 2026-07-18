import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Builder from './routes/builder'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Builder />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
