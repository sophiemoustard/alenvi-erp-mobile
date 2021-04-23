import getEnvVars from '../../environment';

export default {
  exists: (params: { email: string }) => {
    const { baseURL } = getEnvVars();

    return { method: 'GET', url: `${baseURL}/users/exists`, params };
  },
};
