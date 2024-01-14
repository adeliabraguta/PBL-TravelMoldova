import React, {useEffect} from "react";
import { Banner, Desc, Title } from "../../Styles/Banner.js";
import Loading from "../UI/Loading.jsx";
import DestinationComponent from "../DestinationComponent.jsx";
import { List } from "../DestinationsPage.jsx";
import { useSelector } from "react-redux";
import { selectFavoriteDestinations} from "../UI/favSlice.js";

function ProfileFav(props) {
    const destinations = useSelector(selectFavoriteDestinations);

  return (
    <div>
      <Banner>
        <Desc>Your Profile</Desc>
        <Title>Favorite Destinations</Title>
        <List>
          {destinations?.map((destination) => (
            <DestinationComponent
              key={destination.slug}
              destination={destination}
            />
          ))}
        </List>
         <Banner>
             {destinations.length === 0 && <p>No destinations added to favorite yet.</p>}
         </Banner>

      </Banner>
    </div>
  );
}

export default ProfileFav;
