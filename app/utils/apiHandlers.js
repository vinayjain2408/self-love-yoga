import axios from 'axios';
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
const isDevelopment = process.env.APP_ENV !== 'production';
const isProductionApp = process.env.APP_ENV === 'production';
const apiUrl = process.env.API_URL;

export const setAuthCookie = () => {
  return Cookies.set(
    isDevelopment
      ? 'test__users__isLoggedIn'
      : isProductionApp
      ? '__user__authToken'
      : `${process.env.APP_ENV}__user__authToken`,
    'true',
    { expires: 1 },
  );
};

export const removeAuthCookie = () => {
  const isLoggedInCookie = isDevelopment
    ? 'test__users__isLoggedIn'
    : isProductionApp
    ? '__user__authToken'
    : `${process.env.APP_ENV}__user__authToken`;

  Cookies.remove(isLoggedInCookie);

  const authTokenCookie = isDevelopment
    ? 'test__users__authToken'
    : isProductionApp
    ? '__users__authToken'
    : `${process.env.APP_ENV}__users__authToken`;

  return Cookies.remove(authTokenCookie);
};

export const isLoggedIn = () => {
  const cookieName = isDevelopment
    ? 'test__users__isLoggedIn'
    : isProductionApp
    ? '__user__authToken'
    : `${process.env.APP_ENV}__user__authToken`;

  return Boolean(Cookies.get(cookieName));
};
export const setAuthToken = (token) => {
  return Cookies.set(
    isDevelopment
      ? 'test__users__authToken'
      : isProductionApp
      ? '__users__authToken'
      : `${process.env.APP_ENV}__users__authToken`,
    token,
    { expires: 1 },
  );
};

export const getAuthToken = () => {
  const cookieName = isDevelopment
    ? '__user__authToken'
    : isProductionApp
    ? '__users__authToken'
    : `${process.env.APP_ENV}__users__authToken`;

  return Cookies.get(cookieName);
};

// export const getAuthToken = () => {
//   const authTokenKey = isDevelopment
//     ? 'test__users__authToken'
//     : isProductionApp
//     ? '__user__authToken'
//     : `${process.env.APP_ENV}__users__authToken`;

//   const loggedInKey = isDevelopment
//     ? 'test__users__isLoggedIn'
//     : isProductionApp
//     ? '__users__isLoggedIn'
//     : `${process.env.APP_ENV}__users__isLoggedIn`;

//   let authToken = Cookies.get(authTokenKey);
//   let loggedInValue = Cookies.get(loggedInKey);

//   // If __users__isLoggedIn is empty, set it to __user__authToken
//   if (!loggedInValue && authToken) {
//     Cookies.set(loggedInKey, authToken, { expires: 1, path: '/' });
//     return authToken;
//   }

//   return loggedInValue || authToken;
// };

const unauthorizedHandler = () => {
  Cookies.remove(
    isDevelopment
      ? 'test__users__isLoggedIn'
      : isProductionApp
      ? '__users__isLoggedIn'
      : `${process.env.APP_ENV}__users__isLoggedIn`,
  );
  window.location.href = '/login';
};

const responseFormatter = (status, data, error) => {
  return { status, data, error };
};

export const postReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
      },
      // withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const getReq = async (url) => {
  const route_url = apiUrl + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export const getAuthReq = async (url) => {
  const route_url = apiUrl + url;
  return await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      // withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};
export async function getAuthData(url) {
  const route_url = apiUrl + url;
  const response = await axios
    .get(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    .catch((e) => e.response);

  return response;
}

export const postAuthReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .post(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler;
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const putAuthReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .put(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler;
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};

export const patchAuthReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .patch(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler;
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
const handleApiError = (err) => {
  return responseFormatter(false, null, err.response.data);
};

export const patchReq = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;
  return await axios
    .patch(url, data, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((err) => {
      return handleApiError(err);
    });
};
export const deleteAuthReq = async (url, data) => {
  const route_url = apiUrl + url;
  return await axios
    .delete(route_url, data, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
      withCredentials: true,
    })
    .then((response) => {
      return responseFormatter(true, response.data, null);
    })
    .catch((e) => {
      if (e?.response?.status === 401) {
        unauthorizedHandler();
      } else if (e) {
        return responseFormatter(false, null, e?.response?.data || null);
      } else {
        return responseFormatter(false, null, e?.response?.data || null);
      }
    });
};
export async function deleteAuthData(url) {
  const route_url = apiUrl + url;
  const response = await axios
    .delete(route_url, {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAuthToken()}`,
      },
    })
    .catch((e) => e.response);

  return response;
}
export const postFile = async (endpoint, data) => {
  const url = process.env.API_URL + endpoint;
  const headers = {
    Accept: 'application/json',
    Authorization: `Bearer ${getAuthToken()}`,
    'Content-Type': 'multipart/form-data',
  };

  try {
    const response = await axios.post(url, data, {
      withCredentials: true,
      headers,
    });
    return responseFormatter(true, response.data, null);
  } catch (e) {
    if (e?.response?.status === 401) {
      unauthorizedHandler();
    } else if (e) {
      return responseFormatter(false, null, e?.response?.data || null);
    } else {
      return responseFormatter(false, null, e?.response?.data || null);
    }
  }
};
export const showErrorMessage = (message) => {
  if (message instanceof Array) {
    message.forEach((msg) => toast.error(msg));
  } else {
    toast.error(message);
  }
};
