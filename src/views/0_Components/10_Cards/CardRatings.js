import React from 'react'
import Card from './Card'
import ProgressBar from '../Other/ProgressBar'
import Photo from '../../../img/user.png'

export const CardRatings = (props) => {
  let { ptsTaste, ptsAppearance, ptsTexture, ptsAroma, ptsBalance } = props.data
  if(!props.data.account) {
    ptsTaste = Number(ptsTaste).toFixed(1)
    ptsAppearance = Number(ptsAppearance).toFixed(1)
    ptsTexture = Number(ptsTexture).toFixed(1)
    ptsAroma = Number(ptsAroma).toFixed(1)
    ptsBalance = Number(ptsBalance).toFixed(1)
  }
  return (
    <>
      <Card {...props.data} tab={props.tab} params={props.params} />
      <TagsList price={props.data.price} tags={props.data.tags} />

      <ProgressBar pts={ptsTaste} label={'Taste'} />
      <ProgressBar pts={ptsAppearance} label={'Appearance'} />
      <ProgressBar pts={ptsTexture} label={'Texture'} />
      <ProgressBar pts={ptsAroma} label={'Aroma'} />
      <ProgressBar pts={ptsBalance} label={'Balance'} />
    </>
  )
}

export const PhotosList = (props) => {
  return (
    <>{props.data.photos.map((photo, index) => {
      let altTxt = `${props.data.foodTitle}, ${props.data.address}, Image ${index}`
      return (
        <div className="box-expand-width box-flex-col box-position-relative" key={altTxt}>
          <img className="box-expand-width" src={photo ? photo : Photo} alt={altTxt} />
        </div>
      )
    })}</>
  )
}

export const TagsList = ({ price, tags }) => {
  return (
    <div className="box-flex-row box-flex-wrap box-margin-15">
      <h6 className="box-tags box-text-7">{`$${Math.round(price)}`}</h6>
      {tags.map((tag) => {
        return <h6 key={tag._id} className="box-tags box-color-gray box-text-7 box-text-nobold">{tag.name}</h6>
      })}
    </div>
  )
}