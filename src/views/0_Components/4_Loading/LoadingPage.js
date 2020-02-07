import React from 'react'
import Loading from './Loading'
import FadeTransition from '../7_FadeTransition/FadeTransition'

const LoadingPage = (props) => {
  return (
    <FadeTransition>
      <div className="box-spacer box-flex-row-center">
        <Loading small={false}/>
      </div>
    </FadeTransition>
  )
}

export default LoadingPage