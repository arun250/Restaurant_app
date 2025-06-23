import {Component} from 'react'

import './index.css'

import {FaMinus} from 'react-icons/fa'
import {FaPlus} from 'react-icons/fa'

class DishItem extends Component {
  render() {
    const {categoryList} = this.props
    const {
      dishAvailability,
      dishCalories,
      dishCurrency,
      dishDescription,
      dishName,
      dishPrice,
      dishType,
      dishImage,
      nxturl,
    } = categoryList
    const {count} = this.state

    return <></>
  }
}

export default DishItem
