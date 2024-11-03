import React from 'react';
import { useNavigate } from 'react-router-dom';
import c1 from "../../../Assets/download (1).jpg";

const MenuHero = () => {
  // Hardcoded data for the featured product
  const product = {
    id: 1,
    name: 'Great Lighting Keyboard',
    price: '$129.99',
    imageUrl: { c1 } // Replace with your image URL
  };

  const navigate = useNavigate()

  return (
    <section className="hero-banner">
      <div className="banner-content">
        <div className="banner-text">
          <h1>"Bite into happiness, one burger at a time"</h1>
           <h2>"Savor the flavor, love at first bite!"</h2> 
          <p></p>
          <button className="cta-button" >Order Now</button>
        </div>
        <div className="banner-image">
          <img src={c1} alt={product.name} />
        </div>
      </div>
    </section>
  );
};

export default MenuHero;
