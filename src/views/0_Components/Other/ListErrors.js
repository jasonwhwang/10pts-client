import React from 'react';

const ListErrors = ({ errors }) => {
  if (!errors) return null
  return (
    <ul>
      {Object.keys(errors).map(key => {
        return (
          <li key={key} className="box-text-8 box-color-red">
            {key} {errors[key]}
          </li>
        )
      })}
    </ul>
  )
}

export default ListErrors;