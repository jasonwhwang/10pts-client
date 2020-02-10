import React from 'react'
import FadeTransition from '../../0_Components/10_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import '../Login.css'

class Pages extends React.Component {
  render() {
    let title = this.props.location.pathname === "/welcome" ? "Welcome" : "Success"
    let description = title === "Welcome" ?
      "We've sent you an email. Before accessing your account, please confirm your email address."
      :
      "You have successfully changed your password."
    return (
      <FadeTransition>
        <div className="page-wrapper">
          <HelmetProvider><Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
          </Helmet></HelmetProvider>

          <div className="login box-flex-row box-flex-row-acenter">
            <div className="box-margin-bottom-40">
              <h1 className="box-margin-bottom-30">{title}</h1>
              <h3 className="box-text-nobold box-margin-bottom-60">{description}</h3>
            </div>
          </div>
        </div>
      </FadeTransition>
    )
  }
}

export default Pages