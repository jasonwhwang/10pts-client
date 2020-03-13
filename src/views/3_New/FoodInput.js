import React from 'react'
import { getData } from '../../services/api'

class FoodInput extends React.Component {
  state = { data: [], address: '', show: false }
  show = async () => {
    if (!this.props.address || this.props.address === this.state.address) {
      this.setState({ ...this.state, show: true })
      return
    }
    let p = new URLSearchParams()
    p.set('address', this.props.address)
    let res = getData(`/food/suggestions?${p.toString()}`)
    if (res.data) this.setState({ ...this.state, data: res.data, address: this.props.address })
    this.setState({ ...this.state, show: true })
  }
  hide = () => { this.setState({ ...this.state, show: false }) }
  onClickHide = (e) => {
    let targetClass = `${e.target.className}`
    if(!targetClass.includes('foodInput')) this.hide()
  }

  componentDidMount() {
    document.addEventListener('click', this.onClickHide, false)
  }
  componentWillUnmount() {
    document.removeEventListener('click', this.onClickHide, false)
  }

  render() {
    return (
      <div className="box-flex-1 review-margin15 box-position-relative">
        <input onFocus={this.show}
          id="foodTitle"
          placeholder="Food Name"
          className="box-input box-expand-width foodInput"
          value={this.props.foodTitle}
          onChange={this.props.changeInput} />

        {this.state.show && this.state.data.length > 0 &&
          <div className="predictions-container">
            {this.state.data.map((food) => {
              if(!food.includes(this.props.foodTitle)) return null
              return (
                <button key={food}
                  onClick={() => {
                    this.props.changeFood(food)
                    this.hide()
                  }}
                  className="box-flex-row box-flex-stretch box-expand-width">
                  <span className="predictions-button box-expand-width foodInput">
                    <span className="box-text-bold box-text-7 box-margin-right-5">{food}</span>
                  </span>
                </button>
              )
            })}
          </div>
        }
      </div>
    )
  }
}

export default FoodInput