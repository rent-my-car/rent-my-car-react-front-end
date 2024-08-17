import React from 'react';
import NavBar from './NavBar'; // Adjust the path as necessary
import Footer from './Footer'; // Adjust the path as necessary

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      <NavBar />
      <main className="flex-fill p-3">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;