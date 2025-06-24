import {Component} from 'react'

import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import Home from './components/Home'

import Header from './components/Header'

import LoginForm from './components/LoginForm'

import './App.css'

import CartContext from './context/CartContext'

import Cart from './components/Cart'

// write your code here

class App extends Component {
  state = {
    cartList: [],
  }

  incrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const itemExists = prevState.cartList.find(item => item.dishId === dishId)
      if (itemExists) {
        return {
          cartList: prevState.cartList.map(item =>
            item.dishId === dishId
              ? {...item, quantity: item.quantity + 1}
              : item,
          ),
        }
      }
      const newItem = {dishId, quantity: 1} // Minimal, can be expanded
      return {cartList: [...prevState.cartList, newItem]}
    })
  }

  decrementCartItemQuantity = dishId => {
    this.setState(prevState => {
      const updatedList = prevState.cartList
        .map(item =>
          item.dishId === dishId
            ? {...item, quantity: Math.max(item.quantity - 1, 0)}
            : item,
        )
        .filter(item => item.quantity > 0)
      return {cartList: updatedList}
    })
  }

  removeCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(eachItem => eachItem.dishId !== id),
    }))
  }

  addCartItem = product => {
    // this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    //   TODO: Update the code here to implement addCartItem
    this.setState(prevState => {
      const {cartList} = prevState
      const existingItem = cartList.find(item => item.dishId === product.dishId)
      if (existingItem) {
        const updatedCartList = cartList.map(item => {
          if (item.dishId === product.dishId) {
            return {...item, quantity: item.quantity + product.quantity}
          }
          return item
        })
        return {cartList: updatedCartList}
      }
      return {cartList: [...cartList, product]}
    })
  }

  removeAllCartItems = showEmptyView => {
    this.setState({cartList: []})
  }

  render() {
    const {cartList} = this.state
    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          removeCartItem: this.removeCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeAllCartItems: this.removeAllCartItems,
        }}
      >
        <BrowserRouter>
          <Route exact path="/login" component={LoginForm} />
          <Route exact path="/" component={Home} />
          <Route exact path="/cart" component={Cart} />
        </BrowserRouter>
      </CartContext.Provider>
    )
  }
}

export default App
