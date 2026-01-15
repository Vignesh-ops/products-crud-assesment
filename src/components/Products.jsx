import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './ui/Button';
// import '../styles/product.css';

const Products = ({ product, onDelete }) =>{
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/admin/${product.id}`);
  };

  const handleDelete = () => { 
    if (window.confirm(`Are you sure want to delete "${product.title}"?`)) {
      onDelete(product.id);
    }
  };

  return (
    <div className="product-cont">
      <div className="product-image">
        <img 
          src={product?.image} 
          alt={product?.title}
          className="prod-imagechild"
          onError={(e) => {
            e.target.src = 'https://via.placeholder.com/300x300/CCCCCC/666666?text=No+Image';
          }}
        />
      </div>
      <div className="product-content">
        <h3 className="product-title">{product?.title}</h3>
        <p className="product-price">₹ {product?.price}</p>
        <p className="product-category">{product?.category}</p>
        <div className="product-actions">
          <Button onClick={handleEdit} children='Edit' variant = 'primary' className="btn-edit"/>
          <Button onClick={handleDelete} children='Delete' variant='secondary' className="btn-delete"/>
        </div>
      </div>
    </div>
  );
}

export default Products;
