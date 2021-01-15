import React from 'react'
import { useField } from 'formik';
import { InfoText } from '../styles/textStyles'
import { Input } from '../styles/input'

const FormikInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
  
    return (
      <>
        <Input
          onChange={({target}) => helpers.setValue(target.value)}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
        {showError && <InfoText>{meta.error}</InfoText>}
        
      </>
    );
  };
  export default FormikInput;

  