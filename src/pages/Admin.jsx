import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createProduct, updateProduct, getProductbyId } from '../api/productApi';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Select from '../components/ui/Select';
import '../styles/admin.css';

const Admin = ()=> {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const [formData, setFormData] = useState({
    title: '',
    price: '',
    category: 'Men',
    description: '',
    image: ''
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isEditMode) {
      loadProduct();
    }
  }, [id]);

  const loadProduct = async () => {
    try {
      const product = await getProductbyId(id);
     
      setFormData({
        title: product[0].title,
        price: product[0].price,
        category: product[0].category,
        description: product[0].description,
        image: product[0].image
      });
      console.log('product===>',product[0].title)
    } catch (error) {
        console.log('error',error)
      navigate('/admin');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('dta',formData)

    try {
      setLoading(true);
      
      if (isEditMode) {
        await updateProduct(id, formData);
        alert('Product updated successfully!');
      } else {
        await createProduct(formData);
        alert('Product created successfully!');
      }
      navigate('/products');
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };


  const categoryOptions = [
    { value: 'Men', label: 'Men' },
    { value: 'Women', label: 'Women' },
    { value: 'Electronics', label: 'Electronics' },
    { value: 'Home', label: 'Home' },
    { value: 'Sports', label: 'Sports' }
  ];

  return (
    <div className="admin-page">
      <div className="admin-container">
        <div className="admin-header">
          <h2>{isEditMode ? `Edit Product: ${formData?.title}` : 'Add New Product'}</h2>
          
        </div>

        <form onSubmit={handleSubmit} className="product-form">
          <Input
            label="Title"
            value={formData.title}
            onChange={(val) => setFormData({ ...formData, title: val })}
            placeholder="Enter product title"
            required
          />

          <Input
            label="Price"
            type="number"
            value={formData.price}
            onChange={(val) => setFormData({ ...formData, price: val })}
            placeholder="Enter price"
            required
          />

          <Input
            label="Image URL"
            value={formData.image}
            onChange={(val) => setFormData({ ...formData, image: val })}
            placeholder="image URL"
          />

          <Select
            label="Category"
            value={formData.category}
            onChange={(val) => setFormData({ ...formData, category: val })}
            options={categoryOptions}
            required
          />

          <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Please enter product description"
              rows="4"
              className="form-textarea"
            />
          </div>

          <div className="form-actions">
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Product'}
            </Button>

            <Button type="button" variant="outline" onClick={() => navigate('/products')}>
              Cancel
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Admin;
