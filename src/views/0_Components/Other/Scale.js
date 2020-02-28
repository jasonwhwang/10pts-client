import React from 'react'
import { Helmet, HelmetProvider } from 'react-helmet-async'

class Scale extends React.Component {
  state = { scale: false }
  componentDidMount() {
    if (window.visualViewport) window.visualViewport.addEventListener('resize', this.resizeFunction)
  }
  componentWillUnmount() {
    if (window.visualViewport) window.visualViewport.removeEventListener('resize', this.resizeFunction)
  }
  resizeFunction = () => {
    let scale = window.visualViewport.scale !== 1
    if (scale !== this.state.scale) this.setState({ ...this.state, scale: scale })
  }
  componentDidUpdate(prevState) {
    if (prevState.scale !== this.state.scale) {
      if (this.state.scale) {
        document.getElementById('navBar').classList.add('navBar-hide')
      } else {
        document.getElementById('navBar').classList.remove('navBar-hide')
      }
    }
  }

  render() {
    return (
      <>
        <HelmetProvider><Helmet>
          <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=5, user-scalable=yes"></meta>
        </Helmet></HelmetProvider>
        {this.props.children}
      </>
    )
  }
}

export default Scale