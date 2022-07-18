import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";


const Root = () => (

    <BrowserRouter>

        <Routes>
            <Route path="/" element={<App></App>}></Route>
        </Routes>
    
    </BrowserRouter>
)

export default Root;