import './App.css'
import { Route, Routes } from 'react-router-dom'
import PostList from './pages/PostList'
import PostCreate from './pages/PostCreate'
import PostEdit from './pages/PostEdit'
import PostShow from './pages/PostShow'

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<PostList/>}></Route>
        <Route path='/create' element={<PostCreate/>}></Route>
        <Route path='/edit/:id' element={<PostEdit/>}></Route>
        <Route path='/show/:id' element={<PostShow/>}></Route>
      </Routes>
    </>
  )
}

export default App
