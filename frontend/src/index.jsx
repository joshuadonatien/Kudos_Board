import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App";
import SubNavbar from "./components/SearchBar/SubNavbar"; 


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
        {/* <SubNavbar /> */}
    </React.StrictMode>
)