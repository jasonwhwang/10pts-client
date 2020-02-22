import React from 'react'
import './Saved.css'
import { connect } from 'react-redux'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import LoadingPage from '../0_Components/4_Loading/LoadingPage'

const mapStateToProps = state => ({
  user: state.common.user
})

class Saved extends React.Component {
  state = {
    loading: true
  }
  async componentDidMount() {
    this.setState({ ...this.state, loading: false })
  }

  render() {
    if (this.state.loading) return <LoadingPage />

    return (
      <FadeTransition>
        <div className="page">
          <HelmetProvider><Helmet>
            <title>Saved</title>
            <meta name="description" content="Saved" />
          </Helmet></HelmetProvider>

          <div className="box-flex-row">
            <div className="list-saved-image box-background">Box</div>

            <div className="box-flex-col box-flex-1 box-padding-15">
              <div className="box-flex-row box-flex-1">
                <div className="box-flex-1">
                  <h6 className="box-text-bold">Title</h6>
                  <h6 className="box-text-nobold box-text-7">Address</h6>
                </div>
                <h6 className="box-margin-left-10 card-pts-medium box-flex-row-center">5</h6>
              </div>

              <div className="box-flex-row">
                <h6 className="box-text-nobold box-text-7 box-flex-1">username</h6>
                <button>Button</button>
              </div>
            </div>
          </div>

        </div>
      </FadeTransition>
    )
  }
}

export default connect(mapStateToProps)(Saved)