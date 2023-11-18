import {Routes, Route} from 'react-router-dom'
import Home from './Home'
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/usestate" element={<h1>Hello</h1> } />
    </Routes>
  )
}

export default App;