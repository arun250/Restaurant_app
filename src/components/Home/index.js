import {Component} from 'react'

import {IoCartOutline} from 'react-icons/io5'

import TabItem from '../TabItem'

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
  }

  onClickPlusButton = dishId => {
    this.setState(prevState => ({
      dishCounts: {
        ...prevState.dishCounts,
        [dishId]: (prevState.dishCounts[dishId] || 0) + 1,
      },
    }))
  }

  onClickMinusButton = dishId => {
    this.setState(prevState => {
      const currentCount = prevState.dishCounts[dishId] || 0

      if (currentCount > 0) {
        return {
          dishCounts: {
            ...prevState.dishCounts,
            [dishId]: currentCount - 1,
          },
        }
      }
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
    })
  }
  renderNavbar = () => {
    const {dishCounts} = this.state
    const totalCount = Object.values(dishCounts).reduce(
      (sum, qty) => sum + qty,
      0,
    )
    return (
      <>
        <nav className="navbarContainer">
          <h1 className="logoHeading">UNI Resto Cafe</h1>
          <div className="orderTextContainer">
            <p className="myOrderText">My Orders</p>
            <IoCartOutline size={25} />
            <span>{totalCount}</span>
          </div>
        </nav>
      </>
    )
  }

  render() {
    const {menuList, activeTabId, dishCounts} = this.state
    if (menuList === undefined) return null
    console.log(menuList)

    const filteredDishes = this.getFilteredDishes()
    const allDishes = filteredDishes.flatMap(
      category => category.categoryDishes,
    )
    const toggleDishes = activeTabId === '' ? allDishes : filteredDishes

    return (
      <>
        {this.renderNavbar()}
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
          {allDishes.map(eachCategory => (
            <>
              <li className="bodyContainer" key={eachCategory.dishId}>
                <div className="DishItemContianer">
                  <img
                    className="veg/non-vegIcon"
                    src={eachCategory.nxturl}
                    alt="vegIcon"
                  />
                  <div className="midSection">
                    <p className="dishName">{eachCategory.dishName}</p>
                    <p className="sarValue">
                      {eachCategory.dishCurrency} {eachCategory.dishPrice}
                    </p>
                    <p className="Ingredients">
                      {eachCategory.dishDescription}
                    </p>
                    {eachCategory.dishAvailability ? (
                      <div className="incrementdecrementButtonContainer">
                        <button
                          className="minusplusIconButton"
                          onClick={() =>
                            this.onClickMinusButton(eachCategory.dishId)
                          }
                        >
                          -
                        </button>
                        <p>{dishCounts[eachCategory.dishId] || 0}</p>
                        <button
                          className="minusplusIconButton"
                          onClick={() =>
                            this.onClickPlusButton(eachCategory.dishId)
                          }
                        >
                          +
                        </button>
                      </div>
                    ) : (
                      <p>Not available</p>
                    )}
                    {eachCategory.addonCat.length > 0 && (
                      <p>Customizations available</p>
                    )}
                  </div>
                  <p className="calories">
                    {eachCategory.dishCalories} calories
                  </p>
                  <img
                    className="dishImage"
                    src={eachCategory.dishImage}
                    alt="dishImage"
                  />
                </div>
              </li>
            </>
          ))}
        </ul>
      </>
    )
  }
}

export default Home
