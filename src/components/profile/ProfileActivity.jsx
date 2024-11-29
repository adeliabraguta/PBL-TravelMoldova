import React from "react";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import { useGetUserReviewsQuery } from "../../app/services/apiService.js";
import GetReview from "../../features/reviews/GetReview.jsx";
import Loading from "../UI/Loading.jsx";

function ProfileActivity() {
  const {
    data,
    isSuccess,
    isLoading,
    isFetching,
  } = useGetUserReviewsQuery();
  return (
    <div>
      <Banner>
        <Desc>Your Profile</Desc>
        <Title>Reviews you left</Title>
      </Banner>
        {(isFetching || isLoading) && <Loading />}
        {isSuccess && <GetReview reviews={data}/>}
    </div>
  );
}

export default ProfileActivity;
