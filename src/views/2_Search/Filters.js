import React from 'react'
import './Search.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

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
  changeInput = (e) => { this.props.changeVal(e.target.id, e.target.value) }

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

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Filters)