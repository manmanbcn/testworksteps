import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setData, selectFormData } from '../redux/slices/formSlice';
import ProgressBar from './ProgressBar.jsx';
import '../step1.scss';

const Step1 = () => {
  const dispatch = useDispatch();
  const savedData = useSelector(selectFormData);

  const validationSchema = Yup.object({
    nickname: Yup.string()
      .max(30, 'Максимальная длина 30 символов')
      .matches(/^[a-zA-Z0-9]*$/, 'Только буквы и цифры')
      .required('Обязательное поле'),
    name: Yup.string()
      .max(50, 'Максимальная длина 50 символов')
      .matches(/^[a-zA-Zа-яА-Я]*$/, 'Только буквы')
      .required('Обязательное поле'),
    surname: Yup.string()
      .max(50, 'Максимальная длина 50 символов')
      .matches(/^[a-zA-Zа-яА-Я]*$/, 'Только буквы')
      .required('Обязательное поле'),
    sex: Yup.string()
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      nickname: savedData.nickname || '',
      name: savedData.name || '',
      surname: savedData.surname || '',
      sex: savedData.sex || '',
    },
    validationSchema,
  });

  const handleNext = () => {
    formik.setTouched({
      nickname: true,
      name: true,
      surname: true,
      sex: true
    });
    formik.validateForm().then((errors) => {
      if (!Object.keys(errors).length) {
        dispatch(setData({...savedData, ...formik.values}));
        dispatch(setStep(2));
      }
    });
  };

  const handleBack = () => {
    dispatch(setData({...savedData, ...formik.values}));
    dispatch(setStep(0));
  };

  return (
    <div className="step-container-first">
      <header className="progressbar-container">
        <ProgressBar />
      </header>
      <form className="form-wrapper">
        <label className="label-first" htmlFor="field-nickname">Никнейм</label>
        <input className= "input-first"
          type="text"
          id="field-nickname"
          name="nickname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.nickname}
          placeholder= "Ваш nickname"
        />
        {formik.touched.nickname && formik.errors.nickname && (
          <div className="error">{formik.errors.nickname}</div>
        )}

        <label className="label-first" htmlFor="field-name">Имя</label>
        <input className= "input-first"
          type="text"
          id="field-name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder= "Ваше имя"
        />
        {formik.touched.name && formik.errors.name && (
          <div className="error">{formik.errors.name}</div>
        )}

        <label className="label-first" htmlFor="field-surname">Фамилия</label>
        <input className= "input-first"
          type="text"
          id="field-surname"
          name="surname"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.surname}
          placeholder= "Ваша фамилия"
        />
        {formik.touched.surname && formik.errors.surname && (
          <div className="error">{formik.errors.surname}</div>
        )}

        <label className="label-first" htmlFor="field-sex">Пол</label>
        <select className= "input-first"
          id="field-sex"
          name="sex"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.sex}>
          <option value="" disabled defaultValue>Выберите свой пол</option>
          <option value="man">Мужской</option>
          <option value="woman">Женский</option>
        </select>
        {formik.touched.sex && formik.errors.sex && (
          <div className="error">{formik.errors.sex}</div>
        )}

        <div className="navigation-buttons">
          <button className="button-prev" type="button" onClick={handleBack}>
            Назад
          </button>
          <button className="button-next" type="button" onClick={handleNext}>Далее</button>
        </div>
      </form>
    </div>
  );
};

export default Step1;