
const token = localStorage.getItem('userToken');
const config = {
  headers: {
    Authorization: `${token}`,
  },
  };
  export default  config;