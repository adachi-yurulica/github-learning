import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Layout } from './components/layout/Layout'
import { Home } from './pages/Home'
import { Chapter1 } from './pages/Chapter1'
import { Chapter2 } from './pages/Chapter2'
import { Chapter3 } from './pages/Chapter3'
import { Chapter4 } from './pages/Chapter4'
import { Progress } from './pages/Progress'

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/chapter/1" element={<Chapter1 />} />
        <Route path="/chapter/2" element={<Chapter2 />} />
        <Route path="/chapter/3" element={<Chapter3 />} />
        <Route path="/chapter/4" element={<Chapter4 />} />
        <Route path="/progress" element={<Progress />} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Layout>
        <AnimatedRoutes />
      </Layout>
    </BrowserRouter>
  )
}

export default App
