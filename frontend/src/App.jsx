// src/App.jsx
import Layout from './components/layout/Layout';
import Hero from './components/home/Hero';
import ProductsPage from './pages/ProductsPage';

function App() {
  return (
    <Layout>
      {/* Seccion Hero */}
      <Hero />
      
      {/* Seccion Productos */}
      <ProductsPage />
    </Layout>
  );
}

export default App;