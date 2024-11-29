import * as yup from "yup";

export const ReviewSchema = yup.object().shape({
  rating: yup.number().min(1, '*').required('*'),
  review: yup.string().required('*'),
});
