import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import Home from './pages/home/home.jsx';
import Login from './pages/auth/login.jsx';
import Signup from './pages/auth/signup.jsx';

import { store } from './store/store'
import { Provider } from 'react-redux'

import ProtectedRoutes from './components/protectedRoutes.jsx';
import App from './components/app.jsx';


const router = createBrowserRouter([
  {
    path: "/", element:
      (
        <ProtectedRoutes>
          <Home />
        </ProtectedRoutes>
      )
  },
  { path: "/login", element: <Login /> },
  { path: "/signup", element: <Signup /> }
])

createRoot(document.getElementById('root')).render(
    <Provider store={store}>
      <App />
      <RouterProvider router={router} />
    </Provider>
)
