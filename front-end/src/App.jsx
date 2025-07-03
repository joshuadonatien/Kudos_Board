import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import BoardCard from "./components/BoardCard/BoardCard";
import SubNavbar from "./SearchBar/SubNavbar";
import Home from "./components/Home/Home";
import BoardDetail from "./components/BoardDetail/BoardDetail";
import Footer from "./components/Footer/Footer";
import "./App.css";

// HomePage moved outside App to avoid re-renders breaking input focus
function HomePage({
  activeCategory,
  setActiveCategory,
  searchInputValue,
  handleOnSearchInputChange,
  onSearchSubmit,
  onClearSearch,
  onCreateBoard,
  filteredBoards,
  isFetchingBoards,
  boardsError,
  handleDeleteBoard,
}) {
  return (
    <>
      <SubNavbar
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
        searchInputValue={searchInputValue}
        handleOnSearchInputChange={handleOnSearchInputChange}
        onSearchSubmit={onSearchSubmit}
        onClearSearch={onClearSearch}
        onCreateBoard={onCreateBoard}
      />
      <Home
        boards={filteredBoards}
        isFetching={isFetchingBoards}
        error={boardsError}
        onDelete={handleDeleteBoard}
      />
    </>
  );
}

function App() {
  const [boards, setBoards] = useState([]);
  const [filteredBoards, setFilteredBoards] = useState([]);
  const [isFetchingBoards, setIsFetchingBoards] = useState(true);
  const [boardsError, setBoardsError] = useState(null);

  const [activeCategory, setActiveCategory] = useState("All ");
  const [searchInputValue, setSearchInputValue] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch boards on mount
  useEffect(() => {
    console.log("GRABBING THE BOARDS");
    console.log(boards.data);
    const fetchBoards = async () => {
      try {
        setIsFetchingBoards(true);
        const response = await axios.get("http://localhost:3000/boards");
        console.log(response.data);
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
  }, []);

  // Filter boards when any inputs change
  useEffect(() => {
    let currentBoards = [...boards];

    if (activeCategory === "Recent") {
      currentBoards = currentBoards
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 6);
    } else if (activeCategory !== "All ") {
      currentBoards = currentBoards.filter(
        (board) => board.category === activeCategory
      );
    }

    // Search matches either the live input or the submitted query
    if (searchInputValue.trim()) {
      const q = searchInputValue.toLowerCase();
      currentBoards = currentBoards.filter((board) =>
        board.title.toLowerCase().includes(q)
      );
    }

    setFilteredBoards(currentBoards);
  }, [boards, activeCategory, searchInputValue, searchQuery]);

  // Handlers
  const handleOnSearchInputChange = (e) => {
    setSearchInputValue(e.target.value);
  };

  const handleSearchSubmit = () => {
    setSearchQuery(searchInputValue); // triggers search by updating searchQuery
  };

  const handleClearSearch = () => {
    setSearchInputValue("");
    setSearchQuery("");
  };

  const handleCreateBoard = async (newBoardData) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/boards",
        newBoardData
      );
      setBoards([...boards, response.data]);
    } catch (err) {
      console.error("Error creating board:", err);
      alert("Failed to create board. Please try again.");
    }
  };

  const handleDeleteBoard = async (boardIdToDelete) => {
    console.log("board id: ", boardIdToDelete);
    try {
      await axios.delete(`http://localhost:3000/boards/${boardIdToDelete}`);
      setBoards(boards.filter((board) => board.board_id !== boardIdToDelete));
    } catch (err) {
      console.error("Error deleting board:", err);
      alert("Failed to delete board. Please try again.");
    }
  };

  return (
    <div className="App">
      <BrowserRouter>
        <main>
          <Routes>
            <Route
              path="/"
              element={
                <HomePage
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  searchInputValue={searchInputValue}
                  handleOnSearchInputChange={handleOnSearchInputChange}
                  onSearchSubmit={handleSearchSubmit}
                  onClearSearch={handleClearSearch}
                  onCreateBoard={handleCreateBoard}
                  filteredBoards={filteredBoards}
                  isFetchingBoards={isFetchingBoards}
                  boardsError={boardsError}
                  handleDeleteBoard={handleDeleteBoard}
                />
              }
            />
            <Route path="/boards/:boardId" element={<BoardDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
