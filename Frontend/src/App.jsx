import React from 'react'

import { Show, SignInButton, SignUpButton, UserButton } from '@clerk/react'
import {Routes, Route, Navigate} from "react-router";
import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);

function App() {

  return (
    <>    
        <Show when="signed-out">

          <SentryRoutes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Navigate to={"/auth"} replace />} />
          </SentryRoutes>

          {/* <SignInButton mode = "modal"/>
          <SignUpButton  mode = "modal"/> */}
        </Show>

        <Show when="signed-in">
          <SentryRoutes>
            <Route path="/" element={<HomePage />} />           // If user signed in then we will take user to HomePage
            <Route path="/auth" element={<Navigate to={"/"} replace />} />          

          </SentryRoutes>
          {/* <UserButton /> */}
        </Show>
    
    </>
  )
}

export default App