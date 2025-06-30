import SubNavbar from "./components/SearchBar/SubNavbar";


function App() {
 

    return(
        <div class="App">
            <BrowserRouter>
            <main>
             <SubNavbar
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            searchInputValue={searchInputValue}
            handleOnSearchInputChange={handleOnSearchInputChange}
          />   
          <Routes>
            <Route>
                
            </Route>
          </Routes>
            </main>
            
            
            </BrowserRouter>
        </div>
    );
}

export default App;
