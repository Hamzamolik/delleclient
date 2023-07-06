import React from 'react'
import { BrowserRouter, Routes, Route,Link } from 'react-router-dom'

import { logo } from './assets'
import { Home, CreatePost } from './page'
const App = () => {
  return (
    <BrowserRouter>
      <header className='w-full flex justify-between items-center bg-white border-b border-b-[#e6ebf4] sm:px-8 px-4 py-4 ' >
        <Link to='/' >
          <img src={logo} className='w-28 object-contain' alt="openai" />
        </Link>
        <Link to={'/create-post'} className='font-inter font-medium bg-[#6469ff] rounded-md px-4 py-2 ' >
          create
        </Link>
      </header>
      <main className='sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)] ' >
        <Routes>
                  <Route path='/' element={<Home />} />
                  <Route path='/create-post' element={<CreatePost />} />
                </Routes>

      </main>
    </BrowserRouter>
  )
}

export default App