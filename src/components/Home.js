import React from "react"
import Header from "../util/header"
import NavBar from "./navigation/NavBar"
import Products from "./products/Products"

export default function Home() {
    return (
        <>
        <div className="container">
            <Header />
            <nav>
              <NavBar/>
            </nav>
            <Products />
          </div>
        </>
    )
}