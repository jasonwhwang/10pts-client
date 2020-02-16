import React from 'react'
import './Other.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'

const NotFound = () => {
  return (
    <FadeTransition>
      <div className="page box-flex-col">
        <HelmetProvider><Helmet>
          <title>Not Found</title>
          <meta name="description" content="Not Found" />
        </Helmet></HelmetProvider>

        <div className="box-flex-row-center box-flex-1">
          <div className="">
            <h1 className="box-flex-row-center box-margin-bottom-10">404</h1>
            <h6 className="box-flex-row-center box-text-nobold">
              Not Found
            </h6>
          </div>
        </div>

      </div>
    </FadeTransition>
  )
}

export default NotFound