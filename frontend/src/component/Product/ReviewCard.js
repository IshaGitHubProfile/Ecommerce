import { Rating } from "@material-ui/lab";
import React from "react";
import profilePng from "../../images/Profile.png";

const ReviewCard = ({ review }) => {  //This declares a functional component named ReviewCard, which takes a single prop named review. This prop is expected to contain an object representing the details of a review.
  const options = {
    value: review.rating,
    readOnly: true,
    precision: 0.5,  //precision to 0.5, indicating that half-star ratings are allowed.
  };

  return (
    <div className="reviewCard">
      <img src={profilePng} alt="User" />
      <p>{review.name}</p>
      <Rating {...options} />
      <span className="reviewCardComment">{review.comment}</span>
    </div>
  );
};

export default ReviewCard;