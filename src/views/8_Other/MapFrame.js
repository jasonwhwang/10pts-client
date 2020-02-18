import React from 'react'
import './Other.css'
import { Helmet, HelmetProvider } from 'react-helmet-async'
import FadeTransition from '../0_Components/7_FadeTransition/FadeTransition'
import Loading from '../0_Components/4_Loading/Loading'

class MapFrame extends React.Component {
  render() {
    let title = this.props.location.search
    let query = ""
    if(title) {
      query = title.replace("?q=","")
      title = query.replace(/,/g, ", ").replace(/\+/g, ' ')
    }

    return (
      <FadeTransition>
        <div className="page box-flex-col">
          <HelmetProvider><Helmet>
            <title>{title}</title>
            <meta name="description" content={title} />
            {this.props.match.params.path !== "map" &&
              <link rel="canonical" href={`${process.env.REACT_APP_url_LINK}/map${this.props.location.search}`} />
            }
          </Helmet></HelmetProvider>

          <div className="map-loading box-flex-row-center">
            <Loading />
          </div>

          <div className="box-flex-1 box-flex-col">
            <iframe className="box-expand-width box-flex-1 mapFrame"
              title={title}
              src={`https://www.google.com/maps/embed/v1/place?key=${process.env.REACT_APP_g_API_KEY}&q=${query}`}
              allowFullScreen
              />
          </div>

        </div>
      </FadeTransition>
    )
  }
}

export default MapFrame