import * as Constants from "../../utils/Constants";

const Validate = (name, value) => {
  let errors = {};
  switch (name) {
    case "name":
      errors.name = value.length === 0 ? "Username is required" : "";
      break;
    case "email":
      errors.email =
        value.length === 0
          ? "Email is required"
          : !value.match(Constants.EMAIL_PATTERN)
          ? "Enter a valid email id"
          : "";
      break;
    case "password":
      errors.password =
        value.length === 0
          ? "Password is required"
          : value.length < 6
          ? "Password must be atleast 6 characters"
          : "";
      break;
    case "title":
      errors.title = value.length === 0 ? "Title is required" : "";
      break;
    case "author":
      errors.author = value.length === 0 ? "Author Name is required" : "";
      break;
    case "body":
      errors.body = value.length <= 1 ? "Description is required" : "";
      break;
    case "image":
      errors.image = "";

      if (Constants.ALLOWED_IMAGE_TYPES.every((type) => value.type !== type)) {
        errors.image = `Uploaded image format is not supported. Please upload jpeg or png`;
      }

      if (value.size > Constants.IMAGE_FILE_UPLOAD_SIZE_LIMIT) {
        errors.image =
          "Uploaded image is too large, please pick a smaller file (less than 50MB)";
      }
      break;
    default:
      break;
  }

  return {
    errors,
  };
};

export default Validate;
