const defaultState = {
  keywords: "",
  category: "",
  minPts: "",
  maxPrice: "",
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