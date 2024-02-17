import { BsFillPersonFill } from "react-icons/bs";
import { FaBagShopping } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import logo from "../../../images/logo1.jpg";

const Header = () => {

  return (
    <header>
      <div className="logo_container">
        <Link to="/">
          <img
            className="myntra_home"
            src={logo}
            alt="Ecommerce"
          />
        </Link>
      </div>
      <nav className="nav_bar">
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
      </nav>
      
      <div className="action_bar">
        <Link className="action_container" to="/login">
        <BsFillPersonFill />
          <span className="action_name">Login</span>
        </Link>

        {/* <Link className="action_container" to="/search">
        <FaSearch />
          <span className="action_name">Search</span>
        </Link> */}

        <Link className="action_container" to="/cart">
          <FaBagShopping />
          <span className="action_name">Cart</span>
        </Link>
      </div>
    </header>
  );
};

export default Header;