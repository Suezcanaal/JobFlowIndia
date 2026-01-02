import React from 'react';
import { X } from 'lucide-react';

const Modal = ({ isOpen, onClose, title, children, size = 'md' }) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'max-w-md',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl'
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto modal-overlay">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div 
          className="fixed inset-0 transition-opacity bg-black bg-opacity-50 backdrop-blur-sm" 
          onClick={onClose} 
        />
        
        <div className={`inline-block w-full ${sizeClasses[size]} p-8 my-8 overflow-hidden text-left align-middle transition-all transform bg-white/95 backdrop-filter backdrop-blur-xl shadow-2xl rounded-2xl modal-content border border-white/20`}>
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-bold text-gray-900 gradient-text">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 transition-all duration-200 hover:bg-gray-100 rounded-full hover:scale-110"
            >
              <X size={20} />
            </button>
          </div>
          <div className="animate-fadeIn">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;