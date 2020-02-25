import React from 'react'
import './Food.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import Card from '../0_Components/10_Cards/Card'

const mapStateToProps = state => ({
  user: state.common.user
})

class Food extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />
    let params = this.props.match.params
    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Food</title>
            <meta name="description" content="Food" />
            {params.path !== "f" &&
              <link rel="canonical" href={`${process.env.REACT_APP_url_LINK}/f/${params.foodname}`} />
            }
          </Helmet></HelmetProvider>

          <FoodMain {...this.props} data={data} />

        </div>
      </FadeTransition>
    )
  }
}

const FoodMain = (props) => {
  let params = props.match.params
  let tab = ''
  if (params.path) {
    if (params.path.indexOf('search') === 0) tab = '/search'
    else if (params.path.indexOf('saved') === 0) tab = '/saved'
    else if (params.path.indexOf('account') === 0) tab = '/account'
  }
  return (
    <>
      <Card {...props.data} tab={tab} params={params} />

      <div className="box-flex-row box-flex-wrap box-margin-15">
        <h6 className="box-tags box-text-7">{`$${props.data.price}`}</h6>
        {
          props.data.tags.map((tag) => {
            return <h6 key={tag._id} className="box-tags box-color-gray box-text-7 box-text-nobold">{tag.name}</h6>
          })
        }
      </div>
    </>
  )
}

let data = {
  photos: [null, null, null],
  foodname: "food-name1",
  foodTitle: "Food Name1",
  address: "City Hall, New York, NY",
  pts: 5,
  isSaved: false,
  savedCount: 7,
  reviewsCount: 9,
  hasReviewed: false,

  price: 15,
  tags: [{ _id: 10, name: 'Example Tag1' }, { _id: 11, name: 'Example Tag2' }, { _id: 12, name: 'Example Tag3' }, { _id: 13, name: 'Example Tag4' }],
  ptsTaste: 5,
  ptsAppearance: 5,
  ptsTexture: 5,
  ptsAroma: 5,
  ptsBalance: 5,
  reviews: [
    {
      user: { image: null, username: 'username' },
      pts: 5,
      likes: 35
    }
  ]
}

export default connect(mapStateToProps)(Food)