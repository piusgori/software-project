import { MenuItem, Select } from '@mui/material'
import React from 'react';
import { styled } from '@mui/material/styles';

const FormSelect = styled(Select)(() => ({
    width: '100%',
}))

const SelectField = ({ key, name, placeholder, onChange, value, label }) => {
    const optionList = options.map((option, index) => (
        <MenuItem key={index} value={option._id}>{option.name}</MenuItem>
    ))
  return (
    <FormSelect key={key} name={name} placeholder={placeholder} label={label} onChange={onChange} value={value}>
        {optionList}
    </FormSelect>
  )
}

export default SelectField