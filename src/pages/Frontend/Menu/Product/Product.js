import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  Typography,
  Image,
  Carousel,
  Button,
  Spin,
  Rate,
  Row,
  Col,
  Space,
  Tag,
} from "antd";
import { firestore } from "config/firebase";
import { doc, getDoc } from "firebase/firestore";
import "./style.css";
import Info from "./Info";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [selectedColor, setSelectedColor] = useState(null);

  const carouselRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(firestore, "items", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setProduct(docSnap.data());
        } else {
          console.error("No such document!");
        }
      } catch (error) {
        console.error("Error fetching product:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleThumbnailClick = (index) => {
    if (carouselRef.current) {
      carouselRef.current.goTo(index);
    }
  };

  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    const storedWishlist = localStorage.getItem("wishlist");
    if (storedCart) setCartItems(JSON.parse(storedCart));
    if (storedWishlist) setWishlistItems(JSON.parse(storedWishlist));
  }, []);

  if (loading) {
    return (
      <div style={{ height: "100vh" }} className="d-flex align-items-center justify-content-center">
        <Spin />
      </div>
    );
  }

  const updateWishlist = (product, isAdding) => {
    setWishlistItems((prevItems) => {
      let updatedItems;
      if (isAdding) {
        updatedItems = [...prevItems, product];
        window.toastify(`${product.itemName} added to wishlist`, "info");
      } else {
        updatedItems = prevItems.filter((item) => item.id !== product.id);
        window.toastify(`${product.itemName} removed from wishlist`, "info");
      }

      localStorage.setItem("wishlist", JSON.stringify(updatedItems));
      return updatedItems;
    });
  };

  const handleAddToCart = (product) => {
    const isProductInCart = cartItems.some(item => item.productId === product.productId);
    if (isProductInCart) {
      window.toastify(`${product.itemName} is already in the cart`, "info");
      return;
    }

    const updatedCart = [...cartItems, product];
    setCartItems(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    window.toastify(`${product.itemName} added to cart`, "success");
  };

  const handleChange = (e, product) => {
    updateWishlist(product, e.target.checked);
  };

  const handleBuyNow = (product) => {
    handleAddToCart(product);
    navigate("/cart");
  };

  const calRating = (product) => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    return Math.round((totalRating / product.reviews.length) * 10) / 10;
  };

  return product ? (
    <div className="container mt-4">
      <div>
        <Link to="/products" className="text-decoration-none text-secondary">Shop &nbsp;</Link>
        &gt; &nbsp;
        <Link className="text-decoration-none text-black">Product</Link>
      </div>
      <div style={{ margin: "20px" }}>
        <Row gutter={16}>
          <Col xs={24} md={12}>
            <Carousel ref={carouselRef} autoplay>
              <div>
                <Image src={product.mainImageUrl} alt="Main Image" style={{ maxWidth: "100%", height: "400px" }} />
              </div>
              {product.secondaryImageUrls?.map((imgUrl, index) => (
                <div key={index}>
                  <Image src={imgUrl} alt={`Secondary Image ${index + 1}`} style={{ maxWidth: "100%", height: "400px" }} />
                </div>
              ))}
            </Carousel>
            <Space style={{ marginTop: "10px", display: "flex", justifyContent: "center", gap: "10px" }}>
              <img src={product.mainImageUrl} alt="Thumbnail" width={50} height={50} style={{ cursor: "pointer" }} onClick={() => handleThumbnailClick(0)} />
              {product.secondaryImageUrls?.map((imgUrl, index) => (
                <img key={index} src={imgUrl} alt={`Thumbnail ${index + 1}`} width={50} height={50} style={{ cursor: "pointer" }} onClick={() => handleThumbnailClick(index + 1)} />
              ))}
            </Space>
          </Col>
          <Col xs={24} md={12} id="info">
            <Typography.Title id="title" style={{ color: "#4B3F72", width: "220px" }} level={2}>
              {product.itemName}
            </Typography.Title>
            <Typography.Title style={{ color: "#1d933" }} level={3}>
              PKR {product.price}
            </Typography.Title>
            <div style={{ marginTop: "20px" }}>
              <Typography.Text strong>Select Color:</Typography.Text>
              <div className="color-options" style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
                {product.availableColors?.map((color, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      width: "30px",
                      height: "30px",
                      marginBottom: "8px",
                      borderRadius: "50%",
                      backgroundColor: color,
                      border: selectedColor === color ? "3px solid black" : "1px solid #ddd",
                      cursor: "pointer",
                    }}
                    title={color}
                  />
                ))}
              </div>
            </div>
            <Typography.Paragraph style={{ color: "#333333" }}>
              {product.description}
            </Typography.Paragraph>
            <div>
              <Tag color={product.isInStock ? "success" : "red"} id="stock-tag">
                {product.isInStock ? "In Stock" : "Out of Stock"}
              </Tag>
            </div>
            <div style={{ marginTop: "5px" }}>
              <p style={{ color: "#333333" }}><b>Product Rating:</b></p>
              <Rate disabled value={calRating(product)} />
            </div>
            <div className="d-flex justify-content-between">
              <Button type="primary" style={{ marginTop: "20px", backgroundColor: "#F7931E" }} onClick={() => handleBuyNow(product)}>
                Buy Now
              </Button>
              <Button className="ms-2" style={{ marginTop: "20px" }} onClick={() => handleAddToCart(product)}>
                Add to cart
              </Button>
              <div className="heart-container" title="Like">
                <input
                  checked={wishlistItems.some(item => item.productId === product.productId)}
                  onChange={(e) => handleChange(e, product)}
                  type="checkbox"
                  className="checkbox"
                  id="Give-It-An-Id"
                />
                <div className="svg-container">
                  {/* SVG icons for wishlist */}
                  {/* You can keep the SVGs as they are */}
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
      <Info product={product} />
      {/* Features section */}
      {/* ... */}
    </div>
  ) : (
    <Typography.Text>Product not found</Typography.Text>
  );
};

export default Product;
