// src/utils/imageHelper.js

/**
 * Obtiene la URL de imagen de un producto
 * Maneja fallbacks automáticamente
 */
export const getProductImage = (product) => {
  return (
    product.mainImage || 
    product.images?.[0] || 
    "https://placehold.co/300x240/1a1a1a/666?text=Sin+Imagen"
  );
};

/**
 * Obtiene array de todas las imágenes del producto
 */
export const getProductImages = (product) => {
  const images = [];
  
  if (product.mainImage) {
    images.push(product.mainImage);
  }
  
  if (product.images && Array.isArray(product.images)) {
    images.push(...product.images);
  }
  
  return images.length > 0 
    ? images 
    : ["https://placehold.co/300x240/1a1a1a/666?text=Sin+Imagen"];
};