import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'

const About = (props) => {
  return (
    <FadeTransition>
      <div className="page box-flex-col">
        <HelmetProvider><Helmet>
          <title>About</title>
          <meta name="description" content="About" />
        </Helmet></HelmetProvider>

        <h6 className="box-margin-15">Development in progress.</h6>

      </div>
    </FadeTransition>
  )
}

export default About