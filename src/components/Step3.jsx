import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { setSubmitStatus, selectFormData, setStep } from '../redux/slices/formSlice';
import ProgressBar from './ProgressBar';
import ModalSuccess from './ModalSuccess';
import ModalError from './ModalError';
import '../step3.scss';

const Step3 = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const dispatch = useDispatch();
  const formData = useSelector(selectFormData);

  const validationSchema = Yup.object().shape({
    about: Yup.string().max(200, 'Максимальная длина 200 символов'),
  });

  const handleCloseModal = () => {
    setIsModalVisible(false);
    dispatch(setSubmitStatus(null))
  };

 const formik = useFormik({
    initialValues: formData,
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      setTimeout(() => {
        axios.post('url', values)
          .then((response) => {
            console.log('Успешный ответ от сервера:', response.data);
            dispatch(setSubmitStatus('success'));
            setIsModalVisible(true);
          })
          .catch((error) => {
            console.error('Ошибка при отправке данных на сервер:', error);
            dispatch(setSubmitStatus('error'));
            setIsModalVisible(true);
          })
          .finally(() => {
            setSubmitting(false);
            setIsModalVisible(true);
          });
      }, 1000); 
    },
  });

  const handlePrev = () => {
    dispatch(setStep(2));
  };

  return (
    <div className="step-container-third">
       <header className="progressbar-container">
          <ProgressBar />
       </header>

      <form className="form-wrapper" onSubmit={formik.handleSubmit}>
        <div>
          <label className="label-first" htmlFor="field-about">О себе</label>
          <textarea className="about"
            name="about"
            value={formik.values.about}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
          {formik.errors.about && formik.touched.about && <div className="error">{formik.errors.about}</div>}
        </div>

        <div className="navigation-buttons-submit">
          <button className="button-prev" type="button" onClick={handlePrev}>Назад</button>
          <button className="button-submit" type="submit">Отправить</button>
        </div>
      </form>

      {formik.isSubmitting && <div className="modal">Отправка данных...</div>}

      {formik.submitCount > 0 && !formik.isSubmitting && (
        <div className={`modal ${formik.errors.about ? 'error' : 'success'}`}>
          {isModalVisible && (formik.errors.about ? (<ModalError onClose = {handleCloseModal}/>) : (<ModalSuccess/>)) }
        </div>
      )}
    </div>
  );
};

export default Step3;