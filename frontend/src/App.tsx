import React from 'react'
import { 
  Routes, 
  Route,
  Navigate,
} from 'react-router-dom'
import AddNews from './features/training-data/AddNews'
import NewsList from './features/training-data/NewsList'
import Layout from './components/Layout'

export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/training-data" />} />
        <Route path="/training-data" element={<NewsList />} />
        <Route path="/training-data/add" element={<AddNews />} />
      </Routes>
    </Layout>
  )
}
