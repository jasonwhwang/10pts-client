const defaultState = {
  keywords: "",
  category: "",
  minPts: 5,
  maxPrice: 50,
  tags: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'keywords':
    case 'category':
    case 'minPts':
    case 'maxPrice':
    case 'tags':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}