const API_URL = 'http://localhost:5000/products';

// get all products
export const getAllProducts = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error('failed to fetch products');
    return await res.json();
  } catch (error) {
    console.error('rrror fetching products', error);
    throw error;
  }
};

// get single product
export const getProductbyId = async (id) => {
  try {
    const res = await fetch(`${API_URL}?id=${id}`);
    if (!res.ok) throw new Error('product not found');
    return await res.json();
  } catch (error) {
    console.error('error fetching product', error);
    throw error;
  }
};

// for create product
export const createProduct = async (productData) => {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('failed to create product');
    return await res.json();
  } catch (error) {
    console.error('Error creating product', error);
    throw error;
  }
};

//for update a product
export const updateProduct = async (id, productData) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method:'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(productData),
    });
    if (!res.ok) throw new Error('failed to update product');
    return await res.json();
  } catch (error) {
    console.error('Error updating product', error);
    throw error;
  }
};

// fordelete product
export const deleteProduct = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('failed to delete product');
    return true;
  } catch (error) {
    console.error('Error deleting product', error);
    throw error;
  }
};
