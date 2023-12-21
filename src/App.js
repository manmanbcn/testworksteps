import React from 'react';
import './App.scss';
import { useSelector } from 'react-redux';
import Step0 from './components/Step0';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';

function App() {
  const step = useSelector((state) => state.form.step);

  return (
    <div>
      {step === 0 && <Step0 />}
      {step === 1 && <Step1 />}
      {step === 2 && <Step2 />}
      {step === 3 && <Step3 />}
    </div>
  );
}

export default App;

