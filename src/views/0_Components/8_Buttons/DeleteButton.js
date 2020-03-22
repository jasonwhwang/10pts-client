import React from 'react'
import { Trash2, MoreHorizontal } from 'react-feather'
import { removeFile } from '../../../services/authApi'
import { deleteData } from '../../../services/api'

class DeleteButton extends React.Component {
  state = { showDelete: false }
  deletePost = async () => {
    if(this.loading) return
    this.loading = true
    // Delete Photos
    await Promise.all(this.props.review.photos.map(async url => {
      try {
        if(url.indexOf('blob:') === 0) URL.revokeObjectURL(url)
        else await removeFile(url)
      } catch (err) {
        return null
      }
    }))
    // Delete from Database
    if(this.props.review._id) {
      let res = await deleteData(`/review/${this.props.review._id}`)
      if(!res || res.errors) {
        this.props.changeVal('reviewErrors', res.errors)
        return
      }
    }
    // Delete from Store
    this.props.changeVal('resetReview', null)
    // Redirect
    this.props.history.push('/account')
  }
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
          <button onClick={this.deletePost}
            className="box-flex-row-center">
            <Trash2 size={14} />
          </button>
        }
      </div>
    )
  }
}

export default DeleteButton