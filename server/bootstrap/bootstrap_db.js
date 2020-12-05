import mongoose from "mongoose";

export const bootstrapDB = (appName) => {
  mongoose.connect(`mongodb://localhost:27017/${appName}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};
