import React from 'react'
import Field from './Field'
import SelectField from './SelectField'

const Input = (props) => {
  return (
    <>
        {props.type === 'select' ? (<SelectField {...props} />) : (<Field {...props} />)}
    </>
  )
}

export default Input;