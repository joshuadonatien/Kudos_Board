import React, { useState } from "react";
// Removed: import './CreateCardModal.css'; // The error "Could not resolve" indicates this file is not found or accessible.
// The component will now render without specific styling from CreateCardModal.css.

// Assuming you might need an API key for GIF search, similar to TMDb
// const GIF_API_KEY = import.meta.env.VITE_GIPHY_API_KEY; // Example for Giphy

function CreateCardModal({ onClose, onCreateCard }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [gifSearchQuery, setGifSearchQuery] = useState("");
  const [gifUrl, setGifUrl] = useState(""); // Stores the selected GIF URL
  const [owner, setOwner] = useState("");
  const [gifSearchResults, setGifSearchResults] = useState([]); // To store GIF search results
  const [isSearchingGifs, setIsSearchingGifs] = useState(false);

  const VITE_GIPHY_KEY = import.meta.env.VITE_GIPHY_KEY;

  const handleGifSearch = async () => {
    if (!gifSearchQuery.trim()) return;
    setIsSearchingGifs(true);
    setGifSearchResults([]); // Clear previous results
    try {
      // Example using Giphy API: Replace YOUR_GIPHY_API_KEY with your actual key
      const gifRes = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${VITE_GIPHY_KEY}&q=${encodeURIComponent(
          gifSearchQuery
        )}&limit=5`
      );
      const gifData = await gifRes.json();
      setGifSearchResults(
        gifData.data.map((gif) => gif.images.fixed_height.url)
      ); // Use fixed_height for consistent size
    } catch (error) {
      console.error("Error searching GIFs:", error);
      alert("Failed to search GIFs. Please try again.");
    } finally {
      setIsSearchingGifs(false);
    }
  };

  const handleCopyGifUrl = (url) => {
    setGifUrl(url); // Set the input field with the selected GIF URL
    setGifSearchResults([]); // Clear search results after selection
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Card title is required!");
      return;
    }

    onCreateCard({
      title,
      description,
      gif_url: gifUrl,
      owner,
      upvotes: 0, // Initialize upvotes for new cards
    });
  };

  return (
    <div className="modal-overlay">
      <div
        className="create-card-modal-content"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="modal-title">Create a New Card</h2>

        <form onSubmit={handleSubmit} className="create-card-form">
          <div className="form-group">
            <label htmlFor="cardTitle">Enter card title</label>
            <input
              type="text"
              id="cardTitle"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter card title"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="cardDescription">Enter card description</label>
            <input
              type="text"
              id="cardDescription"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter card description"
            />
          </div>

          <div className="form-group">
            <label htmlFor="searchGifs">Search GIFs...</label>
            <div className="gif-search-input-group">
              <input
                type="text"
                id="searchGifs"
                value={gifSearchQuery}
                onChange={(e) => setGifSearchQuery(e.target.value)}
                placeholder="Search GIFs..."
              />
              <button
                type="button"
                onClick={handleGifSearch}
                className="gif-search-btn"
                disabled={isSearchingGifs}
              >
                {isSearchingGifs ? "Searching..." : "Search"}
              </button>
            </div>
            {/* Display GIF search results */}
            {gifSearchResults.length > 0 && (
              <div className="gif-results-container">
                {gifSearchResults.map((gif, index) => (
                  <img
                    key={index}
                    src={gif}
                    alt="GIF result"
                    className="gif-result-image"
                    onClick={() => handleCopyGifUrl(gif)}
                  />
                ))}
              </div>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="gifUrl">Enter GIF URL</label>
            <div className="gif-url-input-group">
              <input
                type="text"
                id="gifUrl"
                value={gifUrl}
                onChange={(e) => setGifUrl(e.target.value)}
                placeholder="GIF URL (or select from search results)"
                readOnly // Make it read-only as it's primarily for copy-pasting or selection
              />
              <button
                type="button"
                onClick={() => navigator.clipboard.writeText(gifUrl)} // Copy to clipboard
                className="copy-gif-url-btn"
                disabled={!gifUrl}
              >
                Copy GIF URL
              </button>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="cardOwner">Enter owner (optional)</label>
            <input
              type="text"
              id="cardOwner"
              value={owner}
              onChange={(e) => setOwner(e.target.value)}
              placeholder="Enter owner (optional)"
            />
          </div>

          <button type="submit" className="create-card-submit-btn">
            Create Card
          </button>
        </form>

        {/* Close button for the modal */}
        <button className="close-button" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}

export default CreateCardModal;
