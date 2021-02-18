const initialState = {
  userToken: null
}

export default function reducer(state = initialState, outAction) {
  const { type, action } = outAction

  switch (type) {
    case 'AddUserToken':
      return {
        ...state,
        userToken: action.userToken
      }

    default:
      return state
  }
}
