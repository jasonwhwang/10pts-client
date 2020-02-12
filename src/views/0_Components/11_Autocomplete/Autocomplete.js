import React from 'react'
import Script from 'react-load-script'

class Autocomplete extends React.Component {
  state = {
    city: '',
    address: ""
  }
  componentDidMount() {
    this.setState({ ...this.state, address: this.props.user.address })
  }

  onChangeInput = (e) => {
    this.setState({ ...this.state, [e.target.id]: e.target.value })
  }

  handleScriptLoad = () => {
    // Declare Options For Autocomplete
    const options = {
      types: ['(cities)'],
    };
    // Initialize Google Autocomplete
    /*global google*/ // To disable any eslint 'google not defined' errors
    this.autocomplete = new google.maps.places.Autocomplete(
      document.getElementById('address'),
      options,
    );
    // Avoid paying for data that you don't need by restricting the set of
    // place fields that are returned to just the address components and formatted
    // address.
    this.autocomplete.setFields(['address_components', 'formatted_address']);
    // Fire Event when a suggested name is selected
    this.autocomplete.addListener('place_changed', this.handlePlaceSelect);
  }

  handlePlaceSelect = () => {
    // Extract City From Address Object
    const addressObject = this.autocomplete.getPlace();
    const address = addressObject.address_components;
    // Check if address is valid
    if (address) {
      // Set State
      this.setState(
        {
          ...this.state,
          city: address[0].long_name,
          address: addressObject.formatted_address,
        }
      );
    }
  }

  render() {
    return (
      <React.Fragment>
        <Script url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_g_API_KEY}&libraries=places`}
          onLoad={this.handleScriptLoad}
        />

        <input
          id="address"
          type="text"
          maxLength="200"
          className="box-input"
          onChange={this.onChangeInput}
          value={this.state.address}
          placeholder="Address" />
      </React.Fragment>
    )
  }
}

export default Autocomplete