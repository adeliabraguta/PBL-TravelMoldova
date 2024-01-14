import React from "react";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import DestinationComponent from "../DestinationComponent.jsx";
import { List } from "../DestinationsPage.jsx";
import { useGetUserReviewsQuery } from "../../app/services/apiService.js";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "../../features/authentification/authSlice.js";
import ReviewComponent from "../../features/reviews/reviewComponent.jsx";
import GetReview from "../../features/reviews/GetReview.jsx";
import Loading from "../UI/Loading.jsx";

function ProfileActivity() {
  const username = useSelector(selectCurrentUser);
  const {
    data: comments = [],
    isSuccess,
    isLoading,
    isFetching,
  } = useGetUserReviewsQuery(username);
  return (
    <div>
      <Banner>
        <Desc>Your Profile</Desc>
        <Title>Your Activity</Title>
      </Banner>
        {(isFetching || isLoading) && <Loading />}
        {isSuccess && <GetReview comments={comments} />}
        {comments.length === 0 && <Banner>No reviews yet</Banner>}
    </div>
  );
}

export default ProfileActivity;
