import React from 'react'
import ReactGA from 'react-ga'

class ScrollTop extends React.Component {
  componentDidMount() {
    this.updateGA()
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname
      || this.props.location.search !== prevProps.location.search) {
      window.scrollTo(0, 0)
      this.updateGA()
    }
  }
  updateGA = () => {
    if(!process.env.REACT_APP_var_STAGE === 'dev') ReactGA.pageview(window.location.pathname + window.location.search)
  }

  render() {
    return this.props.children
  }
}

export default ScrollTop