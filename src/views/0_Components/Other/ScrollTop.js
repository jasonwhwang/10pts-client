import React from 'react'
import ReactGA from 'react-ga'

class ScrollTop extends React.Component {
  componentDidMount() {
    ReactGA.pageview(window.location.pathname + window.location.search)
  }
  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname
      || this.props.location.search !== prevProps.location.search) {
      window.scrollTo(0, 0)
      ReactGA.pageview(window.location.pathname + window.location.search)
    }
  }

  render() {
    return this.props.children
  }
}

export default ScrollTop