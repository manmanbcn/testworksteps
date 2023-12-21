import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep, setSubmitStatus } from '../redux/slices/formSlice';
import '../modal.scss';
import ReactDOM from 'react-dom';

const ModalError = ({ onClose }) => {
  const dispatch = useDispatch();

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="title-wrapper">
          <span className="title-inner">Ошибка</span>
        </div>
        <div className="success-wrapper">
        <div className="error-outer">
        <div className="error-inner"> X
        </div>
        </div>
        </div>
         <div className="button-wrapper">
          <button className="button-main" type="button" onClick={onClose}>Закрыть</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalError;