const defaultState = {
  photos: [],
  address: '',
  foodTitle: '',
  price: '',
  description: '',
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
    case 'foodTitle':
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