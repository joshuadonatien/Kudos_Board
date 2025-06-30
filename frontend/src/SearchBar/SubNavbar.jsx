import "./SubNavbar.css"

function SubNavbar({ activeCategory, setActiveCategory, searchInputValue, handleOnSearchInputChange }) {


  const categories = ["All ", "Recent", "Celebration", "Thank You", "Inspiration"];

  return (
    <nav className="SubNavBar">

      <div className="content">

        <div className="row">
          <div className="search-bar">
            <input
              type="text"
              name="search"
              placeholder="Search Boards..."
              value={searchInputValue}
              onChange={handleOnSearchInputChange}
            />
            <button className="material-icons"> Search </button>
            <button className="material-icons"> Clear </button>
          </div>
        </div>

        <div className="row">
          <ul className={`category-menu`}>
            {categories.map((cat) => (
              <li className={activeCategory === cat ? "is-active" : ""} key={cat}>
                <button onClick={() => setActiveCategory(cat)}>{cat}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="create-board">
          <button className="create-button"> Create New Board</button>
        </div>
      </div>
    </nav>
  )
}

export default SubNavbar;