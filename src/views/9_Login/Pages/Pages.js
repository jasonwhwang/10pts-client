import React from 'react'
import FadeTransition from '../../0_Components/7_FadeTransition/FadeTransition'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import '../Login.css'

class Pages extends React.Component {
  render() {
    let title = this.props.location.pathname === "/login/welcome" ? "Welcome" : "Success"
    let description = title === "Welcome" ?
      "We've sent you an email. Before accessing your account, please confirm your email address."
      :
      "You have successfully changed your password."
    return (
      <FadeTransition>
        <div className="page box-flex-row-center box-background">
          <HelmetProvider><Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
          </Helmet></HelmetProvider>

          <div className="box-flex-col login box-flex-1">
            <div className="box-margin-bottom-40">
              <h2 className="box-margin-bottom-30">{title}</h2>
              <h4 className="box-text-nobold box-margin-bottom-60">{description}</h4>
            </div>
          </div>
        </div>
      </FadeTransition>
    )
  }
}

export default Pages