const defaultState = {
  tags: []
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'tags':
      return {
        ...state,
        [action.type]: action.val
      }
    default:
      return state;
  }
}