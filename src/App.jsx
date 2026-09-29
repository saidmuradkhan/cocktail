import { Outlet } from 'react-router-dom';
import Footer from './components/Footer';
import Header from './components/Header';
import ScrollToTop from './components/ScrollToTop';

const App = () => (
  <div className="flex flex-col min-h-screen">
    <ScrollToTop />
    <Header />
    <main id="main-content" tabIndex={-1} className="flex-grow flex flex-col focus:outline-none">
      <Outlet />
    </main>
    <Footer />
  </div>
);

export default App;
