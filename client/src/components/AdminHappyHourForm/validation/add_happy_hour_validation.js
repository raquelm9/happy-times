import * as Yup from "yup";

export const AddHappyHourValidationSchema = Yup.object().shape({
  startTime: Yup.string().required("Start Time is required"),
  endTime: Yup.string().required("End Time is required"),
});
