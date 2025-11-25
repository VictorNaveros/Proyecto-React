// src/components/layout/Layout.jsx
import Header from './Header';
import Footer from './Footer';

function Layout({ children }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header fijo arriba */}
      <Header />
      
      {/* Contenido principal que crece */}
      <main className="flex-1 bg-brand-gray-50">
        {children}
      </main>
      
      {/* Footer fijo abajo */}
      <Footer />
    </div>
  );
}

export default Layout;