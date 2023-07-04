import { NavLink } from "react-router-dom"

export default function Header() {
    return (
    <header>
        <img src="images/ash_tree.jpeg" alt=''/>
        <NavLink to={'/Home'}><h1>Garden Store</h1></NavLink>
        <img src="images/oak_tree.webp" alt=''/>
      </header>
    )
}