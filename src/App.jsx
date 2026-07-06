import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './assets/Components/Home/Header';
import Footer from './assets/Components/Home/Footer';

const App = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex flex-col">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default App;