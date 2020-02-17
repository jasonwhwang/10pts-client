const defaultState = {
  address: "",
  foodTitle: "",
  price: "",
  description: "",
  tags: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'address':
    case 'foodTitle':
    case 'price':
    case 'description':
    case 'tags':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}