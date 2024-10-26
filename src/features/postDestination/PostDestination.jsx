import { Banner, Desc, Title } from "../../Styles/Banner.js";
import React, { useEffect } from "react";
import { usePostDestinationMutation } from "../../app/services/apiService.js";
import styled from "styled-components";
import { SiGooglemaps } from "react-icons/si";
import { useFormik } from "formik";
import { postDestinationSchema } from "./schemas/postDestinationSchema.js";
import Loading from "../../components/UI/Loading.jsx";
import { toast } from "react-toastify";

export default function PostDestination() {
  const [postDestination, { isSuccess, isLoading }] =
    usePostDestinationMutation();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Destination Added Successful");
    } else {
      toast.error("Failed adding a destination");
    }
  }, [isSuccess]);

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("map", values.map);
    values.images.forEach((image) => formData.append("images", image));
    postDestination(formData);
  };

  const { values, setFieldValue, handleChange, touched, errors, handleSubmit } =
    useFormik({
      initialValues: {
        name: "",
        description: "",
        location: "",
        map: "",
        images: [],
      },
      validationSchema: postDestinationSchema,
      onSubmit,
    });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFieldValue("images", files);
  };

  if (isLoading) {
    return (
      <Banner>
        <Desc>Your Profile</Desc>
        <Title>Upload a Destination</Title>
        <Loading />
      </Banner>
    );
  }

  return (
    <div>
      <Banner>
        <Desc>Your Profile</Desc>
        <Title>Upload a Destination</Title>
      </Banner>
      <Destination>
        <form
          onSubmit={handleSubmit}
          className={"post-destination"}
          autoComplete={"off"}
        >
          <div className={"input-container"}>
            <Label $isError={errors.name && touched.name}>
              {errors.name && touched.name && <span>{errors.name}</span>}
              Name
            </Label>
            <Input
              name="name"
              className={"input"}
              value={values.name}
              type={"text"}
              onChange={handleChange}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"input-container"}>
            <Label $isError={errors.description && touched.description}>
              {errors.description && touched.description && (
                <span>{errors.description}</span>
              )}
              Description
            </Label>
            <TextArea
              name="description"
              rows="5"
              value={values.description}
              onChange={handleChange}
              className={"text-area"}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"input-container"}>
            <Label $isError={errors.location && touched.location}>
              {errors.location && touched.location && (
                <span>{errors.location}</span>
              )}
              Location
            </Label>
            <Input
              name="location"
              className={"input"}
              value={values.location}
              type={"text"}
              onChange={handleChange}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"input-container"}>
            <Label $isError={errors.map && touched.map}>
              {errors.map && touched.map && <span>{errors.map}</span>}
              Google Maps Link <SiGooglemaps />
            </Label>
            <Input
              name="map"
              className={"input"}
              value={values.map}
              type={"text"}
              onChange={handleChange}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"input-container"}>
            <Label $isError={errors.images && touched.images}>
              {errors.images && touched.images && <span>{errors.images}</span>}
              Images
            </Label>
            <Input
              className={"input"}
              type={"file"}
              name="images"
              multiple="multiple"
              accept={"image/*"}
              onChange={(event) => handleImageChange(event)}
              placeholder={"Write here..."}
            />
          </div>
          <div className={"images_container"}>
            {values.images &&
              values.images.map((image, index) => (
                <img
                  key={index}
                  className={"image"}
                  src={URL.createObjectURL(image)}
                  alt={index}
                />
              ))}
          </div>
          <button type="submit" className={"btn"}>
            Upload
          </button>
        </form>
      </Destination>
    </div>
  );
}
const Destination = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .message {
    color: var(--color-green-2);
    margin: 0;
  }

  .post-destination {
    border: 2px solid var(--color-grey-8);
    padding: 48px;
    display: flex;
    flex-direction: column;
    justify-content: center;
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

    &:hover {
      color: white;
      background-color: var(--color-green-4);
      border: 2px solid var(--color-green-4);
    }
  }

  .input-container {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  .images_container {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
  }

  .image {
    height: 150px;
    width: 150px;
    object-fit: cover;
  }
`;

const Label = styled.label`
  font-size: 18px;
  letter-spacing: 1px;
  color: var(--color-blue-0);
  font-weight: 600;
  display: flex;
  gap: 4px;
  align-content: center;

  span {
    position: relative;
    top: -6px;
    font-weight: 400;
    font-size: 24px;
    color: #ff0044;
  }
`;

const Input = styled.input`
  font-family: monospace;
  border: none;
  overflow: auto;
  outline: none;
  padding: 12px 20px;
  box-sizing: border-box;
  border-bottom: 2px solid var(--color-grey-8);
  font-size: 16px;

  &:focus {
    border-bottom: 2px solid var(--color-grey-5);
  }

  &::file-selector-button {
    color: var(--color-grey-0);
    background-color: transparent;
    padding: 0.5em;
    border: 2px solid var(--color-grey-8);
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
      border: 2px solid var(--color-grey-5);
    }
  }
`;

const TextArea = styled.textarea`
  border: none;
  overflow: auto;
  outline: none;
  padding: 12px 20px;
  box-sizing: border-box;
  border-bottom: 2px solid var(--color-grey-8);
  font-size: 16px;
  resize: none;
  width: 60vw;

  &:focus {
    border-bottom: 2px solid var(--color-grey-5);
  }
`;
