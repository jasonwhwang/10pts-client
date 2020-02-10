import React from 'react'
import Loading from './Loading'
import FadeTransition from '../7_FadeTransition/FadeTransition'

const LoadingPage = () => {
  return (
    <FadeTransition>
      <div className="box-flex-1 box-flex-row-center">
        <Loading small={false}/>
      </div>
    </FadeTransition>
  )
}

export default LoadingPage