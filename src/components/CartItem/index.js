import {BsPlusSquare, BsDashSquare} from 'react-icons/bs'
import {AiFillCloseCircle} from 'react-icons/ai'

import CartContext from '../../context/CartContext'

import './index.css'

const CartItem = props => (
  <CartContext.Consumer>
    {value => {
      const {
        removeCartItem,
        incrementCartItemQuantity,
        decrementCartItemQuantity,
      } = value
      const {cartItemDetails} = props
      const {dishId, dishPrice, dishImage, dishName} = cartItemDetails
      console.log(cartItemDetails)
      const onRemoveCartItem = () => {
        removeCartItem(dishId)
      }
      // TODO: Update the functionality to increment and decrement quantity of the cart item
      const onIncrementCartItem = () => {
        incrementCartItemQuantity(dishId)
      }

      const onDecrementCartItem = () => {
        decrementCartItemQuantity(dishId)
      }

      return (
        <li className="cart-item">
          <img className="cart-product-image" src={dishImage} alt={dishName} />
          <div className="cart-item-details-container">
            <div className="cart-product-title-brand-container">
              <p className="cart-product-title">{dishName}</p>
            </div>
            <div className="cart-quantity-container">
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onDecrementCartItem}
              >
                -
              </button>
              <p className="cart-quantity">{cartItemDetails.quantity}</p>
              <button
                type="button"
                className="quantity-controller-button"
                onClick={onIncrementCartItem}
              >
                +
              </button>
            </div>
            <div className="total-price-remove-container">
              <p className="cart-total-price">
                Rs {dishPrice * cartItemDetails.quantity}/-
              </p>
              <button
                className="remove-button"
                type="button"
                data-testid="remove"
                onClick={onRemoveCartItem}
              >
                Remove
              </button>
            </div>
          </div>
          <button
            className="delete-button"
            type="button"
            onClick={onRemoveCartItem}
          >
            <AiFillCloseCircle color="#616E7C" size={20} />
          </button>
        </li>
      )
    }}
  </CartContext.Consumer>
)

export default CartItem
