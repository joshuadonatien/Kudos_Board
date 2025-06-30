import "./BoardCard.css"

function BoardCard ({board}){
    return(
        <div className="BoardCard">
            <div className="board-info">
                <div className="info">
                    <p className="board-title">{board.title}</p>
                    <p className="board-category">{board.category}</p>
                    <img className="board-img" src={board.image_url} alt="Board" />
                    <p className="board-author">{board.author}</p>
                </div>
            </div>
            <div className="actions">
                <div className="buttons">
                    <button className="view-btn">View Board</button>
                    <button className="delete-btn">Delete Board</button>
                </div>
            </div>
        </div>
    )
}

export default BoardCard;