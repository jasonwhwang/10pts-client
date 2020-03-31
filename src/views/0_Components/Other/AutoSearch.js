import React from 'react'
import Script from 'react-load-script'
import './AutoSearch.css'

// Google Search Autocomplete
// - use google API to search to autocomplete addresses
// - custom component instead of widget to show only food/restaurants
// Sources:
// https://medium.com/@hamzaqaisrani/using-the-google-maps-places-autocomplete-javascript-api-in-a-react-project-5742bab4abc9
// https://developers.google.com/places/web-service/autocomplete#place_autocomplete_results
// Get predictions programatically:
// https://developers.google.com/maps/documentation/javascript/places-autocomplete
class AutoSearch extends React.Component {
  state = { predictions: [], click: false }
  load = () => {
    /*global google*/
    this.autocomplete = new google.maps.places.AutocompleteService()
  }
  predictionsCallback = (predictions, status) => {
    if (status !== google.maps.places.PlacesServiceStatus.OK) return
    this.setState({ ...this.state, predictions: predictions })
  }

  componentDidUpdate(prevProps) {
    if (this.state.click) {
      this.setState({ ...this.state, click: false })
      return
    } else if (this.props.address
      && this.props.address !== prevProps.address
      && this.props.address.length > prevProps.address.length) {

      if (!this.sToken) {
        this.sToken = new google.maps.places.AutocompleteSessionToken()
        setTimeout(() => {
          this.sToken = null
        }, 180000)
      }
      this.autocomplete.getPlacePredictions({
        input: this.props.address,
        types: ['establishment'],
        sessionToken: this.sToken
      }, this.predictionsCallback)
    }
  }
  changeAddressReset = (address) => {
    this.props.changeAddress(address)
    this.setState({ ...this.state, predictions: [], click: true })
  }

  render() {
    return (
      <div className="box-margin-15 box-position-relative" id="inputContainer">
        <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_g_API_KEY}&libraries=places`}
          onLoad={this.load} />

        <input
          id="address"
          type="text"
          maxLength="200"
          className="box-input box-expand-width"
          onChange={this.props.changeInput}
          value={this.props.address}
          placeholder="Restaurant" />

        <Predictions data={this.state.predictions} changeAddress={this.changeAddressReset} />
      </div>
    )
  }
}

const Predictions = ({ data, changeAddress }) => {
  if (data.length === 0) return null
  let allFood = []
  data.forEach((p) => {
    if (!p.types.includes('food')) return null
    else allFood.push(p)
  })
  if (allFood.length === 0) return null

  return (
    <div className="predictions-container pac-logo">
      {allFood.map((p) => {
        let t = p.structured_formatting
        return (
          <button
            onClick={() => changeAddress(p.description)}
            key={p.id}
            className="box-flex-row box-flex-stretch box-expand-width">
            <span className="predictions-button box-expand-width">
              <span className="box-text-bold box-text-7 box-margin-right-5">{t.main_text}</span>
              <span className="box-text-nobold box-text-7 box-color-mediumgray">{t.secondary_text}</span>
            </span>
          </button>
        )
      })}
    </div>
  )
}

export default AutoSearch