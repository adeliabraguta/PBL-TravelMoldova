import * as yup from "yup";

export const ReviewSchema = yup.object().shape({
  rating: yup.number().required(),
  review: yup.string().required(),
});