import React from "react";
import ReactDOM from 'react-dom/client'
import App from "./App";
import SubNavbar from "./SearchBar/SubNavbar"; 


ReactDOM.createRoot(document.getElementById('root')).render(
    <React.StrictMode>
        <App/>
        {/* <SubNavbar /> */}
    </React.StrictMode>
)