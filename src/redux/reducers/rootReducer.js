const initialState = {}

export default function reducer(state = initialState, outAction) {
  const { type, action } = outAction

  switch (type) {
    case 'AddToCart':
      return {
        ...state,
        cart: [...state.cart, action],
        cartTotalItem: state.cartTotalItem + 1
      }

    default:
      return state
  }
}
