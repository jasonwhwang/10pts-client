import React from 'react'
import './New.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { PlusSquare } from 'react-feather'
const jpegasus = require('jpegasus')

const mapStateToProps = state => ({
  user: state.common.user
})

class Photos extends React.Component {
  state = {
    loading: true,
    error: ''
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
    let imageURL = localStorage.getItem('imageURL')
    let res = null
    if(imageURL) {
      res = await fetch(imageURL)
      console.log(res.ok)
    }
  }

  onChange = async (e) => {
    let files = e.target.files
    const file = files[0]
    let compressed = await jpegasus.compress(file, {
      maxHeight: 1000,
      maxWidth: 1000,
      quality: 0.8,
      returnOriginalOnFailure: true,
      allowCrossOriginResourceSharing: false
    })
    console.log(files)
    console.log(file)
    console.log(compressed)
    let objectURL = URL.createObjectURL(compressed)
    console.log(objectURL)
    localStorage.setItem('imageURL', objectURL)

    let res = await fetch(objectURL)
    console.log(res.ok)
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Photos</title>
            <meta name="description" content="Photos" />
          </Helmet></HelmetProvider>

          <h6 className="box-text-nobold box-padding-15 box-color-red">{this.state.error}</h6>

          <div className="box-flex-row-center">
            <label htmlFor="photoUpload" className="photos-label box-flex-row-center">
              <input id="photoUpload" type="file" multiple accept="image/png, image/jpeg" onChange={this.onChange} />
              <PlusSquare size={28} />
            </label>
          </div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Photos)