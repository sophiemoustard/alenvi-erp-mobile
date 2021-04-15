import axios from 'axios';

const setUpAxiosInterceptors = (openModal: (arg: boolean) => void) => {
  axios.interceptors.response.use(
    (response) => {
      openModal(false);
      return response;
    },
    async (error) => {
      if ([502, 503].includes(error.response.status)) openModal(true);
      return Promise.reject(error.response);
    }
  );
};

export default { setUpAxiosInterceptors };
