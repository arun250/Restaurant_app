import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {IoCartOutline} from 'react-icons/io5'

import {AiOutlineShoppingCart} from 'react-icons/ai'

import Cookies from 'js-cookie'

import CartContext from '../../context/CartContext'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  const {restaurantName} = props
  return (
    <>
      <CartContext.Consumer>
        {value => {
          const {cartList} = value

          const cartListLength = cartList.length

          return (
            <nav className="navbarContainer">
              <Link to="/" className="linkedItems">
                <h1 className="logoHeading">{restaurantName}</h1>
              </Link>
              <div className="orderTextContainer">
                <p className="myOrderText">My Orders</p>
                <div className="cart-icon-link">
                  <Link to="/cart">
                    <button
                      type="button"
                      className="cart-icon-button"
                      data-testid="cart"
                    >
                      <AiOutlineShoppingCart className="cart-icon" />
                    </button>
                  </Link>
                  <div className="cart-count-badge">
                    <p className="m-0 cart-count">{cartListLength}</p>
                  </div>
                </div>
                <button
                  type="submit"
                  className="logout-button"
                  onClick={onClickLogout}
                >
                  Logout
                </button>
              </div>
            </nav>
          )
        }}
      </CartContext.Consumer>
    </>
  )
}

export default withRouter(Header)
