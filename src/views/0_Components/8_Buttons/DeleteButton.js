import React from 'react'
import { Trash2, MoreHorizontal } from 'react-feather'
import { connect } from 'react-redux'

const mapStateToProps = state => ({
  review: state.review,
  user: state.common.user
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class DeleteButton extends React.Component {
  state = { loading: false, showDelete: false }
  render() {
    return (
      <div className="box-flex-end box-flex-acenter box-flex-stretch box-margin-15">
        {!this.state.showDelete &&
          <button onClick={() => this.setState({ ...this.state, showDelete: true })}
            className="box-flex-row-center">
            <MoreHorizontal size={14} />
          </button>
        }
        {this.state.showDelete &&
          <button
            className="box-flex-row-center">
            <Trash2 size={14} />
          </button>
        }
      </div>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeleteButton)