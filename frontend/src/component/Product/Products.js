import React, { Fragment, useEffect, useState } from "react";
import "./Product.css";
import { useSelector, useDispatch } from "react-redux";
import { clearErrors, getProduct } from "../../actions/productAction";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import { useParams } from "react-router-dom";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";

const categories = [
    "Jacket",
    "Footwear",
    "SoftToys",
    "Lehengas",
    "Makeup",
    "HomeDecor",
    "SmartPhones",
];

const Products = () => {
  const { id } = useParams();  //This line is making use of the useParams hook provided by React Router. It extracts parameters from the current route's URL. In this case, it's extracting the id parameter from the URL.
  const dispatch = useDispatch();   //useDispatch returns a reference to the dispatch function. Dispatch is used to send actions to the Redux store. 
  const alert = useAlert();
  const [currentPage, setCurrentPage] = useState(1);  // It declares a state variable currentPage and a function setCurrentPage to update it.
  const [price,setPrice] = useState([0,25000]);
  const [category,setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const {   //useSelector is a hook provided by Redux-React that allows components to extract data from the Redux store. 
    products, 
    loading,  
    error, 
    productsCount, 
    resultPerPage,
    //filteredProductsCount,
 } =
    useSelector((state) => state.products);
  const keyword = id;

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  useEffect(() => {  //The useEffect hook takes a callback function as its first argument. This callback function contains the code that you want to run as a side effect. The second argument is an array of dependencies.
    if(error) {
        alert.error(error);
        dispatch(clearErrors());
    }
    dispatch(getProduct(keyword, currentPage,price,category,ratings));  //This line dispatches an action to fetch product data from the Redux store. 
  }, [dispatch, keyword, currentPage,price,category,ratings,alert,error]); //This array contains all the dependencies for this effect. The effect will be re-run whenever any of these dependencies change.

  //let count=filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
            <MetaData title="PRODUCTS -- ECOMMERCE" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {products &&
              products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
          </div>

          <div className="filterBox">
          {/* //React component from a UI library (possibly Material-UI) used to display text. */}
          <Typography>Price</Typography>  
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay="auto"   //Setting it to "auto" means the value label will be displayed based on available space and slider size.
              aria-labelledby="range-slider"  //his attribute associates the slider with an element that serves as its label. In this case, the slider is associated with an element with the ID "range-slider".
              min={0}
              max={25000}
            />

            <Typography>Categories</Typography>
            <ul className="categoryBox">
                {categories.map((category) => (
                    <li 
                    className="category-link" 
                    key={category} 
                    onClick={() => setCategory(category)}
                    >
                        {category}
                    </li>
                ))}
            </ul>

            <fieldset>
                <Typography component="legend">Ratings Above</Typography>
                <Slider
                    value={ratings}
                    onChange={(e,newRating) => {
                        setRatings(newRating);
                    }}
                    aria-labelledby="continuous-slider"
                    min={0}
                    max={5}
                    valueLabelDisplay="auto"
                />
            </fieldset>

          </div>

          {resultPerPage < productsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={productsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
