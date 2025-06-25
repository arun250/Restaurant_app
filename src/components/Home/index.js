import {Component} from 'react'

import {IoCartOutline} from 'react-icons/io5'

import {Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import TabItem from '../TabItem'

import Header from '../Header'

import CartContext from '../../context/CartContext'

import './index.css'

class Home extends Component {
  state = {
    menulist: [],
    categoryList: [],
    activeTabId: '',
    dishCounts: {},
    cafeName: '',
  }

  componentDidMount() {
    this.getMenuList()
    const {dishCounts} = this.state
    const {cartList} = this.context
    cartList.forEach(item => {
      dishCounts[item.dishId] = item.quantity
    })
    return cartList
  }

  onClickPlusButton = dishId => {
    const plus = this.setState(prevState => ({
      dishCounts: {
        ...prevState.dishCounts,
        [dishId]: (prevState.dishCounts[dishId] || 0) + 1,
      },
    }))
    return plus
  }

  onClickMinusButton = dishId => {
    const minus = this.setState(prevState => {
      const currentCount = prevState.dishCounts[dishId] || 0

      if (currentCount > 0) {
        return {
          dishCounts: {
            ...prevState.dishCounts,
            [dishId]: currentCount - 1,
          },
        }
      }
      return minus
    })
  }

  onClickTabItem = id => {
    this.setState({activeTabId: id})
  }

  getFilteredDishes = () => {
    const {menuList, activeTabId} = this.state

    const filteredDishes = menuList.filter(
      eachItem => eachItem.menuCategoryId === activeTabId,
    )
    return filteredDishes
  }

  getMenuList = async () => {
    const apiUrl =
      'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
    const response = await fetch(apiUrl)
    const data = await response.json()
    console.log(data[0])
    const fetchedData = data[0].table_menu_list.map(menuList => ({
      menuCategory: menuList.menu_category,
      menuCategoryId: menuList.menu_category_id,
      menuCategoryImage: menuList.menu_category_image,
      categoryDishes: menuList.category_dishes.map(dishes => ({
        dishId: dishes.dish_id,
        dishName: dishes.dish_name,
        dishPrice: dishes.dish_price,
        dishDescription: dishes.dish_description,
        dishCurrency: dishes.dish_currency,
        addonCat: dishes.addonCat,
        dishAvailability: dishes.dish_Availability,
        dishType: dishes.dish_Type,
        dishCalories: dishes.dish_calories,
        nexturl: dishes.nexturl,
        dishImage: dishes.dish_image,
      })),
    }))
    const restaurantName = data[0].restaurant_name
    console.log(restaurantName)
    console.log(fetchedData)

    this.setState({
      menuList: fetchedData,
      activeTabId: fetchedData[0].menuCategoryId,
      cafeName: restaurantName,
      categoryDishes: fetchedData.categoryDishes,
    })
  }

  renderNavbar = () => {
    const {dishCounts, cafeName} = this.state

    return (
      <>
        <Header restaurantName={cafeName} />
      </>
    )
  }

  renderCartItems = () => (
    <CartContext.Consumer>
      {value => {
        const {
          cartList,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          addCartItem,
        } = value
        const {menuList, activeTabId} = this.state

        if (!menuList) return null

        const filteredDishes = this.getFilteredDishes()
        const allDishes = filteredDishes.flatMap(
          category => category.categoryDishes,
        )

        return (
          <>
            <ul className="unorderedListContainer">
              {menuList.map(eachItem => (
                <TabItem
                  key={eachItem.menuCategoryId}
                  menuList={eachItem}
                  onClickTabItem={this.onClickTabItem}
                  onActive={activeTabId === eachItem.menuCategoryId}
                />
              ))}
            </ul>

            <ul className="unorderedList">
              {allDishes.map(eachCategory => {
                const {dishCounts} = this.state
                const quantity = dishCounts[eachCategory.dishId] || 0

                const existingItem = cartList.find(
                  item => item.dishId === eachCategory.dishId,
                )
                // const quantity = existingItem?.quantity || 0

                return (
                  <li className="bodyContainer" key={eachCategory.dishId}>
                    <div className="DishItemContianer">
                      <div
                        className={`veg-border ${
                          eachCategory.dishType === 1 ? 'non-veg-border' : ''
                        } me-3`}
                      >
                        <div
                          className={`veg-round ${
                            eachCategory.dishType === 1 ? 'non-veg-round' : ''
                          }`}
                        />
                      </div>

                      <div className="midSection">
                        <h1 className="dishName">{eachCategory.dishName}</h1>
                        <p className="sarValue">
                          {eachCategory.dishCurrency} {eachCategory.dishPrice}
                        </p>
                        <p className="Ingredients">
                          {eachCategory.dishDescription}
                        </p>

                        {eachCategory.dishAvailability ? (
                          <>
                            <div className="incrementdecrementButtonContainer">
                              <button
                                className="minusplusIconButton"
                                disabled={quantity === 0}
                                onClick={() =>
                                  this.onClickMinusButton(eachCategory.dishId)
                                }
                              >
                                -
                              </button>
                              <p className="quantity">{quantity}</p>
                              <button
                                className="minusplusIconButton"
                                onClick={() =>
                                  this.onClickPlusButton(eachCategory.dishId)
                                }
                              >
                                +
                              </button>
                            </div>
                            {quantity > 0 && (
                              <button
                                className="addToItemButton"
                                type="button"
                                onClick={() => {
                                  value.addCartItem({...eachCategory, quantity})
                                }}
                              >
                                ADD TO CART
                              </button>
                            )}
                          </>
                        ) : (
                          <p className="not-availability-text">Not available</p>
                        )}

                        {eachCategory.addonCat.length > 0 && (
                          <p className="addon-availability-text mb-0">
                            Customizations available
                          </p>
                        )}
                      </div>

                      <p className="dish-calories">
                        {eachCategory.dishCalories} calories
                      </p>
                      <img
                        className="dishImage"
                        src={eachCategory.dishImage}
                        alt="dish"
                      />
                    </div>
                  </li>
                )
              })}
            </ul>
          </>
        )
      }}
    </CartContext.Consumer>
  )

  render() {
    return (
      <>
        {this.renderNavbar()}
        {this.renderCartItems()}
      </>
    )
  }
}

Home.contextType = CartContext

export default Home
