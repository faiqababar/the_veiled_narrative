const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = validatePostInput = (data) => {
  let errors = {};

  let { title, body, author, image } = data;

  // Converting empty fields to empty string as validator function works only with strings
  title = !isEmpty(title) ? title : "";
  body = !isEmpty(body) ? body : "";
  author = !isEmpty(author) ? author : "";
  image = !isEmpty(image) ? image : "";

  if (Validator.isEmpty(title)) {
    errors.title = "Title is required";
  }
  if (Validator.isEmpty(body)) {
    errors.body = "Description is required";
  }
  /* if (Validator.isEmpty(author)) {
    errors.author = "Author is required";
  } 
  if (Validator.isEmpty(image)) {
    errors.image = "Image is required";
  }*/

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
