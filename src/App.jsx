import React, { useState } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { MusicProvider } from './context/MusicContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MusicPlayer from './components/MusicPlayer';
import Loader from './components/Loader';
import AppRouter from './router/index';
import './i18n';

export default function App() {
  const [loading, setLoading] = useState(true);

  if (loading) {
    return (
      <ThemeProvider>
        <Loader onFinish={() => setLoading(false)} />
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider>
      <MusicProvider>
        <BrowserRouter>
          <div className="app-layout">
            <Navbar />
            <AppRouter />
            <Footer />
            <MusicPlayer />
          </div>
        </BrowserRouter>
      </MusicProvider>
    </ThemeProvider>
  );
}
