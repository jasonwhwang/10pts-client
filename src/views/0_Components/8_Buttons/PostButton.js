import React from 'react'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  search: state.search,
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class PostButton extends React.Component {
  state = { loading: false }
  render() {
    return (
      <button
        className="box-flex-row-center chevron-right defaultNav-button box-text-extraBold box-text-6">
        Post
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostButton)