import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app.jsx'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/authContext.jsx'
import { ProfileProvider } from './context/profileContext.jsx' 
import { LanguageProvider } from './context/languageContext.jsx'
import { GameProvider } from './context/gameContext.jsx'
import './context/i18next.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AuthProvider>
        <ProfileProvider>
          <GameProvider>
            <BrowserRouter>
              <App />
            </BrowserRouter>
          </GameProvider>
        </ProfileProvider>
      </AuthProvider>
    </LanguageProvider>
  </React.StrictMode>
)
