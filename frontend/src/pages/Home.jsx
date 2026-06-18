import React, { useEffect } from "react";
// import CountUp from "react-countup";
import AOS from "aos";
import "aos/dist/aos.css";
import "../styles/global.css";



const Home = () => {
  useEffect(() => {
  AOS.init({ duration: 1000, once: true });
  AOS.refresh();   // 🔥 ADD THIS
}, []);

  return (
    <div className="home-container">

      {/* HERO */}
      <div className="hero">
       
        <div className="hero-content" data-aos="fade-up">

          <h1>SMART RIDE</h1>

          <h2>Drive beyond limits. Experience luxury on demand.</h2>

          <p>
            Premium car rentals with instant booking, flexible pricing,
            and world-class driving experience at your fingertips.
          </p>

          <button className="cta-btn">Explore Fleet</button>
        </div>
      </div>
  

{/* LUXURY FLEET */}

<section className="luxury-fleet">

  <div className="fleet-header">
    <span>PREMIUM COLLECTION</span>
    <h2>Luxury Car Collection</h2>
    <p>
      Explore our handpicked collection of premium vehicles designed
      for comfort, performance and prestige.
    </p>
  </div>

  <div className="fleet-grid">

    {[
      {
        name: "BMW M4",
        image: "https://th.bing.com/th/id/OIP.botNcIHOtgqQiNtViqwVrwHaEo?r=0&o=7rm=3&rs=1&pid=ImgDetMain&o=7&rm=3",
        price: "₹12,000/day",
        seats: 4,
        fuel: "Petrol",
        mileage: "15 kmpl",
        type: "Coupe",
      },
      {
        name: "Audi A6",
        image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
        price: "₹10,500/day",
        seats: 5,
        fuel: "Petrol",
        mileage: "18 kmpl",
        type: "Sedan",
      },
      {
        name: "Mercedes G-Wagon",
        image: "https://th.bing.com/th/id/OIP.mJjf5jCRa4v0OlfSczJvUQHaFj?w=237&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3",
        price: "₹18,000/day",
        seats: 7,
        fuel: "Diesel",
        mileage: "12 kmpl",
        type: "SUV",
      },
    ].map((car, index) => (
      <div className="fleet-card" key={index}>

        <div className="fleet-image">
          <img src={car.image} alt={car.name} />
        </div>

        <div className="fleet-content">

          <h3>{car.name}</h3>

          <div className="fleet-price">
            {car.price}
          </div>

          <div className="fleet-info">

            <span>👥 {car.seats} Seats</span>
            <span>⛽ {car.fuel}</span>
            <span>🚘 {car.type}</span>
            <span>📍 {car.mileage}</span>

          </div>

          <button className="fleet-btn">
            Book Now
          </button>

        </div>

      </div>
    ))}

  </div>

</section>


{/* PREMIUM REVIEWS SECTION */}

<section className="premium-reviews">

  <div className="review-header">
    <span>WHAT OUR CLIENTS SAY</span>
    <h2>Premium Drive Experiences</h2>
    <p>
      Hear from our valued customers about their journey with our premium fleet
    </p>
  </div>

  {/* REVIEW CARDS */}
  <div className="review-grid">

    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        “The BMW 5 Series was impeccable! Smooth ride and excellent service.
        Will definitely rent again.”
      </p>

      <div className="car-tag">BMW 5 Series</div>

      <div className="user">
        <div className="avatar">S</div>
        <div>
          <h4>Sarah Johnson</h4>
          <span>Business Traveler</span>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="stars">★★★★☆</div>
      <p>
        “Perfect family Toyota Highlander with ample space. Clean, well-maintained
        and great value for money.”
      </p>

      <div className="car-tag">Toyota Highlander</div>

      <div className="user">
        <div className="avatar">M</div>
        <div>
          <h4>Michael Chen</h4>
          <span>Family Vacation</span>
        </div>
      </div>
    </div>

    <div className="review-card">
      <div className="stars">★★★★★</div>
      <p>
        “Ford Mustang convertible made our trip unforgettable. 24/7 support was amazing!”
      </p>

      <div className="car-tag">Ford Mustang</div>

      <div className="user">
        <div className="avatar">E</div>
        <div>
          <h4>Emma Rodriguez</h4>
          <span>Road Trip Enthusiast</span>
        </div>
      </div>
    </div>

  </div>

  {/* STATS BAR */}
  <div className="review-stats">

    <div>
      <h3>10K+</h3>
      <p>Happy Customers</p>
    </div>

    <div>
      <h3>250+</h3>
      <p>Luxury Vehicles</p>
    </div>

    <div>
      <h3>24/7</h3>
      <p>Support</p>
    </div>

    <div>
      <h3>50+</h3>
      <p>Locations</p>
    </div>

  </div>

</section>
















{/* CTA */}
<section className="cta-section">
  <div className="cta-overlay">
    <h2>Ready To Drive Your Dream Car?</h2>

    <p>
      Premium Cars • Affordable Pricing • Instant Booking
    </p>

    <button>Book Now</button>
  </div>
</section>

{/* FOOTER */}
<footer className="footer">

  <div className="footer-content">

    <div>
      <h3>Quick Links</h3>
      <p>Home</p>
      <p>Cars</p>
      <p>About</p>
      <p>Contact</p>
    </div>

    <div>
      <h3>Services</h3>
      <p>Luxury Cars</p>
      <p>SUV Rental</p>
      <p>Corporate Rental</p>
    </div>

    <div>
      <h3>Contact</h3>
      <p>📞 +91 9876543210</p>
      <p>📧 info@carrental.com</p>
    </div>

  </div>

  <p className="copyright">
    © 2026 Premium Car Rental. All Rights Reserved.
  </p>

</footer>
      

    </div>
  );
};

export default Home;