import React from 'react'
import './List.css'
import FoodRowCard from '../10_Cards/FoodRowCard'
import NotificationCard from '../10_Cards/NotificationCard'
import AccountCard from '../10_Cards/AccountCard'

class ListRow extends React.Component {
  render() {
    let params = this.props.match.params
    let tab = ''
    if (params.path) {
      if (params.path.indexOf('search') === 0) tab = '/search'
      else if (params.path.indexOf('saved') === 0) tab = '/saved'
      else if (params.path.indexOf('account') === 0) tab = '/account'
    }
    
    let isSaved = params.route === 'saved' || params.route === 'likes'
    let isFollowers = params.route === 'followers' || params.route === 'following'
    if(isSaved) {
      return <FoodRow {...this.props} tab={tab} />
    } else if (params.path && (params.path === 'a' || params.path.indexOf('/a') !== -1) && isSaved) {
      return <FoodRow {...this.props} tab={tab} />
    }

    else if(isFollowers) {
      return <AccountRow {...this.props} tab={tab} />
    } else if (params.path && (params.path === 'a' || params.path.indexOf('/a') !== -1) && isFollowers) {
      return <AccountRow {...this.props} tab={tab} />
    }

    return null
  }
}

export const FoodRow = ({ data, tab }) => {
  return (
    <>
      {data.map((foodItem, index) => {
        return <FoodRowCard {...foodItem} key={'index' + index} tab={tab} />
      })}
    </>
  )
}

export const NotificationRow = ({ data }) => {
  return (
    <>
      {data.map((item, index) => {
        return <NotificationCard {...item} key={'index'+index} />
      })}
    </>
  )
}

export const AccountRow = ({ data, tab }) => {
  return (
    <>
      {data.map((item, index) => {
        return <AccountCard {...item} key={index} tab={tab} />
      })}
    </>
  )
}

ListRow.defaultProps = {
  data: [null, null, null]
}

export default ListRow