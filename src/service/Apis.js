const apis = {
  // eslint-disable-next-line no-undef
  BASE: process.env.REACT_APP_API_ENDPOINT,
  BASE_ENDPOINT: process.env.REACT_APP_API_BASE_ENDPOINT,
  PATH: process.env.REACT_APP_API_PATH,
  VERSION: process.env.REACT_APP_API_VERSION,
  PUBLIC: process.env.REACT_APP_API_PUBLIC,
  PRIVATE: process.env.REACT_APP_API_PRIVATE,
  IMAGE_PREVIEW: "multimedia/preview-by-id",

  LOGIN: "authentication",
  PROVIDER: "provider",

  REFRESH_TOKEN: `/api/v1/auth/token/refresh`,

  FORGET_PASS: `/api/v1/accounts/password-reset`,

  FORM_LIST: `/api/v1/apa`,

  STATIC: `/api/v1/static-data`,

  PLANING: `/api/v1/apa-planning`,

  EVALUATION: `/api/v1/apa-evaluation`,

  UPLOAD: `/api/v1/attachments`,
};

export default apis;
