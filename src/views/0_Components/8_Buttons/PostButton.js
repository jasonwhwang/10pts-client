import React from 'react'
import { connect } from 'react-redux'
import Loading from '../4_Loading/Loading'
import { postData, putData } from '../../../services/api'
import { uploadFile } from '../../../services/authApi'

const mapStateToProps = state => ({
  review: state.review,
  user: state.common.user
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class PostButton extends React.Component {
  state = { loading: false }

  componentDidMount() { this.props.changeVal('reviewErrors', null) }

  checkErrors = () => {
    let errors = {}
    let r = this.props.review
    if(!this.props.user) errors.you = 'must be logged in to post a review'
    if (r.photos.length === 0) errors.photos = 'must include at least one'
    if (!r.address) errors.address = 'is blank'
    if (!r.foodTitle) errors.food = 'is blank'
    if (!r.price) errors.price = 'is blank'
    if (r.tags.length === 0) errors.tags = 'must include at least one'
    if (!r.review) errors.review = 'is blank'
    return errors
  }

  submitPost = async () => {
    await this.setStateAsync({ ...this.state, loading: true })
    let r = { ...this.props.review }
    let errors = this.checkErrors()
    if (Object.entries(errors).length !== 0) {
      this.props.changeVal('reviewErrors', errors)
      await this.setStateAsync({ ...this.state, loading: false })
      return
    }
    this.props.changeVal('reviewErrors', null)
    // upload images
    let photos = []
    await Promise.all(r.photos.forEach(async url => {
      try {
        if (url.indexOf('blob:') === 0) {
          let img = await fetch(url)
          if (img.ok) {
            let imgName = r.foodTitle + ', ' + r.address + ', ' + this.props.user.username
            let newUrl = await uploadFile(img, imgName)
            if(!newUrl.error) photos.push(newUrl)
          }
        } else photos.push(url)
      } catch (err) {
        if (url.indexOf('blob:') === 0) URL.revokeObjectURL(url)
      }
    }))
    r.photos = photos
    // Post/Put to API
    let res = null
    if(r._id) res = await putData(`/review/${r._id}`, r)
    else await postData('/review', r)
    // Redirect to Review
    if(res.errors) {
      await this.props.changeVal('reviewErrors', res.errors)
      await this.setStateAsync({ ...this.state, loading: true })
    } else {
      await this.props.changeVal('reviewReset', null)
      this.props.history.push(`/f/${res.review.foodname}/${this.props.user.username}`)
    }
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }
  render() {
    return (
      <button onClick={this.submitPost}
        className="box-flex-row-center chevron-right defaultNav-button box-text-extraBold box-text-6">
        {this.state.loading ? <Loading small={true} /> : 'Post'}
      </button>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostButton)