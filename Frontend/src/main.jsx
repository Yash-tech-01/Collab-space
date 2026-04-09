import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { ClerkProvider } from '@clerk/react';
import React from "react";
import ReactDOM from "react-dom";
import {Routes, Route, BrowserRouter, useLocation, useNavigationType, createRoutesFromChildren, matchRoutes, } from "react-router";
import { Toaster } from "react-hot-toast";

import * as Sentry from "@sentry/react";

import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import AuthProvider from './providers/AuthProvider.jsx';

const queryClient = new QueryClient();  // Using tanstack query



// import publishable key 
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;



if(!PUBLISHABLE_KEY){
    throw new Error("Missing Publishable Key");
}


Sentry.init({
   dsn: "https://ae82a01271cc5fb30096f1dc55b45f66@o4511143518339072.ingest.us.sentry.io/4511190461972480",
  integrations: [
    Sentry.reactRouterV7BrowserTracingIntegration({
      useEffect: React.useEffect,
      useLocation,
      useNavigationType,
      createRoutesFromChildren,
      matchRoutes,
    }),
  ],
  tracesSampleRate: 1.0,
});



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>

      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <App />
          </AuthProvider>
          <Toaster/>
        </QueryClientProvider>
      </BrowserRouter>

    </ClerkProvider>
  </StrictMode>,
);