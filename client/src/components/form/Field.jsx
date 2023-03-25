import { TextField } from '@mui/material'
import React from 'react';
import { styled } from '@mui/material/styles';

const FormInput = styled(TextField)(() => ({
    width: '100%',
}))

const Field = ({ name, placeholder, onChange, type, value, key }) => {
  return (
    <FormInput name={name} placeholder={placeholder} onChange={onChange} type={type} value={value} key={key} />
  )
}

export default Field;