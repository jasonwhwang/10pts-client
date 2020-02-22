import React from 'react'
import './New.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { Plus, X } from 'react-feather'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'

const Compress = require('client-compress')
const options = {
  targetSize: 0.5,
  quality: 1,
  maxWidth: 1200,
  maxHeight: 1200,
  minQuality: 0.5,
  qualityStepSize: 0.05
}
const compress = new Compress(options)

const mapStateToProps = state => ({
  user: state.common.user,
  review: state.review
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Photos extends React.Component {
  state = {
    loading: true,
    error: '',
    scale: false
  }
  componentDidMount() {
    this.setPhotos()
    this.setState({ ...this.state, loading: false })
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

  setPhotos = async () => {
    let photos = this.props.review.photos
    photos = await Promise.all(photos.map(async url => {
      try {
        let res = await fetch(url)
        if (res.ok) return url
      } catch (err) {
        URL.revokeObjectURL(url)
        return null
      }
    }))
    photos = photos.filter(url => url !== null)
    await this.props.changeVal('photos', photos)
  }
  onChange = async (e) => {
    const files = [...e.target.files]
    e.target.value = ''
    if (files.length < 1) return
    let conversions = await compress.compress(files)
    const { photo } = conversions[0]
    // console.log({ photo, info })
    const objectUrl = URL.createObjectURL(photo.data)
    // console.log(objectUrl)
    let newPhotos = [...this.props.review.photos, objectUrl]
    await this.props.changeVal('photos', newPhotos)
  }
  removePhoto = (url) => {
    let filtered = this.props.review.photos.filter(photo => photo !== url)
    this.props.changeVal('photos', filtered)
    URL.revokeObjectURL(url)
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    let hideButton = this.state.scale || this.props.review.photos.length >= 5

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Photos</title>
            <meta name="description" content="Photos" />
            <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no, minimum-scale=1, maximum-scale=5, user-scalable=yes"></meta>
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            {this.state.error &&
              <h6 className="box-text-nobold box-padding-15 box-color-red">{this.state.error}</h6>
            }

            <div className="box-flex-row-center">
              <label htmlFor="photoUpload" className={`${hideButton && "box-hide"} photos-label box-flex-row-center box-shadow box-border-lite`}>
                <input id="photoUpload" type="file" accept="image/png, image/jpeg" onChange={this.onChange} />
                <Plus size={28} />
              </label>
            </div>

            {this.props.review.photos.map(photo => {
              return (
                <div className="box-expand-width box-flex-col box-position-relative" key={photo}>
                  <button id={photo} onClick={() => this.removePhoto(photo)}
                    className="photos-xButton box-flex-row-center">
                    <X size={18} />
                  </button>
                  <img className="box-expand-width" src={photo} alt="New Food" />
                </div>
              )
            })}

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Photos)