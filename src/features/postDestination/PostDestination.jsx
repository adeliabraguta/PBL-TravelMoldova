import { Banner, Desc, Home, Title, Line } from "../../Styles/Banner.js";
import { StyledRating } from "../../components/DestinationPageAccount.jsx";
import React, { useCallback, useEffect, useState } from "react";
import {
  usePostDestinationImgMutation,
  usePostDestinationMutation,
} from "../../app/services/apiService.js";
import { useDispatch } from "react-redux";
import { setDestination } from "./destinationSlice.js";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Loading from "../../components/UI/Loading.jsx";

export default function PostDestination() {
  const dispatch = useDispatch();
  const [
    postDestination,
    { isSuccess: isSuccess, error, isError, data, isLoading: isLoading },
  ] = usePostDestinationMutation();
  const [
    postDestinationImg,
    { isSuccess: isSuccessImg, isLoading: isLoadingImg },
  ] = usePostDestinationImgMutation();
  const [address, setAddress] = useState("");
  const [long_desc, setLong_desc] = useState("");
  const [img, setImg] = useState(null);
  const [slug, setSlug] = useState("");
  const short_desc = " ";
  const [title, setTitle] = useState("");
  const enabled =
    title.length > 0 && long_desc.length > 0 && address.length > 0;
  const [message, setMessage] = useState("");
  let [imgNr, setImgNr] = useState(0);
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setDestination({
          ...data,
          address,
          long_desc: long_desc,
          short_desc: short_desc,
          title,
        }),
      );
      setSlug(data.slug);
      setMessage("Post Added Successful");
    }
  });

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      postDestination({
        address,
        long_desc: long_desc,
        short_desc: short_desc,
        title,
      });
    },
    [address, long_desc, short_desc, title],
  );

  const handleSubmitImg = useCallback(
    (e) => {
      e.preventDefault();
      const formData = new FormData();
      formData.append("file", img);
      console.log(formData);
      postDestinationImg({ information: formData, slug });
      setImg("");
    },
    [img],
  );
  // if (isSuccessImg) {
  //     setImgNr(img => img+1)
  // }
  // const handleFinish = useCallback((e)=>{
  //     e.preventDefault()
  //     setSlug('');
  //     setTitle('')
  //     setAddress('')
  //     setLong_desc('')
  //     setImg('')
  // })
  if (isLoading || isLoadingImg) {
    return (
      <Home>
        <Line>
          <Banner>
            <Desc>TRAVEL MOLDOVA</Desc>
            <Title>Upload a Destination</Title>
            <Loading />
          </Banner>
        </Line>
      </Home>
    );
  }
  return (
    <Home>
      <Line>
        <Banner>
          <Desc>TRAVEL MOLDOVA</Desc>
          <Title>Upload a Destination</Title>
        </Banner>
      </Line>
      <Destination>
        <p className={"message"}>{message}</p>
        <form className={"post-destination"} onSubmit={handleSubmit}>
          <div className={"input-container"}>
            <label className={"review-title"}>Destination's Name</label>
            <input
              className={"input"}
              value={title}
              type={"text"}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"input-container"}>
            <label className={"review-title"}>Destination's Description</label>
            <textarea
              rows="5"
              value={long_desc}
              onChange={(e) => setLong_desc(e.target.value)}
              className={"text-area"}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"input-container"}>
            <label className={"review-title"}>Destination's Address</label>
            <input
              className={"input"}
              value={address}
              type={"text"}
              onChange={(e) => setAddress(e.target.value)}
              placeholder={"Write here..."}
            />
          </div>
          <button className={"btn"} disabled={!enabled}>
            Next Step
          </button>
        </form>
        <div className={`${isSuccess ? "" : "disabled"}`}>
          <form
            className={`post-destination--image`}
            onSubmit={handleSubmitImg}
          >
            <div className={"input-container"}>
              <label className={"review-title"}>Upload Images</label>
              <input
                className={"input"}
                type={"file"}
                onChange={(e) => setImg(e.target.files[0])}
                placeholder={"Write here..."}
              />
            </div>
            <button className={"btn"}>Upload</button>
            <p className={"imgNr"}>
              <strong>{imgNr}</strong> images uploaded
            </p>
          </form>
        </div>
        {/*<div className={'finish'}>*/}
        {/*    <button className={'btn'}>Finish</button>*/}
        {/*</div>*/}
      </Destination>
    </Home>
  );
}
const Destination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-bottom: 96px;

  .message {
    color: var(--color-green-2);
    margin: 0;
  }

  .post-destination {
    margin-top: 24px;
    border: 2px solid var(--color-grey-8);
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 24px;
    width: 60vw;
  }

  .btn {
    background-color: white;
    border: 2px solid var(--color-green-2);
    padding: 12px;
    color: var(--color-green-2);
    font-size: 20px;
    letter-spacing: 1.1px;
    cursor: pointer;
    transition: 0.3s ease;

    &:disabled {
      color: var(--color-grey-4);
      cursor: not-allowed;
      border: 2px solid var(--color-grey-4);

      &:hover {
        color: var(--color-grey-4);
        cursor: not-allowed;
        border: 2px solid var(--color-grey-4);
      }
    }

    &:hover {
      color: var(--color-green-4);
      border: 2px solid var(--color-green-4);
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .text-area {
    border: none;
    overflow: auto;
    outline: none;
    padding: 12px 20px;
    box-sizing: border-box;
    border-bottom: 2px solid var(--color-grey-7);
    font-size: 16px;
    resize: none;
    width: 60vw;

    &:focus {
      border-bottom: 2px solid var(--color-green-5);
    }

    &:disabled {
      background-color: white;
    }
  }

  .review-title {
    font-size: 18px;
    letter-spacing: 1px;
    color: var(--color-blue-0);
    font-weight: 600;
  }

  .input {
    font-family: monospace;
    border: none;
    overflow: auto;
    outline: none;
    padding: 12px 20px;
    box-sizing: border-box;
    border-bottom: 2px solid var(--color-grey-7);
    font-size: 16px;

    &:focus {
      border-bottom: 2px solid var(--color-green-5);
    }

    &:disabled {
      background-color: white;
    }
  }

  .post-destination--image {
    margin-top: 24px;
    border: 2px solid var(--color-grey-8);
    padding: 48px;
    display: grid;
    grid-template-columns: 5fr 1fr;
    align-items: end;
    gap: 24px;
    width: 60vw;

    .imgNr {
      margin: 0;
      padding-bottom: 12px;
    }

    .btn {
      padding: 8px;
      font-size: 16px;
    }
  }

  .disabled {
    opacity: 0.5;
    cursor: not-allowed;

    .btn {
      color: var(--color-grey-4);
      cursor: not-allowed;
      border: 2px solid var(--color-grey-4);

      &:hover {
        color: var(--color-grey-4);
        cursor: not-allowed;
        border: 2px solid var(--color-grey-4);
      }
    }

    .input {
      cursor: not-allowed;
    }
  }

  .finish {
    padding-top: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 65%;

    .btn {
      width: 100%;
      background-color: var(--color-green-2);
      border: none;
      padding: 12px;
      color: white;
      font-size: 20px;
      letter-spacing: 1.1px;
      cursor: pointer;
      transition: 0.3s ease;

      &:disabled {
        background-color: var(--color-grey-4);
        cursor: not-allowed;

        &:hover {
          background-color: var(--color-grey-4);
        }
      }

      &:hover {
        background-color: var(--color-green-4);
      }
    }
  }
`;