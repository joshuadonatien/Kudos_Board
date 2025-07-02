// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
import SubNavbar from "../../SearchBar/SubNavbar";
import BoardGrid from "../BoardGrid/BoardGrid";
import "./Home.css";

function Home({ boards, isFetching, error, onDelete }) {
  return (
    <div className="Home">
      {isFetching ? (
        <div className="loading-message">Loading boards...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <BoardGrid boards={boards} onDelete={onDelete} />
      )}
    </div>
  );
}

export default Home;
