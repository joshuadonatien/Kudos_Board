import SubNavbar from "./SearchBar/SubNavbar";
import { BrowserRouter } from "react-router-dom";

function App() {
 

    return(
        <div className="App">
            {/* <BrowserRouter> */}
            <main>
             <SubNavbar
            // activeCategory={activeCategory}
            // setActiveCategory={setActiveCategory}
            // searchInputValue={searchInputValue}
            // handleOnSearchInputChange={handleOnSearchInputChange} 
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
