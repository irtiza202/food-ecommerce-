import React, { useEffect, useState } from "react";
//import { Link } from "react-router-dom";
import { useInView } from "react-intersection-observer";
// import bags1 from "../../../Assets/bags1.jpg";
import lady from "../../../Assets/images (1).jpg";
import logo from '../../../Assets/images.jpg';
import pic from '../../../Assets/download (2).jpg';
import photo from '../../../Assets/download (3).jpg'
import mood from '../../../Assets/pic.jpg'


import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const [timeLeft, setTimeLeft] = useState(60 * 60 * 60);

  const navigate = useNavigate();
  const { ref: featuredRef, inView: featuredInView } = useInView({
    triggerOnce: true,
  });
  const { ref: testimonialsRef, inView: testimonialsInView } = useInView({
    triggerOnce: true,
  });
  const { ref: whyChooseRef, inView: whyChooseInView } = useInView({
    triggerOnce: true,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const displaySeconds = seconds % 60;
    return {
      hours: String(hours).padStart(2, "0"),
      minutes: String(minutes).padStart(2, "0"),
      seconds: String(displaySeconds).padStart(2, "0"),
    };
  };

  const { hours, minutes, seconds } = formatTime(timeLeft);

  return (
    <main>
      <section className="hero container my-3">
        <div className="hero-content">
          <h1 className="heading 1">WELCOME TO FOODIES RESTURANT</h1>
          <button
            className="my-3 btn"
            onClick={() => {
              navigate("/auth/login");
            }}
          >
            ORDER NOW 
          </button>
        </div>
        <div className="hero-image">
          <div id="blob"></div>
          <img
            src={logo}
            alt="download(1).jpg" className="me-3"
          />
        </div>
        <div id="blob1">
          <img src={pic} alt="Assets/download (2).jpg" />
        </div>
      </section>

      {/* Featured Products Section */}
      <section
        className={`featured ${featuredInView ? "slide-in" : "slide-hidden"
          } px-5`}
        ref={featuredRef}
      >
        <div className="featured-content">
          <div className="featured-image">
            <img src={photo} alt="" />
          </div>
          <div className="featured-text">
            <div className="food">
              
            </div >
            <div className="food">

            <h1 className="">Good food, good mood.</h1>
            <h1 className="">We make [food] magic.</h1>
            <h1>Fun. Fast. Tasty. Delicious.</h1>
          
          </div>

          </div>
        </div>
      </section>

      <section
        className={`featured-products ${featuredInView ? "slide-in" : "slide-hidden"
          } container`}
        ref={featuredRef}
      >
        <div className="deal-container container">
          <div className="timer">
            <h1>Deal of the Month!</h1>
            <div className="countdown">
              <div className="time-box">
                <div className="time">
                  {hours}
                  <div className="label">Hours</div>
                </div>
                <div className="time">
                  {minutes}
                  <div className="label">Minutes</div>
                </div>
                <div className="time">
                  {seconds}
                  <div className="label">Seconds</div>
                </div>
              </div>
            </div>
            <button id="f-btn">See the discounted products ---&gt;</button>
          </div>
          <div className="image-container">
            <img src={lady} alt="" />
          </div>
          <div>
          <img src={mood} alt="" /> 
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section
        className={`why-choose-us ${whyChooseInView ? "slide-up" : "slide-hidden"
          } my-5 container`}
        ref={whyChooseRef}
      >
        <h2 className="my-5 text-center display-4 font-weight-bold text-uppercase">
          Why Choose Us?
        </h2>
        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <div className="card choose-us-card">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Quality Products</h5>
                <p className="card-text">
                  We provide only the best and most reliable products.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card choose-us-card">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Affordable Prices</h5>
                <p className="card-text">
                  Our prices are unbeatable for the value we offer.
                </p>
              </div>
            </div>
          </div>
          <div className="col-md-4 mb-4">
            <div className="card choose-us-card">
              <div className="card-body d-flex flex-column align-items-center">
                <h5 className="card-title">Excellent Support</h5>
                <p className="card-text">
                  Our customer support is here to help you 24/7.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section
        className={`testimonials ${testimonialsInView ? "slide-in" : "slide-hidden"
          } my-4 container`}
        ref={testimonialsRef}
      >
        <h2 className="text-center my-5">Customer Inputs</h2>
        <div
          id="testimonialsCarousel"
          className="carousel slide"
          data-bs-ride="carousel"
        >
          <div className="carousel-inner">
            <div className="carousel-item active text-center">
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  size={100}
                  style={{
                    background: "linear-gradient(to right, #c0392b, #8e44ad)",
                  }}
                  className="mb-3"
                  icon={<UserOutlined />}
                />
                <p className="mb-1">"Great products and amazing service!"</p>
                <span>∼ Customer 1</span>
              </div>
            </div>
            <div className="carousel-item text-center">
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  style={{
                    background: "linear-gradient(to right, #c0392b, #8e44ad)",
                  }}
                  size={100}
                  className="mb-3"
                  icon={<UserOutlined />}
                />
                <p className="mb-1">"Fast delivery and top-notch quality!"</p>
                <span>∼ Customer 2</span>
              </div>
            </div>
            <div className="carousel-item text-center">
              <div className="d-flex flex-column align-items-center">
                <Avatar
                  style={{
                    background: "linear-gradient(to right, #c0392b, #8e44ad)",
                  }}
                  size={100}
                  className="mb-3"
                  icon={<UserOutlined />}
                />
                <p className="mb-1">
                  "Excellent customer support and great prices."
                </p>
                <span>∼ Customer 3</span>
              </div>
            </div>
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon bg-dark rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#testimonialsCarousel"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon bg-dark rounded-circle"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </section>
    </main>
  );
}
