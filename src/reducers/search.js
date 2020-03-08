const defaultState = {
  keywords: "",
  category: "",
  minPts: 0,
  maxPts: 10,
  minPrice: 0,
  maxPrice: 100,
  searchTags: [],
  searchData: [],
  searchLoading: false
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'keywords':
    case 'category':
    case 'minPts':
    case 'maxPts':
    case 'minPrice':
    case 'maxPrice':
    case 'searchTags':
    case 'searchData':
    case 'searchLoading':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}