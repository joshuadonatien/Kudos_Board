import React, { useState } from "react";
import "./SubNavbar.css"; // This import caused a "Could not resolve" error.


// Added onCreateBoard prop
function SubNavbar({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  handleOnSearchInputChange,
  onSearchSubmit,
  onClearSearch,
  onCreateBoard,
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

  // States for the new board form inputs
  const [newBoardTitle, setNewBoardTitle] = useState("");
  const [newBoardCategory, setNewBoardCategory] = useState("");
  const [newBoardAuthor, setNewBoardAuthor] = useState("");
  const [newBoardImage_url, setNewBoardImage_url] = useState(""); // Added image_url state

  const toggleCreateBoardModal = () => {
    setShowCreateBoardModal(!showCreateBoardModal);
    if (!showCreateBoardModal) {
      // Reset form fields when closing the modal
      setNewBoardTitle("");
      setNewBoardCategory("");
      setNewBoardAuthor("");
      setNewBoardImage_url(""); // Reset image URL too
    }
  };

  const handleCreateBoardSubmit = (e) => {
    e.preventDefault();

    if (
      !newBoardTitle.trim() ||
      !newBoardCategory.trim() 
    ) {
      alert("Please fill in all required fields (Title, Category)."); // Consider a custom modal for alerts
      return;
    }
    // image_url is optional as per requirements, so no need to check trim() for it
    // If you need it to be required, add || !newBoardImage_url.trim() to the condition above

    // Call the onCreateBoard prop function, passing the new board data
    // This function will be provided by the parent component (Home.jsx)
    onCreateBoard({
      title: newBoardTitle,
      category: newBoardCategory,
      author: newBoardAuthor,
      image_url:
        newBoardImage_url ||
        "https://placehold.co/400x300/cccccc/333333?text=Board+Image", // Provide a default if optional
    });

    toggleCreateBoardModal(); // Close the modal after submission
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
              onKeyPress={(e) => {
                // NEW: Handle Enter key for search
                if (e.key === "Enter") {
                  onSearchSubmit();
                }
              }}
            />
            {/* NEW: onClick handler for Search button */}
            <button className="material-icons" onClick={onSearchSubmit}>
              {" "}
              Search{" "}
            </button>
            {/* NEW: onClick handler for Clear button */}
            <button className="material-icons" onClick={onClearSearch}>
              {" "}
              Clear{" "}
            </button>
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
          <button className="create-button" onClick={toggleCreateBoardModal}>
            Create New Board
          </button>
        </div>
      </div>

      {/* Create New Board Modal */}
      {showCreateBoardModal && (
        <div className="modal-overlay">
          <div
            className="create-board-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button for the modal */}
            <button className="close-button" onClick={toggleCreateBoardModal}>
              &times;
            </button>
            <h2 className="modal-title">Create a New Board</h2>

            <form
              onSubmit={handleCreateBoardSubmit}
              className="create-board-form"
            >
              <label htmlFor="newBoardTitle">Title<span className="stars">*</span></label>
              <div className="form-group">
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
                <label htmlFor="newBoardCategory">Category<span className="stars">*</span></label>
                <select
                  id="newBoardCategory"
                  className={`category-select ${
                    newBoardCategory
                      ? `select-${newBoardCategory
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`
                      : ""
                  }`}
                  value={newBoardCategory}
                  onChange={(e) => setNewBoardCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {/* Filter out "All" category if it's not a real category for new boards */}
                  {categories
                    .filter((cat) => cat !== "All " && cat !=="Recent" )
                    .map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                </select>
              </div>

              <label htmlFor="newBoardAuthor">Author</label>
              <div className="form-group">
                <input
                  type="text"
                  id="newBoardAuthor"
                  placeholder='Like "William Shakespeare"'
                  value={newBoardAuthor}
                  onChange={(e) => setNewBoardAuthor(e.target.value)}
                />
              </div>

              <div className="create-board-submit-containter">
                <button type="submit" className="create-board-submit-btn">
                  Create Board
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </nav>
  );
}

export default SubNavbar;
