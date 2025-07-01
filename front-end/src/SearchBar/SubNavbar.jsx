import "./SubNavbar.css";

import React, { useState } from "react"; // Import useState for modal and form state

function SubNavbar({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  handleOnSearchInputChange,
}) {
  const categories = [
    "All ",
    "Recent",
    "Celebration",
    "Thank You",
    "Inspiration",
  ];

  // State for controlling the visibility of the "Create New Board" modal
  const [showCreateBoardModal, setShowCreateBoardModal] = useState(false);

  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardCategory, setNewBoardCategory] = useState("");
  const [newBoardAuthor, setNewBoardAuthor] = useState("");
  const [newBoardImage_url, setNewBoardImage_url] = useState("");

  const toggleCreateBoardModal = () => {
    setShowCreateBoardModal(!showCreateBoardModal);
    if (!showCreateBoardModal) {
      setNewBoardTitle("");
      setNewBoardCategory("");
      setNewBoardAuthor("");
    }
  };

  const handleCreateBoardSubmit = (e) => {
    e.preventDefault();

    if (
      !newBoardTitle.trim() ||
      !newBoardCategory.trim() ||
      !newBoardAuthor.trim() ||
      !newBoardImage_url.trim()
    ) {
      alert("Please fill in all required fields (Title, Category, Author)."); // Consider a custom modal for alerts
      return;
    }

    console.log("New Board Data:", {
      title: newBoardTitle,
      category: newBoardCategory,
      author: newBoardAuthor,
      image_url: newBoardImage_url,
    });
    toggleCreateBoardModal();
  };

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
              <li
                className={`${cat.toLowerCase()} ${
                  activeCategory === cat ? "is-active" : ""
                }`}
                key={cat}
              >
                <button onClick={() => setActiveCategory(cat)}>{cat}</button>
              </li>
            ))}
          </ul>
        </div>
        <div className="create-board">
          {/* Button to open the Create New Board Modal */}
          <button className="create-button" onClick={toggleCreateBoardModal}>
            Create New Board
          </button>
        </div>
      </div>

      {/* Create New Board Modal */}
      {showCreateBoardModal && (
        <div className="modal-overlay">
            {/* Close button for the modal */}
            <button className="close-button" onClick={toggleCreateBoardModal}>
              &times;
            </button>
          <div
            className="create-board-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="modal-title">Create a New Board</h2>

            <form
              onSubmit={handleCreateBoardSubmit}
              className="create-board-form"
            >
              <div className="form-group">
                <label htmlFor="newBoardTitle">Title:</label>
                <input
                  type="text"
                  id="newBoardTitle"
                  placeholder='Like "Birthdays" or "Work"'
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newBoardCategory">Category:</label>
                <select
                  id="newBoardCategory"
                  className={`category-select ${newBoardCategory ? `select-${newBoardCategory.toLowerCase().replace(/\s+/g, '-')}` : ''}`}
                  value={newBoardCategory}
                  onChange={(e) => setNewBoardCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {/* Filter out "All" category if it's not a real category for new boards */}
                  {categories
                    .filter((cat) => cat !== "All ")
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="newBoardAuthor">Author:</label>
                <input
                  type="text"
                  id="newBoardAuthor"
                  value={newBoardAuthor}
                  onChange={(e) => setNewBoardAuthor(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="create-board-submit-btn">
                Create Board
              </button>
            </form>

          </div>
        </div>
      )}
    </nav>
  );
}

export default SubNavbar;
