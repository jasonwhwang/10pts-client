import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import Slider from 'rc-slider/lib/Slider'
import '../0_Components/Other/Slider.css'

const mapStateToProps = state => ({
  search: state.search
})

const mapDispatchToProps = dispatch => ({
  changeVal: (type, val) =>
    dispatch({ type, val })
})

class Filters extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  changeCategory = (e) => {
    if (e.target.id === 'food') this.props.changeVal('category', '')
    else this.props.changeVal('category', 'accounts')
  }
  changeVal = (type, val) => { this.props.changeVal(type, val) }

  render() {
    if (this.state.loading) return <LoadingPage />

    let scale = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Filters</title>
            <meta name="description" content="Filters" />
            <script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_g_API_KEY}&libraries=places`} />
          </Helmet></HelmetProvider>

          <div className="box-flex-stretch box-tabs filters-margin">
            <button id="food" onClick={this.changeCategory}
              className={`${this.props.search.category ? "box-tab" : "box-tab-selected"} box-flex-1`}>
              Food
            </button>
            <button id="accounts" onClick={this.changeCategory}
              className={`${this.props.search.category ? "box-tab-selected" : "box-tab"} box-flex-1`}>
              Accounts
            </button>
          </div>

          <div className="filters-slider">
            <div className="box-flex-row-center box-position-relative box-margin-bottom-5">
              <h3>{this.props.search.minPts}</h3>
            </div>

            <Slider min={0} max={10}
              value={this.props.search.minPts}
              onChange={(val) => this.changeVal('minPts', val)} />

            <div className="box-flex-between box-margin-top-10 pts-scale">
              {scale.map((val, index) => {
                return (
                  <h6 key={index}
                    className={`box-flex-row-center ${this.props.search.minPts === index ? 'pts-selected' : 'pts-not'}`}>
                    {index}
                  </h6>
                )
              })}
            </div>
          </div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)