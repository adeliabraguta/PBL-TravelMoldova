import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import {selectIsFilterPopupVisible, setFilter, setFilterPopup, setSearch} from "./searchSlice.js";
import { StyledRating } from "../../components/DestinationPageAccount.jsx";
import {useNavigate} from "react-router-dom";

const FilterPopup = () => {
  const isPopupVisible = useSelector(selectIsFilterPopupVisible);
  const dispatch = useDispatch();
  const navigate = useNavigate()

  const [rating, setRating] = useState("");
  const [type, setType] = useState([]);
  const types = [
    "Monastery",
    "Church",
    "Fortress",
    "Park",
    "Reservation",
    "Winery",
    "Zoo",
    "Other",
  ];
  const handleRatingChange = (e, newValue) => {
    setRating((prevRating) => (newValue === prevRating ? 0 : newValue));
  };

  const handleTypeChange = (e) => {
    const selectedType = e.target.value;
    setType((prevType) => (prevType.includes(selectedType) ? type.filter((type) => type !== selectedType) : [...prevType, selectedType]));
  };

  const handleSearch = () => {
    dispatch(setFilter({rating, type}));
    setType("");
    setRating('')
    dispatch(setFilterPopup(false));
    navigate("/posts");
  }

  return (
    <FilterContainer $isVisible={isPopupVisible}>
      <div className={"searchDestination"}>
        <h3>Advanced search</h3>
        <p>Types</p>
        <div className={"type_options"}>
          {types.map((item, index) => (
            <div key={index}>
              <input
                name="type"
                id={item}
                value={item}
                type={"checkbox"}
                checked={type.includes(item)}
                onChange={() => {}}
                onClick={handleTypeChange}
              />
              <label htmlFor={item}>{item}</label>
            </div>
          ))}
        </div>
        <p>Rating</p>
        <StyledRating
          name="rating"
          value={parseInt(rating)}
          onChange={handleRatingChange}
        />
      </div>
      <button onClick={handleSearch}>See results</button>
    </FilterContainer>
  );
};

export default FilterPopup;

const FilterContainer = styled.div`
  position: absolute;
  visibility: ${({ $isVisible }) => ($isVisible ? "visible" : "hidden")};
  z-index: 2;
  box-sizing: border-box;
  padding: 24px;
  box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
  border: 2px solid var(--color-grey-7);
  opacity: ${({ $isVisible }) => ($isVisible ? "1" : "0")};
  transition:
    visibility 0.3s ease-in-out,
    opacity 0.3s ease-in-out,
    transform 0.3s ease-in-out;
  background-color: white;
  top: 70px;
  transform: ${({ $isVisible }) =>
    $isVisible ? "translateY(20px)" : "translate(0px)"};
  width: 300px;
  //height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;

    h3 {
      margin: 0;
      color: var(--color-green-0);
    }

    p {
      font-size: 18px;
      letter-spacing: 1px;
      color: var(--color-blue-0);
      font-weight: 600;
      padding: 0 12px 8px 12px;
      border-bottom: 2px solid var(--color-grey-8);
    }

    .type_options {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;

      div {
        padding: 4px 8px;
        border: 2px solid var(--color-blue-6);
        display: flex;
        border-radius: 18px;
        cursor: pointer;
        transition: 0.3s all;
        color: var(--color-grey-1);

        &:hover {
          color: white;
          background-color: var(--color-blue-5);
          border: 2px solid var(--color-blue-5);
        }

        input[type="checkbox"] {
          margin: 0;
          appearance: none;
          display: flex;
          justify-content: center;
        }

        label {
          cursor: pointer;
        }
      }

      div:has(input[type="checkbox"]:checked) {
        background-color: var(--color-blue-6);
        color: white;

        &:hover {
          color: white;
          background-color: var(--color-blue-4);
          border: 2px solid var(--color-blue-4);
        }
    }
  }

  button {
    cursor: pointer;
    font-size: 16px;
    padding: 4px 8px;
    color: var(--color-green-1);
    border: 2px solid var(--color-green-3);
    background-color: white;
    border-radius: 8px;
    margin-top: 24px;
    transition: 0.3s ease;

    &:hover {
      color: white;
      background-color: var(--color-green-3);
    }
  }
`;
