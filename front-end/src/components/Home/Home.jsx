import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubNavbar from '../../SearchBar/SubNavbar';
import BoardGrid from "../BoardGrid/BoardGrid";
import "./Home.css"

function Home() {
  const [boards, setBoards] = useState([]); // All boards fetched from API
  const [filteredBoards, setFilteredBoards] = useState([]); // Boards displayed after filter/search
  const [isFetchingBoards, setIsFetchingBoards] = useState(true);
  const [boardsError, setBoardsError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All "); // State for category filter
  const [searchInputValue, setSearchInputValue] = useState(""); // State for search bar input
  const [searchQuery, setSearchQuery] = useState(""); // State for actual search query (triggered by submit/enter)

  // Fetch all boards on component mount
  useEffect(() => {
    const fetchBoards = async () => {
      try {
        setIsFetchingBoards(true);
        // Replace with your actual backend API endpoint for fetching all boards
        const response = await axios.get("http://localhost:3001/boards");
        setBoards(response.data);
        setBoardsError(null);
      } catch (err) {
        console.error("Error fetching boards:", err);
        setBoardsError("Failed to load boards. Please try again.");
      } finally {
        setIsFetchingBoards(false);
      }
    };
    fetchBoards();
  }, []); // Empty dependency array means this runs once on mount

  // Effect to filter/search boards whenever categories, search query, or raw boards change
  useEffect(() => {
    let currentBoards = [...boards];

    // 1. Apply Category Filter
    if (activeCategory === "Recent") {
      // Sort by creation date (assuming a 'createdAt' or similar field)
      // For now, let's just take the last 6 for simplicity if no date field
      currentBoards = currentBoards.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0, 6);
    } else if (activeCategory !== "All ") {
      currentBoards = currentBoards.filter(board => board.category === activeCategory);
    }

    // 2. Apply Search Filter
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      currentBoards = currentBoards.filter(board =>
        board.title.toLowerCase().includes(lowerCaseQuery)
      );
    }

    setFilteredBoards(currentBoards);
  }, [boards, activeCategory, searchQuery]); // Re-run when these dependencies change

  // Handler for search input changes (updates the input field value)
  const handleOnSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  // Handler for triggering the actual search (when Search button clicked or Enter pressed)
  const handleSearchSubmit = () => {
    setSearchQuery(searchInputValue); // Update the actual search query
  };

  // Handler for clearing the search input and results
  const handleClearSearch = () => {
    setSearchInputValue(""); // Clear the input field
    setSearchQuery(""); // Clear the actual search query
  };

  // Handler for creating a new board (passed to SubNavbar)
  const handleCreateBoard = async (newBoardData) => {
    try {
      // Replace with your actual backend API endpoint for creating a board
      const response = await axios.post("http://localhost:3001/boards", newBoardData);
      setBoards([...boards, response.data]); // Add new board to the main boards list
      // The useEffect above will automatically re-filter/search
    } catch (err) {
      console.error("Error creating board:", err);
      alert("Failed to create board. Please try again.");
    }
  };

  // Handler for deleting a board (passed to BoardGrid -> BoardCard)
  const handleDeleteBoard = async (boardIdToDelete) => {
    try {
      // Replace with your actual backend API endpoint for deleting a board
      await axios.delete(`http://localhost:3001/boards/${boardIdToDelete}`);
      setBoards(boards.filter(board => board.id !== boardIdToDelete)); // Remove board from the main boards list
      // The useEffect above will automatically re-filter/search
    } catch (err) {
      console.error("Error deleting board:", err);
      alert("Failed to delete board. Please try again.");
    }
  };

  return (
    <div className="Home">
      {/* <Header /> */}
      <SubNavbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchInputValue={searchInputValue}
        handleOnSearchInputChange={handleOnSearchInputChange}
        onSearchSubmit={handleSearchSubmit}
        onClearSearch={handleClearSearch}
        onCreateBoard={handleCreateBoard} // Pass the create board handler
      />
      {isFetchingBoards ? (
        <div className="loading-message">Loading boards...</div>
      ) : boardsError ? (
        <div className="error-message">Error: {boardsError}</div>
      ) : (
        <BoardGrid boards={filteredBoards} onDelete={handleDeleteBoard} />
        /* Pass filtered boards and delete handler */
      )}
      {/* <Footer /> */}
    </div>
  );
}

export default Home;