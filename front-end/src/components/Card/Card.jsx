import React from "react";
import "./Card.css"; // The error "Could not resolve" indicates this file is not found or accessible.
// The component will now render without specific styling from Card.css.

function Card({ card, onDelete, onUpvote }) {
  return (
    <div className="Card">
      <div className="card-content">
        <h3 className="card-title">{card.title}</h3>
        <p className="card-description">{card.description}</p>

        {card.gif_url && ( // Display GIF/image if available
          <img
            src={card.gif_url}
            alt={card.title}
            className="card-image"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://placehold.co/300x200/4B5563/D1D5DB?text=No+Image";
            }}
          />
        )}
        {!card.gif_url && ( // Placeholder if no image
          <div className="card-image-placeholder">No Image/GIF</div>
        )}

        <p className="card-owner">Owner: {card.owner || "Anonymous"}</p>
      </div>

      <div className="card-actions">
        <button onClick={() => onUpvote(card.card_id)} className="upvote-btn">
         <img src="/assets/thumbs-up.gif" alt="" className="icon" />
          Upvote: {card.upvotes || 0}
        </button>
        <button onClick={() => onDelete(card.card_id)} className="delete-btn-card">
          <img src="/assets/delete.gif" alt="" className="icon" />


          Delete
        </button>
      </div>
    </div>
  );
}

export default Card;
