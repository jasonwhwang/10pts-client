import React from 'react'

class PhotosList extends React.Component {
  async componentDidMount() {
    let photos = this.props.photos
    photos = await Promise.all(photos.map(async url => {
      try {
        if(url.indexOf('blob:') !== 0) return url
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
  render() {
    let empty = Array(5 - this.props.photos.length).fill(0)
    return (
      <div className="photoPreviews">
        {this.props.photos.map((photo, index) => {
          return <img src={photo} key={photo ? photo : index} alt="New Review" className="box-img" />
        })}
        {empty.map((val, index) => {
          return <div key={index} className="box-img box-background"></div>
        })}
      </div>
    )
  }
}

export default PhotosList