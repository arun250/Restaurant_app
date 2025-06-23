import './index.css'

const TabItem = props => {
  const {menuList, onClickTabItem, onActive} = props
  const {menuCategory, menuCategoryId} = menuList
  const className = onActive ? 'activeButton' : ''
  return (
    <>
      <li className="tabList">
        <button
          className={`menuCategoryButton ${className}`}
          onClick={() => onClickTabItem(menuCategoryId)}
        >
          {menuCategory}
        </button>
      </li>
    </>
  )
}

export default TabItem
