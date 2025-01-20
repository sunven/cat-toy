import { Route, Routes } from 'react-router'
import Home from './pages/home'
import Fish from './pages/fish'
import Mouse from './pages/mouse'
import Layout from './layouts/RootLayout'
import DetailLayout from './layouts/DetailLayout'

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
      </Route>
      <Route path="toy" element={<DetailLayout />}>
        <Route path="fish" element={<Fish />} />
        <Route path="mouse" element={<Mouse />} />
      </Route>
    </Routes>
  )
}
