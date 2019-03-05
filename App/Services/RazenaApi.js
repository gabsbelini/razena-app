import apisauce from 'apisauce';

const baseURLApi = `http://192.168.57.1:3000/api/`

const create = (baseURL = baseURLApi) => {
  const api = apisauce.create({
    baseURL,
    headers: {
      'Cache-Control': 'no-cache'
    },
    timeout: 5000
  });

  const login = credentials =>
    api.post('/Users/login', {
      email: credentials.username,
      password: credentials.password
    });

  const createUser = credentials =>
    api.post('/Users', {
      email: credentials.username, 
      password: credentials.password
    });

  const getProdutos = (token) => api.get(`/produtos?access_token=${token}`);

  const createVendaConsumo = ({token, data}) => api.post(`vendas_consumos?access_token=${token}`, data)

  return {
    login,
    createUser,
    createVendaConsumo,
    getProdutos
  };

};

export default {
  create
};
