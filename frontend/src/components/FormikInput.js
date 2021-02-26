import React from 'react'
import { useField } from 'formik';
import { InfoText, BlackText, ErrorText } from '../styles/textStyles'
import { Text, Input } from '../styles/input'

const FormikInput = ({ name, ...props }) => {
    const [field, meta, helpers] = useField(name);
    const showError = meta.touched && meta.error;
    
    if (props.type==='input') {
      
      return (<>
      <Input
        onChange={({target}) => {
          //console.log('target: ', target) 
          helpers.setValue(target.value)
          /* console.log('field.value: ',field.value) */}}
        onBlur={() => helpers.setTouched(true)}
        value={field.value}
        error={showError}
        {...props}
      />
     {showError && <ErrorText>{meta.error}</ErrorText>}
      
      
    </>)
    }
  
    return (
      <>
        <Text
          onChange={({target}) => {
          helpers.setValue(target.value)}}
          onBlur={() => helpers.setTouched(true)}
          value={field.value}
          error={showError}
          {...props}
        />
        {showError && <ErrorText>{meta.error}</ErrorText>}
      </>
    );
  };
  export default FormikInput;

  