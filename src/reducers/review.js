const defaultState = {
  photos: [],
  address: '',
  suggestions: [],
  foodTitle: '',
  foodname: '',
  price: '',
  tags: [],
  pts: 5,
  ptsTaste: 5,
  ptsAppearance: 5,
  ptsTexture: 5,
  ptsAroma: 5,
  ptsBalance: 5,
  review: ''
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'photos':
    case 'address':
    case 'suggestions':
    case 'foodTitle':
    case 'foodname':
    case 'price':
    case 'description':
    case 'tags':
    case 'pts':
    case 'ptsTaste':
    case 'ptsAppearance':
    case 'ptsTexture':
    case 'ptsAroma':
    case 'ptsBalance':
    case 'review':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}