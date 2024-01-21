export const CLOUDINARY_IMAGE_UPLOAD_URL =
  "https://api.cloudinary.com/v1_1/the-veiled-narrative/image/upload";
export const CLOUDINARY_IMAGE_UPLOAD_PRESET = "the_veiled_narrative";

export const CREATE_POST_URL = "/api/posts/create";
export const UPDATE_POST_URL = "/api/posts/update/";
export const GET_POST_BY_ID_URL = "/api/posts/post/";
export const GET_POSTS_BY_OFFSET_URL = "/api/posts/postsByOffset/";
export const DELETE_POST = "/api/posts/delete/";

export const CREATE_POST_LOCATION = "/blog/post/create";
export const VIEW_POST_LOCATION = "/blog/post/";
export const UPDATE_POST_LOCATION = "/blog/post/update/";
export const BLOG_LOCATION = "/blog";
export const HOME_LOCATION = "/home";

export const EMAIL_PATTERN =
  "^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+).([a-zA-Z]{2,5})$";
export const ALLOWED_IMAGE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/gif",
];
export const IMAGE_FILE_UPLOAD_SIZE_LIMIT = 50000000;

export const MAILCHIMP_SUBSCRIBER_FORM_URL = "http://eepurl.com/g6Y1QT";
