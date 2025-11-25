// src/components/common/Modal.jsx
import { 
  Modal as NextUIModal, 
  ModalContent, 
  ModalHeader, 
  ModalBody, 
  ModalFooter 
} from "@nextui-org/react";

function Modal({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer 
}) {
  return (
    <NextUIModal 
      isOpen={isOpen} 
      onClose={onClose}
      size="2xl"
      scrollBehavior="inside"
    >
      <ModalContent>
        {(onClose) => (
          <>
            {title && (
              <ModalHeader className="flex flex-col gap-1">
                {title}
              </ModalHeader>
            )}
            
            <ModalBody>
              {children}
            </ModalBody>
            
            {footer && (
              <ModalFooter>
                {footer}
              </ModalFooter>
            )}
          </>
        )}
      </ModalContent>
    </NextUIModal>
  );
}

export default Modal;