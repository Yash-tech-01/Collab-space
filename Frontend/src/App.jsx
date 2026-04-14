import React from 'react'

import { Show, SignInButton, SignUpButton, UserButton, useAuth } from '@clerk/react'
import {Routes, Route, Navigate} from "react-router";

import HomePage from './pages/HomePage'
import AuthPage from './pages/AuthPage'
import CallPage from './pages/CallPage';

import * as Sentry from "@sentry/react";

const SentryRoutes = Sentry.withSentryReactRouterV7Routing(Routes);


//Optimized routing version
const App = () => {
  const {isSignedIn, isLoaded} = useAuth();

  if(!isLoaded) return null;

  return (
          <SentryRoutes>
            <Route path="/" element={isSignedIn ? <HomePage /> : <Navigate to={"/auth"} replace />} />    // If user signed in then we will take user to HomePage
            <Route path="/auth" element={ !isSignedIn ? <AuthPage/> : <Navigate to={"/"} replace />} />      

            
            <Route path="/call/:id" element={isSignedIn ? <CallPage/> : <Navigate to={"/auth"} replace />} />   

          
            <Route path="*" element={isSignedIn ? <Navigate to={"/"} replace /> : <Navigate to={"/auth"} replace />} />
 
          </SentryRoutes>

  )
}

export default App



// First version of routing 

// <>    
//         <Show when="signed-out">

//           <SentryRoutes>
//             <Route path="/auth" element={<AuthPage />} />
//             <Route path="/" element={<Navigate to={"/auth"} replace />} />
//           </SentryRoutes>

//           {/* <SignInButton mode = "modal"/>
//           <SignUpButton  mode = "modal"/> */}
//         </Show>

//         <Show when="signed-in">
//           <SentryRoutes>
//             <Route path="/" element={<HomePage />} />           // If user signed in then we will take user to HomePage
//             <Route path="/auth" element={<Navigate to={"/"} replace />} />          

//           </SentryRoutes>
//           {/* <UserButton /> */}
//         </Show>
    
//     </>