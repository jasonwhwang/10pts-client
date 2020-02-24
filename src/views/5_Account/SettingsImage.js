import React from 'react'
import { uploadFile, removeFile } from '../../services/authApi'
import Loading from '../0_Components/4_Loading/Loading'
// import { putUser } from '../../../services/api'
import Image from '../../img/user.png'

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

class SettingsImage extends React.Component {
  state = {
    error: "",
    loading: false
  }

  onChangeInput = async (e) => {
    const files = [...e.target.files]
    e.target.value = ''
    if (files.length < 1) return
    let conversions = await compress.compress(files)
    const { photo } = conversions[0]
    let file = photo.data

    if (file.type !== 'image/png' && file.type !== 'image/jpeg') {
      this.setState({ ...this.state, error: "File type must be PNG or JPEG.", loading: false })
      return
    }
    this.setState({ ...this.state, loading: true })
    if (this.props.user.image) await removeFile(this.props.user.image)
    let response = await uploadFile(file)
    if (response.error) {
      this.setState({ ...this.state, error: response.error, loading: false })
      return
    }

    // let data = { user: { image: response } }
    // response = await putUser(data)
    // this.props.changeUser(response.user)
    this.setState({ ...this.state, loading: false, error: "" })

  }

  render() {
    return (
      <div className="box-flex-row-center box-margin-15 box-margin-top-20">
        <label htmlFor="photoUpload"
          className="account-image box-flex-row-center">
          <input id="photoUpload" type="file" accept="image/png, image/jpeg" onChange={this.onChangeInput} />
          {!this.state.loading &&
            <img
              src={this.props.user && this.props.user.image ? this.props.user.image : Image}
              className="box-img"
              alt={this.props.user && this.props.user.username ? this.props.user.username : "Account"} />
          }
          {this.state.loading &&
            <Loading small={true} />
          }
        </label>
      </div>
    )
  }
}

export default SettingsImage