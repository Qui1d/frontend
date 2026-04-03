import { Outlet } from 'react-router-dom';
import Header from '../components/Header';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const MainLayout = () => {
  return (
    <div className="app-shell">
      <Header />
      <Navbar />
      <main className="container main-content">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;