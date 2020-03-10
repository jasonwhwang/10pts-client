import React from 'react'
import './List.css'
import Card from '../10_Cards/Card'
import Card2 from '../10_Cards/Card2'
import Card3 from '../10_Cards/Card3'

class List extends React.Component {
  async componentDidMount() {
    this.initializeState()
  }
  componentDidUpdate(prevProps) {
    if (prevProps.location.pathname !== this.props.location.pathname) this.initializeState()
  }

  initializeState = async () => {
    await this.setStateAsync({})

    if (this.props.location.hash) {
      let divID = this.props.location.hash.replace('#', '')
      let divEL = document.getElementById(divID)
      if (divEL) {
        divEL.scrollIntoView({ block: 'start' })
        window.scrollBy(0, -50)
      }
    }
  }
  setStateAsync(state) {
    return new Promise((resolve) => {
      this.setState(state, resolve)
    });
  }

  render() {
    let params = this.props.match.params
    let tab = ''
    if (params.path) {
      if (params.path.indexOf('search') === 0) tab = '/search'
      else if (params.path.indexOf('account') === 0) tab = '/account'
    }

    let col = 1
    if (tab === '/search' && params.path === 'search') col = 2
    else if (tab === '/account' && !params.route) col = 3
    else if (params.path && (params.path === 'a' || params.path.indexOf('/a') !== -1) && !params.route) col = 3

    if (col === 1) return <List1 {...this.props} params={this.props.match.params} tab={tab} />
    else if (col === 2) return <List2 {...this.props} params={this.props.match.params} tab={tab} />
    else if (col === 3) return <List3 {...this.props} params={this.props.match.params} tab={tab} />
    return null
  }
}

const List1 = ({ data, tab, params, changeFollowing }) => {
  return (
    <React.Fragment>
      {data.map((foodItem, index) => {
        if (foodItem) return <Card {...foodItem} key={'index' + index} tab={tab} params={params} changeFollowing={changeFollowing}/>
        else return <Card key={'index' + index} tab={tab} params={params} />
      })}
    </React.Fragment>
  )
}

const List2 = ({ data, tab }) => {
  return (
    <div className="list-grid-2 box-flex-1">
      {data.map((foodItem, index) => {
        if (foodItem) return <Card2 {...foodItem} key={'index' + index} tab={tab} />
        else return <Card2 key={'index' + index} tab={tab} />
      })}
    </div>
  )
}

const List3 = ({ data, tab, params }) => {
  return (
    <div className="list-grid-3 box-flex-1">
      {data.map((foodItem, index) => {
        if (foodItem) return <Card3 {...foodItem} key={'index' + index} tab={tab} params={params} />
        else return <Card3 key={'index' + index} tab={tab} params={params} />
      })}
    </div>
  )
}

List.defaultProps = {
  data: [null, null, null]
}

export default List