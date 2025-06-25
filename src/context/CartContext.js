import React from 'react'

const CartContext = React.createContext({
  cartList: [],
  resname: '',
  removeAllCartItems: () => {},
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  addingResName: () => {},
})

export default CartContext
