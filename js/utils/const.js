const BASIC_URL = 'https://api.unsplash.com/';
const ACCESS_KEY = 'EBaj57gRSw7OYvpo02g_MuY69n8t6mVKFfpDG-KGF6U';
const DEFAULT_REQUEST = 'beige aesthetic';
const DEFAULT_PAGE = 1;
const PER_PAGE = 20;
const DELAY = 5000;
const DEFAULT_ERROR_MESSAGE = 'Oops... Something went wrong. Please try again or come back later.';

const ERROR = {
  400: 'Bad Request. The request was unacceptable, often due to missing a required parameter.',
  401: 'Unauthorized. Invalid Access Token.',
  403: 'Forbidden. Missing permissions to perform request. Please come back later.',
  404: 'Not Found. The requested resource doesn’t exist.',
  500: 'Something went wrong on our end. Please try again or come back later.',
  503: 'Something went wrong on our end. Please try again or come back later.',
};

export {
  BASIC_URL,
  ACCESS_KEY,
  DEFAULT_REQUEST,
  DEFAULT_PAGE,
  PER_PAGE,
  DELAY,
  DEFAULT_ERROR_MESSAGE,
  ERROR
};