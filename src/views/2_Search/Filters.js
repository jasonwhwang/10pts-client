import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'
import { SearchPtsSlider, SearchPriceSlider } from '../0_Components/Other/Sliders'
import Tags from '../0_Components/6_Tags/Tags'
import ErrorBoundary from '../0_Components/3_ErrorBoundary/ErrorBoundary'
import { HideTabBarInput } from '../0_Components/Other/HideTabBar'

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
    await this.setState({ ...this.state, loading: false })
    let container = document.getElementsByClassName('react-tags')[0]
    if (container) container.style.border = '2px solid var(--black)'
  }

  changeCategory = (e) => {
    if (e.target.id === 'food') this.props.changeVal('category', '')
    else this.props.changeVal('category', 'accounts')
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Filters</title>
            <meta name="description" content="Filters" />
            <script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_g_API_KEY}&libraries=places`} />
          </Helmet></HelmetProvider>
          <ErrorBoundary>

            <div className="box-flex-stretch box-tabs box-margin-15">
              <button id="food" onClick={this.changeCategory}
                className={`${this.props.search.category ? "box-tab" : "box-tab-selected"} box-flex-1`}>
                Food
            </button>
              <button id="accounts" onClick={this.changeCategory}
                className={`${this.props.search.category ? "box-tab-selected" : "box-tab"} box-flex-1`}>
                Accounts
            </button>
            </div>

            <SearchPtsSlider
              minPts={this.props.search.minPts}
              maxPts={this.props.search.maxPts}
              changeVal={this.props.changeVal} />

            <SearchPriceSlider
              minPrice={this.props.search.minPrice}
              maxPrice={this.props.search.maxPrice}
              changeVal={this.props.changeVal} />

            <HideTabBarInput>
              <div className="tags-margin box-position-relative" id="inputContainer">
                <h6 className="box-text-nobold box-text-uppercase box-text-7 box-margin-bottom-10">Tags</h6>
                <Tags
                  borderColor={'black'}
                  tags={this.props.search.searchTags}
                  changeVal={this.props.changeVal}
                  allowNew={false}
                  type={'searchTags'} />
              </div>
            </HideTabBarInput>

          </ErrorBoundary>
        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)