import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
});

export const getProducts = async () => {
  try {
    const { data } = await api.get('/products/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getTags = async () => {
  try {
    const { data } = await api.get('/tags/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createCart = async () => {
  try {
    const { data } = await api.post('/carts/');
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getCart = async (cartId) => {
  try {
    const { data } = await api.get(`/carts/${cartId}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCart = async (cartId, products) => {
  try {
    const { data } = await api.patch(`/carts/${cartId}/`, {
      products: products,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCart = async (cartId) => {
  try {
    const { data } = await api.delete(`/carts/${cartId}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

// create customer
/**
 * 
 * example customer    
 * 
    "first_name": "Simon",
    "last_name": "Wagner",
    "username": "simon.wagner@concade",
    "address": {
        "street_address": "Teststraße 1",
        "city": "Musterstadt",
        "postcode": "12345",
        "country": "Germany"
    },
    "password": "123456"
 */
export const createCustomer = async (customer) => {
  try {
    const { data } = await api.post('/customers/', customer);
    return data;
  } catch (error) {
    console.log('error', error);
    return error;
  }
};

export const getCustomer = async (customerId) => {
  try {
    const { data } = await api.get(`/customers/${customerId}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const updateCustomer = async (customerId, customer) => {
  try {
    const { data } = await api.patch(`/customers/${customerId}/`, {
      firstName: customer.firstName,
      lastName: customer.lastName,
      username: customer.username,
      address: {
        street_address: customer.streetAddress,
        city: customer.city,
        postcode: customer.postcode,
        country: customer.country,
      },
      password: customer.password,
      cart: customer?.cartId || null,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const deleteCustomer = async (customerId) => {
  try {
    const { data } = await api.delete(`/customers/${customerId}/`);
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const login = async (username, password) => {
  try {
    const { data } = await api.post('/login/', {
      username,
      password,
    });
    return data;
  } catch (error) {
    console.log(error);
  }
};

export const createOrder = async (products, shippingCompany) => {
  try {
    const { data } = await api.post(
      '/orders/',
      {
        products,
        shipping_company: shippingCompany,
      },
      {
        headers: {
          Authorization: `Token ${localStorage.getItem('token')}`,
        },
      }
    );
    return data;
  } catch (error) {
    return error;
  }
};

export const getOrders = async () => {
  try {
    const { data } = await api.get('/orders/', {
      headers: {
        Authorization: `Token ${localStorage.getItem('token')}`,
      },
    });
    console.log(data);
    return data;
  } catch (error) {
    return error;
  }
};
