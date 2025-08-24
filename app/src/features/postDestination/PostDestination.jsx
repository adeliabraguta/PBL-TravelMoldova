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
  const [postDestination, { isSuccess, isLoading, isError, data, error }] =
    usePostDestinationMutation();

  const onSubmit = () => {
    const formData = new FormData();
    formData.append("name", values.name);
    formData.append("description", values.description);
    formData.append("location", values.location);
    formData.append("map", values.map);
    formData.append("type", values.type);
    values.images.forEach((image) => formData.append("images", image));
    postDestination(formData);
  };

  const {
    values,
    resetForm,
    setFieldValue,
    handleChange,
    touched,
    errors,
    handleSubmit,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      location: "",
      map: "",
      images: [],
      type: ""
    },
    validationSchema: postDestinationSchema,
    onSubmit,
  });

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFieldValue("images", files);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
      resetForm();
    } else if (isError) {
      toast.error(error.data.message);
    }
  }, [isSuccess, isError, data, error]);

  if (isLoading) {
    return (
      <Banner>
        <Desc>Your Profile</Desc>
        <Title>Upload a Destination</Title>
        <Loading />
      </Banner>
    );
  }
  console.log(values.type)
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
            <Label>
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
            <Label>
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
            <Label>
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
            <Label>
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
            <Label>
              {errors.type && touched.type && <span>{errors.type}</span>}
              Type
            </Label>
            <Select name={"type"} value={values.type} onChange={handleChange}>
              <option disabled value="">--Please choose an option--</option>
              <option value="Monastery">Monastery</option>
              <option value="Church">Church</option>
              <option value="Fortress">Fortress</option>
              <option value="Park">Park</option>
              <option value="Reservation">Reservation</option>
              <option value="Winery">Winery</option>
              <option value="Zoo">Zoo</option>
            </Select>
          </div>
          <div className={"input-container"}>
            <Label>
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

const Select = styled.select`
  font-family: monospace;
  border: none;
  overflow: auto;
  outline: none;
  padding: 12px 20px;
  box-sizing: border-box;
  border-bottom: 2px solid var(--color-grey-8);
  font-size: 16px;
  //width: 250px;

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
`

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
