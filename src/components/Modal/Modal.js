import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export default function Modal({ largeImage, onClose }) {
  useEffect(() => {
    console.log('Modal componentDidMount');
    window.addEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    console.log('Modal componentWillUnmount');
    return window.removeEventListener('keydown', handleKeyDown);
  });

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      console.log('Нажали ESC, нужно закрыть модалку');

      onClose();
    }
  };

  const handleBackdropClick = event => {
    if (event.currentTarget === event.target) {
      onClose();
    }
  };

  return createPortal(
    <div className={s.Overlay} onClick={handleBackdropClick}>
      <div className={s.Modal}>
        <img className={s.image} src={largeImage} alt="" />
      </div>
    </div>,
    modalRoot
  );
}
