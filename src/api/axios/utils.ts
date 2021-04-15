import axios from 'axios';

const interceptOnMaintenance = (openModal: (arg: boolean) => void) => openModal(true);

const setUpAxiosInterceptors = (openModal: (arg: boolean) => void) => {
  axios.interceptors.response.use(
    response => response,
    async (error) => {
      if ([502, 503].includes(error.response.status)) return interceptOnMaintenance(openModal);
      return Promise.reject(error.response);
    }
  );
};

export default { setUpAxiosInterceptors };
