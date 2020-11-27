import * as Yup from "yup";

export const AddItemValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Name must be 3 characters at minimum")
    .required("Name is required"),

  description: Yup.string()
    .min(3, "Description must be 3 characters at minimum")
    .required("Description is required"),

  price: Yup.string()
    .min(1, "Price must be 1 number at minimum")
    .required("Price is required"),

  category: Yup.string()
    .min(1, "Category must be 1 character at minimum")
    .required("Category is required"),
});
