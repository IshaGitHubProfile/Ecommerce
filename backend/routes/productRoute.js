const express = require("express");
const { getAllProducts,createProduct,updateProduct, deleteProduct, getProductDetails, getProductReviews, deleteReview, getAdminProducts } = require("../controllers/productController");
const { isAuthenticatedUser , authorizeRoles} = require("../middleware/auth");
const { createProductReview  } = require("../controllers/productController");

const router = express.Router();

//get all products
router.route("/products").get(getAllProducts);

//create a product
router
.route("/admin/product/new")
.post(isAuthenticatedUser,authorizeRoles("admin"),createProduct);

//router.route("/product/new").post(createProduct);

router
  .route("/admin/products")
  .get(isAuthenticatedUser, authorizeRoles("admin"), getAdminProducts);

//update and delete a product 
router.route("/admin/product/:id")
.put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct)
.delete(isAuthenticatedUser,authorizeRoles("admin"),deleteProduct)

router.route("/product/:id").get(getProductDetails);

router.route("/review").put(isAuthenticatedUser , createProductReview);

router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview);
module.exports = router;