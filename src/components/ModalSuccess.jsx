import React from 'react';
import { useDispatch } from 'react-redux';
import { setStep, resetForm } from '../redux/slices/formSlice';
import '../modal.scss';
import ReactDOM from 'react-dom';

const ModalSuccess = () => {
  const dispatch = useDispatch();

  const handlePrev = () => {
    dispatch(resetForm());
    dispatch(setStep(0));
  };

  return ReactDOM.createPortal(
    <div className="modal-overlay">
      <div className="modal-window">
        <div className="title-wrapper">
          <span className="title-inner">Форма успешно отправлена</span>
        </div>
        <div className="success-wrapper">
        <div className="success-outer">
        <div className="success-inner">
            <svg width="28" height="25" viewBox="0 0 10 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.66147 7.87365C4.56698 7.99874 4.41929 8.07227 4.26252 8.07227H3.68243C3.54729 8.07227 3.41791 8.01757 3.32376 7.92063L0.504131 5.01762C0.315687 4.8236 0.315686 4.51491 0.504131 4.32089L0.975725 3.83535C1.1721 3.63317 1.49669 3.63317 1.69306 3.83535L3.49489 5.69046C3.70845 5.91034 4.06776 5.88806 4.25251 5.64349L8.15121 0.482651C8.32099 0.2579 8.64283 0.217688 8.86269 0.393752L9.38636 0.813089C9.59761 0.982258 9.63592 1.28881 9.47278 1.50476L4.66147 7.87365Z" fill="white"/>
            </svg>
        </div>
        </div>
        </div>
         <div className="button-wrapper">
          <button className="button-main" type="button" onClick={handlePrev}>На главную</button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ModalSuccess;