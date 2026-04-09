import React from 'react'

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import {Routes, Route, Navigate} from "react-router";
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'

function App() {
  return (
    <>
    
        <Show when="signed-out">

          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to={"/auth"} replace />} />
          </Routes>

          {/* <SignInButton mode = "modal"/>
          <SignUpButton  mode = "modal"/> */}
        </Show>

        <Show when="signed-in">
          <Routes>
            <Route path="/" element={<HomePage />} />           // If user signed in then we will take user to HomePage
            <Route path="/auth" element={<Navigate to={"/"} replace />} />          

          </Routes>
          {/* <UserButton /> */}
        </Show>
    
    </>
  )
}

export default App