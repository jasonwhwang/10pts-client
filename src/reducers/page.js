const defaultState = {
  _id: '',
  isLiked: false,
  isSaved: false,
  isReviewed: -1,
  foodname: '',
  likesCount: 0,
  savedCount: 0
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'LOG_OUT':
      return defaultState
    case 'isLiked':
    case 'isSaved':
    case 'likesCount':
    case 'savedCount':
      return {
        ...state,
        [action.type]: action.val
      }
    case 'setPage':
      return { ...state, ...action.val }
    case 'resetPage':
      return defaultState
    default:
      return state;
  }
}