import React from 'react'
import './List.css'
import CardRow1 from '../10_Cards/CardRow1'
import CardRow2 from '../10_Cards/CardRow2'
import CardRow3 from '../10_Cards/CardRow3'

class ListRow extends React.Component {
  render() {
    let params = this.props.match.params
    let tab = ''
    if (params.path) {
      if (params.path.indexOf('saved') === 0) tab = '/saved'
      else if (params.path.indexOf('account') === 0) tab = '/account'
      else if (params.path.indexOf('search') === 0) tab = '/search'
    }
    
    let isSaved = params.route === 'saved' || params.route === 'likes'
    let isFollowers = params.route === 'followers' || params.route === 'following'

    if(tab === '/saved' && params.path !== 'saved/following') {
      return <ListRow1 {...this.props} params={this.props.match.params} tab={tab} />
    } else if(tab === '/saved' && params.path === 'saved/following') {
      return <ListRow2 {...this.props} params={this.props.match.params} tab={tab} />
    }

    else if(tab === '/account' && isSaved) {
      return <ListRow1 {...this.props} params={this.props.match.params} tab={tab} />
    } else if (params.path && (params.path === 'a' || params.path.indexOf('/a') !== -1) && isSaved) {
      return <ListRow1 {...this.props} params={this.props.match.params} tab={tab} />
    }

    else if(tab === '/account' && isFollowers) {
      return <ListRow3 {...this.props} params={this.props.match.params} tab={tab} />
    } else if (params.path && (params.path === 'a' || params.path.indexOf('/a') !== -1) && isFollowers) {
      return <ListRow3 {...this.props} params={this.props.match.params} tab={tab} />
    }

    else if(tab === '/search') {
      return <ListRow3 {...this.props} params={this.props.match.params} tab={tab} />
    }

    return null
  }
}

const ListRow1 = ({ data, tab, params }) => {
  return (
    <>
      {data.map((foodItem, index) => {
        if (foodItem) return <CardRow1 {...foodItem} key={foodItem.foodname + index} tab={tab} params={params} />
        else return <CardRow1 key={'index' + index} tab={tab} params={params} />
      })}
    </>
  )
}

const ListRow2 = ({ data, tab, params }) => {
  return (
    <>
      {data.map((item, index) => {
        if (item) return <CardRow2 {...item} key={item._id + index} tab={tab} params={params} />
        else return <CardRow2 key={'index' + index} tab={tab} params={params} />
      })}
    </>
  )
}

const ListRow3 = ({ data, tab, params }) => {
  return (
    <>
      {data.map((item, index) => {
        if (item) return <CardRow3 {...item} key={index} tab={tab} params={params} />
        else return <CardRow3 key={'index' + index} tab={tab} params={params} />
      })}
    </>
  )
}

ListRow.defaultProps = {
  data: [null, null, null]
}

export default ListRow