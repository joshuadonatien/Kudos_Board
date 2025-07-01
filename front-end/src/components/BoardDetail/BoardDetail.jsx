import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Card from '../Card/Card.jsx';
import CreateCardModal from '../CreateCardModal/CreateCardModal.jsx'; 
// import './BoardDetail.css'; // You might want to create a BoardDetail.css if needed

function BoardDetail() {
  const { boardId } = useParams();
  const navigate = useNavigate();
  const [board, setBoard] = useState(null);
  const [cards, setCards] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const [error, setError] = useState(null);
  const [showCreateCardModal, setShowCreateCardModal] = useState(false);

  useEffect(() => {
    const fetchBoardAndCards = async () => {
      try {
        setIsFetching(true);
        const boardRes = await axios.get(`http://localhost:3001/boards/${boardId}`);
        setBoard(boardRes.data);

        const cardsRes = await axios.get(`http://localhost:3001/boards/${boardId}/cards`);
        setCards(cardsRes.data);

        setError(null);
      } catch (err) {
        console.error("Error fetching board or cards:", err);
        setError("Failed to load board details. Please try again.");
      } finally {
        setIsFetching(false);
      }
    };

    fetchBoardAndCards();
  }, [boardId]);

  const toggleCreateCardModal = () => {
    setShowCreateCardModal(!showCreateCardModal);
  };

  const handleCreateCard = async (newCardData) => {
    try {
      const response = await axios.post(`http://localhost:3001/boards/${boardId}/cards`, newCardData);
      setCards([...cards, response.data]);
      toggleCreateCardModal();
    } catch (err) {
      console.error("Error creating card:", err);
      alert("Failed to create card. Please try again.");
    }
  };

  const handleDeleteCard = async (cardIdToDelete) => {
    try {
      await axios.delete(`http://localhost:3001/cards/${cardIdToDelete}`);
      setCards(cards.filter(card => card.id !== cardIdToDelete));
    } catch (err) {
      console.error("Error deleting card:", err);
      alert("Failed to delete card. Please try again.");
    }
  };

  const handleUpvoteCard = async (cardIdToUpvote) => {
    try {
      const response = await axios.patch(`http://localhost:3001/cards/${cardIdToUpvote}/upvote`);
      setCards(cards.map(card =>
        card.id === cardIdToUpvote ? { ...card, upvotes: response.data.upvotes } : card
      ));
    } catch (err) {
      console.error("Error upvoting card:", err);
      alert("Failed to upvote card. Please try again.");
    }
  };

  if (isFetching) {
    return <div className="board-detail-loading">Loading board...</div>;
  }

  if (error) {
    return <div className="board-detail-error">Error: {error}</div>;
  }

  if (!board) {
    return <div className="board-detail-not-found">Board not found.</div>;
  }

  return (
    <div className="BoardDetail">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="back-button"
      >
        &larr; Back to Boards
      </button>

      {/* Board Header */}
      <div className="board-header">
        <h1 className="board-title">{board.title}</h1>
        <p className="board-category">{board.category}</p>
        <p className="board-author">By: {board.author}</p>
      </div>

      {/* Create a Card Button */}
      <div className="create-card-section">
        <button
          onClick={toggleCreateCardModal}
          className="create-card-button"
        >
          Create a Card
        </button>
      </div>

      {/* Cards List */}
      <div className="cards-list">
        {cards.length > 0 ? (
          cards.map(card => (
            <Card
              key={card.id}
              card={card}
              onDelete={handleDeleteCard}
              onUpvote={handleUpvoteCard}
            />
          ))
        ) : (
          <p className="no-cards-message">No cards yet. Click "Create a Card" to add one!</p>
        )}
      </div>

      {/* Create Card Modal */}
      {showCreateCardModal && (
        <CreateCardModal
          onClose={toggleCreateCardModal}
          onCreateCard={handleCreateCard}
          boardCategories={board.category ? [board.category] : []}
        />
      )}
    </div>
  );
}

export default BoardDetail;