import SubNavbar from "./components/SearchBar/SubNavbar";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import BoardCard from "./components/BoardCard/BoardCard";

function App() {
  return (
    <div className="App">
      {/* <BrowserRouter> */}
      <main>
        <SubNavbar
        // activeCategory={activeCategory}
        // setActiveCategory={setActiveCategory}
        // searchInputValue={searchInputValue}
        // handleOnSearchInputChange={handleOnSearchInputChange}
        />
        <BoardCard
          board={{
            title: "Title 1",
            category: "Celebration",
            image_url: "/assets/SampleImg.png",
            author: "Camila",
          }}
        />
        {/* <Routes>
            <Route>
                
            </Route>
          </Routes> */}
      </main>

      {/* </BrowserRouter> */}
    </div>
  );
}

export default App;
