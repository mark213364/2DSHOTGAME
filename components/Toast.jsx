import { useEffect } from 'react';

export default function Toast({ message, isVisible, onClose, duration = 3000 }) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  return (
    <div style={{
      position: 'absolute',
      top: isVisible ? '20px' : '-100px', // Выезжает сверху
      left: '50%',
      transform: 'translateX(-50%)',
      backgroundColor: '#222',
      color: '#fff',
      padding: '10px 20px',
      borderRadius: '8px',
      border: '1px solid #ff3333',
      boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
      transition: 'top 0.3s ease-in-out',
      zIndex: 9999,
      pointerEvents: 'none', // Чтобы клики проходили сквозь него
      textAlign: 'center',
      maxWidth: '90%',
      fontSize: '14px',
      fontWeight: 'bold',
      letterSpacing: '1px',
      opacity: isVisible ? 1 : 0,
    }}>
      {message}
    </div>
  );
}
