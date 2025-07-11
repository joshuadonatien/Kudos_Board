import { useNavigate } from "react-router-dom";
import React, { useState } from "react"; // Import useState for modal state
import "./BoardCard.css"; // Removed as requested, relying on semantic class names only.

function BoardCard({ board, onDelete }) {
  // const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);
  const navigate = useNavigate();
  //  const toggleViewModal = () => setShowViewModal(!showViewModal);
  const toggleDeleteConfirmModal = () =>
    setShowDeleteConfirmModal(!showDeleteConfirmModal);

  const handleViewBoard = () => {
    navigate(`/boards/${board.board_id}`);
  };
  const handleConfirmDelete = () => {
    onDelete(board.board_id);
    toggleDeleteConfirmModal(); // Close the confirmation modal
  };

  return (
    <div className="BoardCard">
      <div className="board-info">
        <div className="info">
          <p className="board-title">{board.title}</p>
          <p className={`board-category ${board.category}`}>{board.category}</p>
          {board.image_url && (
            <img
              src={`https://picsum.photos/200/300?random=${board.board_id}`}
              alt={board.title}
              className="board-image"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://placehold.co/300x200/4B5563/D1D5DB?text=No+Image+heRE";
              }}
            />
          )}
          {!board.image_url && (
            <div className="board-image-placeholder">No Image</div>
          )}
          <p className="board-author">By: {board.author || "Anonymous"}</p>
        </div>
      </div>
      <div className="actions">
        <div className="buttons">
          <button className="view-btn" onClick={handleViewBoard}>
            View Board
          </button>
          {/* Button to open the Delete Confirmation Modal */}
          <button
            className="delete-btn"
            onClick={toggleDeleteConfirmModal} // This now opens the delete confirmation modal
          >
            Delete Board
          </button>
        </div>
      </div>

      {/* View Board Modal */}
      {/* {showViewModal && (
        <div className="modal-overlay">
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 className="modal-title">{board.title}</h2>
            {board.image_url && (
              <img
                src={board.image_url}
                alt={board.title}
                className="modal-image"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/600x400/4B5563/D1D5DB?text=No+Image"; }}
              />
            )}
            <p className="modal-category"><strong>Category:</strong> {board.category}</p>
            <p className="modal-author"><strong>Author:</strong> {board.author}</p>
            <p className="modal-description">
              This is a detailed view of the board. You can add more information here
              like description, creation date, etc., if your `board` object contains them.
            </p>
            <button
              className="close-button"
              onClick={toggleViewModal}
            >
              &times;
            </button>
          </div>
        </div>
      )} */}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="modal-overlay">
          {/* <button
            className="close-button-delete-modal"
            onClick={toggleDeleteConfirmModal}
          >
            &times;
          </button> */}
          <div
            className="confirm-modal-content"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="confirm-modal-title">Confirm Deletion</h3>
            <p className="confirm-modal-message">
              Are you sure you want to delete the board{" "}
              <span className="board-title-text">"{board.title}"</span>?
            </p>
            <div className="confirm-buttons">
              <button
                className="confirm-cancel-btn"
                onClick={toggleDeleteConfirmModal}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-btn"
                onClick={handleConfirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardCard;
