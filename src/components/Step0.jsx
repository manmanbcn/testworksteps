import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setStep, setData, selectFormData } from '../redux/slices/formSlice';
import InputMask from 'react-input-mask';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import '../step0.scss';

const Step0 = () => {
  const dispatch = useDispatch();
  const savedData = useSelector(selectFormData);

  const validationSchema = Yup.object({
    phone: Yup.string()
      .matches(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/, 'Неверный формат номера телефона')
      .required('Обязательное поле'),
    email: Yup.string()
      .email('Неверный формат email')
      .required('Обязательное поле'),
  });

  const formik = useFormik({
    initialValues: {
      phone: savedData.phone || '',
      email: savedData.email || '',
    },
    validationSchema,
  });

  const handleNext = () => {
    formik.setTouched({
      phone: true,
      email: true
    });
    formik.validateForm().then((errors) => {
      if (!Object.keys(errors).length) {
        dispatch(setData({...savedData, ...formik.values}));
        dispatch(setStep(1));
      }
    });
  };

  const getInitials = (name) => {
    const parts = name.split(' ');
    let initials = '';
    for (let part of parts) {
      if (part.length > 0 && part !== '') {
        initials += part[0];
      }
    }
    return initials.toUpperCase();
  }

  const myName = 'Анатолий Соболевский';

  const initials = getInitials(myName);

  const myInfo = [{text: "Telegram", link: "https://https://t.me/anatolii237"}, {text: "GitHub", link: "https://github.com/manmanbcn"}, {text: "Резюме", link: "https://hh.ru/resume/a91531a8ff0c3117d80039ed1f4c78716a6374"}]

  return (
    <div className="step-container-zero">
      <header className='header'>
        <div>
          <div className='avatar'>{initials}</div>
        </div>
        <div>
        <div className='info'>
          <div className='my-name'>
            {myName}
          </div>
          <ul className='my-links'>
            {myInfo.map(({text, link}) => {
              return (
                  <li key={text} className="my-links-items">
                    <span>
                      <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M0.710016 1.96935L2.08181 0.524489C2.15733 0.444944 2.26221 0.399902 2.37189 0.399902H4.83441C4.9405 0.399902 5.04224 0.442045 5.11725 0.51706L6.48294 1.88275C6.55795 1.95776 6.6597 1.9999 6.76578 1.9999H12.4344C12.5405 1.9999 12.6422 2.04205 12.7173 2.11706L13.2829 2.68275C13.358 2.75776 13.4001 2.8595 13.4001 2.96559V10.6342C13.4001 10.7403 13.358 10.842 13.2829 10.9171L12.7173 11.4827C12.6422 11.5578 12.5405 11.5999 12.4344 11.5999H1.59C1.46983 11.5999 1.35602 11.5459 1.28005 11.4528L0.690151 10.7296C0.631907 10.6582 0.600098 10.5689 0.600098 10.4768V2.24476C0.600098 2.14227 0.639443 2.04368 0.710016 1.96935Z" fill="#CCCCCC"/>
                      </svg>
                    </span>
                    <span className='my-links-item'><a href={link}>{text}</a></span>
                  </li>)
              })}
          </ul>
        </div>
        </div>
      </header>
      <hr></hr>
      <form>
        <label className="label-zero" htmlFor="phone">Номер телефона</label>
        <InputMask
          className= "input-zero"
          mask="+7 (999) 999-99-99"
          value={formik.values.phone}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          id="phone"
          name="phone"
          type="tel"
          placeholder="+7 999 999-99-99"
        />
        {formik.touched.phone && formik.errors.phone && (
          <div className="error">{formik.errors.phone}</div>
        )}

        <label className="label-zero" htmlFor="email">Email</label>
        <input
          className= "input-zero"
          type="email"
          id="email"
          name="email"
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          placeholder= "Email address here"
        />
        {formik.touched.email && formik.errors.email && (
          <div className="error">{formik.errors.email}</div>
        )}

        <div className="navigation-buttons">
          <button className="button-start" type="button"  onClick={handleNext}>Начать</button>
        </div>
      </form>
    </div>
  );
};

export default Step0;