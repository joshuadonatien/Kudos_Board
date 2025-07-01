import React, { useState } from "react"; // Import useState for modal state
import { useNavigate } from "react-router-dom";
// Removed: import "./BoardCard.css"; // Removed as requested, relying on semantic class names only.

function BoardCard({ board, onDelete }) {
  const navigate = useNavigate();
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteConfirmModal, setShowDeleteConfirmModal] = useState(false);

  const toggleViewModal = () => setShowViewModal(!showViewModal);
  const toggleDeleteConfirmModal = () => setShowDeleteConfirmModal(!showDeleteConfirmModal);

  const handleViewBoard = () => {
    navigate(`/boards/${board.id}`);
    // If you want the modal to open AND navigate, keep navigate.
    // If you only want the modal to show board details without navigating, remove this line.
  };
  const handleConfirmDelete = () => {
    onDelete(board.id);
    toggleDeleteConfirmModal(); // Close the confirmation modal
  };

  return (
    <div className="BoardCard">
      <div className="board-info">
        <div className="info">
          <p className="board-title">{board.title}</p>
          <p className="board-category">{board.category}</p>
          {board.image_url && (
            <img
              src={board.image_url}
              alt={board.title}
              className="board-image"
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/4B5563/D1D5DB?text=No+Image"; }}
            />
          )}
          {!board.image_url && (
            <div className="board-image-placeholder">
              No Image
            </div>
          )}
          <p className="board-author">By: {board.author}</p>
        </div>
      </div>
      <div className="actions">
        <div className="buttons">
          <button
            className="view-btn"
            onClick={handle} 
          >
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
      {showViewModal && (
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
            {/* Add more board details here if available in the 'board' prop */}
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
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirmModal && (
        <div className="modal-overlay">
          <div className="confirm-modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="confirm-modal-title">Confirm Deletion</h3>
            <p className="confirm-modal-message">Are you sure you want to delete the board "{board.title}"?</p>
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
            <button
              className="close-button"
              onClick={toggleDeleteConfirmModal}
            >
              &times;
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default BoardCard;