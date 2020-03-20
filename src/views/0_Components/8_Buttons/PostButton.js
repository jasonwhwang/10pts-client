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

class PostButton extends React.Component {
  state = { loading: false }

  async componentDidMount() {
    // let res = await removeFile('us-east-1:260e6482-c7f2-4190-919b-900ed3f13818/Beef-Noodle-Soup-Chef-Hung-Taiwanese-Beef-Noodle-Alton-Parkway-Irvine-CA-USA-10pts-RwPF43jupI.jpeg')
    // console.log(res)
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
    let errors = this.checkErrors()
    if (Object.entries(errors).length !== 0) {
      this.props.changeVal('reviewErrors', errors)
      await this.setStateAsync({ ...this.state, loading: false })
      return
    }
    this.props.changeVal('reviewErrors', null)
    // upload images
    let photos = await Promise.all(r.photos.map(async (url) => {
      try {
        if (url.indexOf('blob:') === 0) {
          let imgName = r.foodTitle + '-' + r.address + '-' + this.props.user.username
          let img = await fetch(url).then(r => r.blob())
            .then(blobFile => new File([blobFile], imgName, { type: blobFile.type }))
          if (!img) return null
          let newUrl = await uploadFile(img, imgName)
          if (newUrl.error) return null
          return newUrl
        } else if (url) return url
        else return null

      } catch (err) {
        if (url.indexOf('blob:') === 0) URL.revokeObjectURL(url)
      }
    }))
    r.photos = photos.filter(url => url !== null)
    r.price = parseInt(r.price.replace(/[^0-9]/gi, ''))

    try {
      // Post/Put to API
      let res = null
      if (r._id) res = await putData(`/review/${r._id}`, { review: r })
      else res = await postData('/review', { review: r })
      // Redirect to Review
      if (!res || res.error || res.errors) {
        await Promise.all(r.photos.map(async url => {
          await removeFile(url)
        }))
        let errors = res && res.errors ? res.errors : null
        await this.props.changeVal('reviewErrors', errors)
        await this.setStateAsync({ ...this.state, loading: false })
      } else {
        await this.props.changeVal('resetReview', null)
        this.props.history.push(`/f/${res.review.foodname}/${this.props.user.username}`)
      }
    } catch (err) {
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