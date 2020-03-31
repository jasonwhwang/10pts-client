import React from 'react'
import { connect } from 'react-redux'
import Loading from '../4_Loading/Loading'
import { postData, putData } from '../../../services/api'
import { uploadFile, removeFile } from '../../../services/authApi'
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => ({
  review: state.review,
  user: state.common.user
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

// Post Button
// - Logic for posting new review to database
class PostButton extends React.Component {
  state = { loading: false }

  async componentDidMount() {
    this.props.changeVal('reviewErrors', null)
  }

  checkErrors = () => {
    let errors = {}
    let r = this.props.review
    if (!this.props.user) errors.you = 'must be logged in to post a review'
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
    // Errors - check review for errors
    let errors = this.checkErrors()
    if (Object.entries(errors).length !== 0) {
      this.props.changeVal('reviewErrors', errors)
      await this.setStateAsync({ ...this.state, loading: false })
      return
    }
    this.props.changeVal('reviewErrors', null)
    // Images - fetch images from objectURL and upload each
    let photos = await Promise.all(r.photos.map(async (url) => {
      try {
        if (url.indexOf('blob:') === 0) {
          let imgName = r.foodTitle + '-' + r.address + '-' + this.props.user.username
          let img = await fetch(url).then(r => r.blob())
            .then(blobFile => new File([blobFile], imgName, { type: blobFile.type }))
          if (!img) return null
          let newUrl = await uploadFile(img, imgName)
          URL.revokeObjectURL(url)
          if (newUrl.error) return null
          return newUrl
        } else if (url) return url
        else return null

      } catch (err) {
        if (url.indexOf('blob:') === 0) URL.revokeObjectURL(url)
      }
    }))
    // Remove null URL photos
    r.photos = photos.filter(url => url !== null)
    // Remove '$' prefix from review price
    r.price = parseInt(r.price.replace(/[^0-9]/gi, ''))

    try {
      // Upload - Post/Put to API
      let res = null
      if (r._id) res = await putData(`/review/${r._id}`, { review: r })
      else res = await postData('/review', { review: r })
      // Check if errors
      if (!res || res.error || res.errors) {
        // if error, remove all uploaded photos
        await Promise.all(r.photos.map(async url => {
          await removeFile(url)
        }))
        let errors = res && res.errors ? res.errors : null
        await this.props.changeVal('reviewErrors', errors)
        await this.setStateAsync({ ...this.state, loading: false })
      } else {
        // else remove review from store & redirect
        await this.props.changeVal('resetReview', null)
        this.props.history.push(`/f/${res.review.foodname}/${this.props.user.username}`)
      }
    } catch (err) {
      // if error on review upload, remove all uploaded photos
      await Promise.all(r.photos.map(async url => {
        await removeFile(url)
      }))
      await this.setStateAsync({ ...this.state, loading: false })
      console.log(err)
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(PostButton))