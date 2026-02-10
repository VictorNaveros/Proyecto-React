// src/components/common/Pagination.jsx

import { Button } from "@nextui-org/react";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ currentPage, totalPages, onPageChange }) {
  // Generar array de números de página [1, 2, 3, ...]
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      
      {/* Botón Anterior */}
      <Button
        isIconOnly
        variant="flat"
        isDisabled={currentPage === 1}
        onPress={() => onPageChange(currentPage - 1)}
        className="bg-gray-800 hover:bg-gray-700"
      >
        <ChevronLeft size={20} />
      </Button>

      {/* Números de página */}
      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? "solid" : "flat"}
          color={page === currentPage ? "primary" : "default"}
          onPress={() => onPageChange(page)}
          className={
            page === currentPage 
              ? "min-w-10" 
              : "min-w-10 bg-gray-800 hover:bg-gray-700"
          }
        >
          {page}
        </Button>
      ))}

      {/* Botón Siguiente */}
      <Button
        isIconOnly
        variant="flat"
        isDisabled={currentPage === totalPages}
        onPress={() => onPageChange(currentPage + 1)}
        className="bg-gray-800 hover:bg-gray-700"
      >
        <ChevronRight size={20} />
      </Button>
      
    </div>
  );
}

export default Pagination;