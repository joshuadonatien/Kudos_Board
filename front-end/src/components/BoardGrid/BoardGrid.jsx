import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css";

function BoardGrid({ boards, isFetching, onDelete }) {
  // isFetching prop is not used here but kept for consistency
  return (
    <div className="BoardGrid">
      {" "}
      {/* Changed ProductGrid to BoardGrid for consistency */}
      <div className="content">
        <div className="grid">
          {!boards?.length ? ( // Check boards.length, not products
            <div className="no-boards-message">
              {" "}
              {/* Added class for styling */}
              <p>No boards available :(</p>
            </div>
          ) : (
            boards.map((board) => (
              <BoardCard
                key={board.id}
                board={board}
                onDelete={onDelete} // Pass onDelete prop
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default BoardGrid;
