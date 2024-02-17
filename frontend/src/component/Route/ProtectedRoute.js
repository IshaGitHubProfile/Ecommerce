import React, { Fragment } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Route } from "react-router-dom";

const ProtectedRoute = ({ isAdmin, component: Component, ...rest }) => {
  const { loading, isAuthenticated, user } = useSelector((state) => state.user);
  const navigate = useNavigate();

  return (
    <Fragment>
      {loading === false && (
        <Route  //This renders a Route component from React Router, passing down any additional props (rest) provided to ProtectedRoute.
          {...rest}
          render={(props) => {    //This attribute defines a function that receives props and returns JSX to render the component for this route.
            if (isAuthenticated === false) {
              return navigate("/login")
            }

            return <Component {...props} />;   //If the user is authenticated, it renders the Component provided as a prop to ProtectedRoute, passing down any received props.
          }}
        />
      )}
    </Fragment>
  );
};

export default ProtectedRoute;


