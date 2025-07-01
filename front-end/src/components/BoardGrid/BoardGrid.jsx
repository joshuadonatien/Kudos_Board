import BoardCard from "../BoardCard/BoardCard";
import "./BoardGrid.css" 

function BoardGrid({ boards, isFetching}){// might have to add delete and view
    return (
        <div className="ProductGrid">
            <div className="content">
                <div className="grid"> 
                    {!products?.length ? (
                        <div className="card">
                            <p>No boards available</p>
                        </div>
                    ): boards.map((board) => (
                        <BoardCard
                        key={board.id}
                        board={board}
                        onDelete={onDelete}
                        // might have to add delete and view
                        />
                    ))}
                </div>
            </div>
        </div>
    )
} 

