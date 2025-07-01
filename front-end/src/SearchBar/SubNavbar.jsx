import React, { useState } from "react";
import "./SubNavbar.css"; // This import caused a "Could not resolve" error.

// Added onCreateBoard prop
function SubNavbar({ activeCategory, setActiveCategory, searchInputValue, handleOnSearchInputChange, onSearchSubmit, onClearSearch, onCreateBoard }) {
  const categories = ["All ", "Recent", "Celebration", "Thank You", "Inspiration"];

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

    if (!newBoardTitle.trim() || !newBoardCategory.trim() || !newBoardAuthor.trim()) {
      alert("Please fill in all required fields (Title, Category, Author).");
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
      image_url: newBoardImage_url || "https://placehold.co/400x300/cccccc/333333?text=Board+Image", // Provide a default if optional
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
              onKeyPress={(e) => { // NEW: Handle Enter key for search
                if (e.key === 'Enter') {
                  onSearchSubmit();
                }
              }}
            />
            {/* NEW: onClick handler for Search button */}
            <button className="material-icons" onClick={onSearchSubmit}> Search </button>
            {/* NEW: onClick handler for Clear button */}
            <button className="material-icons" onClick={onClearSearch}> Clear </button>
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
          <button className="create-button" onClick={toggleCreateBoardModal}>
            Create New Board
          </button>
        </div>
      </div>

      {/* Create New Board Modal */}
      {showCreateBoardModal && (
        <div className="modal-overlay">
          <div className="create-board-modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">Create a New Board</h2>

            <form onSubmit={handleCreateBoardSubmit} className="create-board-form">
              <div className="form-group">
                <label htmlFor="newBoardTitle">Title:</label>
                <input
                  type="text"
                  id="newBoardTitle"
                  value={newBoardTitle}
                  onChange={(e) => setNewBoardTitle(e.target.value)}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="newBoardCategory">Category:</label>
                <select
                  id="newBoardCategory"
                  value={newBoardCategory}
                  onChange={(e) => setNewBoardCategory(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                  {/* Filter out "All" category if it's not a real category for new boards */}
                  {categories.filter(cat => cat !== "All ").map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
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

              {/* NEW: Input for Image URL */}
              <div className="form-group">
                <label htmlFor="newBoardImage_url">Image URL (optional):</label>
                <input
                  type="text"
                  id="newBoardImage_url"
                  value={newBoardImage_url}
                  onChange={(e) => setNewBoardImage_url(e.target.value)}
                  placeholder="e.g., https://example.com/board.jpg"
                />
              </div>

              <button type="submit" className="create-board-submit-btn">
                Create Board
              </button>
            </form>

            <button className="close-button" onClick={toggleCreateBoardModal}>
              &times;
            </button>
          </div>
        </div>
      )}
    </nav>
  );
}

export default SubNavbar;