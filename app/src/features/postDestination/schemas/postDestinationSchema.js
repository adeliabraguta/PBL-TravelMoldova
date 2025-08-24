import * as yup from "yup";

export const postDestinationSchema = yup.object().shape({
  name: yup.string().required("*"),
  description: yup.string().required("*"),
  location: yup.string().required("*"),
  map: yup.string().required("*"),
  type: yup.string().required("*"),
  images: yup.array()
      .of(yup.mixed().required('*'))
      .min(1, '*'),
});
