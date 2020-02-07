import React from 'react'
import { CSSTransition } from 'react-transition-group'
import './FadeTransition.css'

class FadeTransition extends React.Component {
  state = {
    show: false
  }
  componentDidMount() {
    this.setState({ show: true })
  }

  render() {
    return (
      <CSSTransition in={this.state.show} appear={true} timeout={250} classNames="fade" unmountOnExit>
        {this.props.children}
      </CSSTransition>
    )
  }
}

export default FadeTransition