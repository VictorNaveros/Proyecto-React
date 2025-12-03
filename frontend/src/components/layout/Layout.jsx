// src/components/layout/Layout.jsx
// VERSIÓN CORREGIDA - Con fondo negro global

import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      {/* Header */}
      <Header />
      
      {/* Contenido principal con fondo negro */}
      <main className="flex-1 bg-black">
        {children}
      </main>
      
      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Layout;