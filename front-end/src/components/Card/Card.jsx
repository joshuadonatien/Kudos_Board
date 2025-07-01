import React from 'react';
// Removed: import './Card.css'; // The error "Could not resolve" indicates this file is not found or accessible.
// The component will now render without specific styling from Card.css.

function Card({ card, onDelete, onUpvote }) {
  return (
    <div className="Card">
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-description">{card.description}</p>

        {card.image_url && ( // Display GIF/image if available
          <img
            src={card.image_url}
            alt={card.title}
            className="card-image"
            onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/300x200/4B5563/D1D5DB?text=No+Image"; }}
          />
        )}
        {!card.image_url && ( // Placeholder if no image
            <div className="card-image-placeholder">
              No Image/GIF
            </div>
          )}

        <p className="card-owner">Owner: {card.owner || 'Anonymous'}</p>
      </div>

      <div className="card-actions">
        <button
          onClick={() => onUpvote(card.id)}
          className="upvote-btn"
        >
          Upvote: {card.upvotes || 0}
        </button>
        <button
          onClick={() => onDelete(card.id)}
          className="delete-btn"
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;