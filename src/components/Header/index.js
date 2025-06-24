import './index.css'

import {Link, withRouter} from 'react-router-dom'

import {IoCartOutline} from 'react-icons/io5'

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
              <h1 className="logoHeading">{restaurantName}</h1>
              <ul className="unorderedList">
                <Link to="/" className="linkedItems">
                  <li className="menuItems">Home</li>
                </Link>
              </ul>
              <div className="orderTextContainer">
                <p className="myOrderText">My Orders</p>
                <Link to="/cart" className="linkedItems">
                  <button className="cartIcon" data-testid="cart" type="button">
                    <IoCartOutline size={25} />
                  </button>
                  <p>{cartListLength}</p>
                </Link>
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
