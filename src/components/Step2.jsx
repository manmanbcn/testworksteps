import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {  selectFormData, setStep, setData } from '../redux/slices/formSlice';
import ProgressBar from './ProgressBar.jsx';
import '../step2.scss';

const Step2 = () => {
  const dispatch = useDispatch();
  const savedData = useSelector(selectFormData);

  const validationSchema = Yup.object().shape({
    advantages: Yup.array().of(Yup.string().max(200, 'Максимальная длина 200 символов')),
    checkbox: Yup.array().of(Yup.number()),
    radio: Yup.number(),
  });

  const formik = useFormik({
    initialValues: savedData,
    validationSchema,
  });

  const handleNext = () => {
    formik.validateForm().then((errors) => {
      if (!Object.keys(errors).length) {
        dispatch(setData({...savedData, ...formik.values}));
        dispatch(setStep(3));
      }
    });
  };

  const handleBack = () => {
    dispatch(setData({...savedData, ...formik.values}));
    dispatch(setStep(1));
  };

  const handleAddAdvantage = () => {
    if (formik.values.advantages.length < 10) {
      const nextAdvantages = formik.values.advantages.concat('');
      formik.setFieldValue('advantages', nextAdvantages);
    }
  };

  const handleRemoveAdvantage = (index) => {
    const filteredAdvantages = formik.values.advantages.filter((_, i) => i !== index);
    formik.setFieldValue('advantages', filteredAdvantages);
  };

  const handleCheckboxChange = (num) => {
    const currentIndex = formik.values.checkbox.indexOf(num);
    const newChecked = [...formik.values.checkbox];

    currentIndex === -1 ? newChecked.push(num) : newChecked.splice(currentIndex, 1);

    formik.setFieldValue('checkbox', newChecked);
  };

  let x = 1;

  return (
    <div className="step-container-second">
       <header className="progressbar-container">
          <ProgressBar />
       </header>
      
      <div className="advantages-list">
      <label className="label-first">Приемущества</label>
        {formik.values.advantages.map((advantage, index) => (
          <div className="advantage-item" key={index}>
            <input
              className="advantage-input" 
              type="text"
              placeholder={index + 1}
              name={`advantages[${index}]`}
              value={advantage}
              onChange={formik.handleChange}
            />
            <button className="delete-advantage" onClick={() => handleRemoveAdvantage(index)}>
              <svg width="20" height="20" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.453 15.6522L2.55826 7.15225C2.52719 6.85703 2.75867 6.5999 3.05552 6.5999H12.9447C13.2416 6.5999 13.4731 6.85703 13.442 7.15225L12.5472 15.6522C12.5205 15.9067 12.3059 16.0999 12.05 16.0999H3.95025C3.69437 16.0999 3.47979 15.9067 3.453 15.6522Z" fill="#CCCCCC"/>
              <path d="M15.0001 4.6999H1.00012C0.72398 4.6999 0.500122 4.47605 0.500122 4.1999V3.2999C0.500122 3.02376 0.72398 2.7999 1.00012 2.7999H3.35511C3.44983 2.7999 3.54261 2.77299 3.62263 2.72231L6.37761 0.977493C6.45764 0.92681 6.55041 0.899902 6.64514 0.899902H9.35511C9.44983 0.899902 9.54261 0.92681 9.62263 0.977493L12.3776 2.72231C12.4576 2.77299 12.5504 2.7999 12.6451 2.7999H15.0001C15.2763 2.7999 15.5001 3.02376 15.5001 3.2999V4.1999C15.5001 4.47604 15.2763 4.6999 15.0001 4.6999Z" fill="#CCCCCC"/>
              </svg>
            </button>
          </div>
        ))}
        <button className="add-advantage" onClick={handleAddAdvantage}>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
          <path d="M11 5C11 4.44772 10.5523 4 9.99998 4C9.44769 4 8.99998 4.44772 8.99998 5V8.99998H5C4.44772 8.99998 4 9.44769 4 9.99998C4 10.5523 4.44772 11 5 11H8.99998V15C8.99998 15.5522 9.44769 16 9.99998 16C10.5523 16 11 15.5522 11 15V11H15C15.5522 11 16 10.5523 16 9.99998C16 9.44769 15.5522 8.99998 15 8.99998H11V5Z" fill="#5558FA"/>
          </svg>
        </button>
      </div>
      
      <div className="checkbox-group">
        <label className="label-first">Checkbox группа</label>
        {[1, 2, 3].map(num => (
          <label className="label-checkbox" key={num}>
            <input
              className="label-inputs" 
              type="checkbox"
              id={`field-checkbox-group-option-${num}`}
              name="checkbox"
              value={num}
              checked={formik.values.checkbox.includes(num)}
              onChange={() => handleCheckboxChange(num)}
            />
             {num}
          </label>
        ))}
      </div>
      
      <div className="radio-group">
        <label className="label-radio" >Radio группа</label>
        {[1, 2, 3].map(num => (
          <label key={num}>
            <input
              className="label-inputs" 
              type="radio"
              id={`field-radio-group-option-${num}`}
              name="radio"
              value={num} 
              checked={formik.values.radio === num}
              onChange={(e) => formik.setFieldValue('radio', parseInt(e.target.value))}
            />
            {num}
          </label>
        ))}
      </div>

    
      <div className="navigation-buttons">
        <button className="button-prev" onClick={handleBack}>Назад</button>
        <button className="button-next" onClick={handleNext}>Далее</button>
      </div>
    </div>
);
};

export default Step2;
