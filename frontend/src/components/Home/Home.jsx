import BoardGrid from "../BoardGrid/BoardGrid";
import "./Home.css"

function Home({isFetching, boards, searchInputValue, activeCategory } ){
    const boardsByCategory =
        Boolean(activeCategory) && activeCategory!== "All"
        ? boards.filter((b) => b.category ===activeCategory)
        :boards


const boardsToShow = Boolean(searchInputValue)
? boardsByCategory.filter((b) => b.title.toLowerCase().indexOf(searchInputValue.toLowerCase())!== -1)
: boardsByCategory


return (
    <div className="Home">
        <BoardGrid
    boards={boardsToShow}
    isFetching={isFetching}
    // Give space to add more functions
    />
    </div>
    
)
}

export default Home;