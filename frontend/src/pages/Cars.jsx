import React from "react";
import "../styles/global.css";

const Cars = () => {
  return (
    <>
      {/* ================= FEATURED CARS ================= */}

      <div className="featured-section">
        <h2 className="section-title">Premium Car Collection</h2>

        <p className="section-subtitle">
          Discover our exclusive fleet of luxury vehicles ready for your journey.
        </p>

        <div className="cars-grid">

          {[
            {
              name: "BMW M4",
              image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
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
              image: "https://th.bing.com/th/id/OIP.uOXw5-g3bKNc3m0zQOe8PAHaEK",
              price: "₹18,000/day",
              seats: 7,
              fuel: "Diesel",
              mileage: "12 kmpl",
              type: "SUV",
            },
            {
              name: "Porsche 911",
              image: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
              price: "₹22,000/day",
              seats: 2,
              fuel: "Petrol",
              mileage: "10 kmpl",
              type: "Sports",
            },
            {
              name: "Lamborghini Huracan",
              image: "https://th.bing.com/th/id/OIP.dIcLXreSEqo89qB5lXE9GAHaE8",
              price: "₹35,000/day",
              seats: 2,
              fuel: "Petrol",
              mileage: "8 kmpl",
              type: "Supercar",
            },
            {
              name: "Range Rover Sport",
              image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg",
              price: "₹16,000/day",
              seats: 5,
              fuel: "Diesel",
              mileage: "14 kmpl",
              type: "SUV",
            },
            {
              name: "Tesla Model S",
              image: "https://th.bing.com/th/id/OIP.mJjf5jCRa4v0OlfSczJvUQHaFj",
              price: "₹20,000/day",
              seats: 5,
              fuel: "Electric",
              mileage: "650 km",
              type: "Luxury EV",
            },
            {
              name: "Ferrari F8",
              image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
              price: "₹40,000/day",
              seats: 2,
              fuel: "Petrol",
              mileage: "7 kmpl",
              type: "Supercar",
            },

            /* ================= LAST 4 CARS (RESTORED) ================= */

            {
              name: "Rolls-Royce Ghost",
              image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
              price: "₹45,000/day",
              seats: 5,
              fuel: "Petrol",
              mileage: "8 kmpl",
              type: "Ultra Luxury",
            },
            {
              name: "Bentley Continental GT",
              image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg",
              price: "₹38,000/day",
              seats: 4,
              fuel: "Petrol",
              mileage: "9 kmpl",
              type: "Grand Tourer",
            },
            {
              name: "McLaren 720S",
              image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
              price: "₹42,000/day",
              seats: 2,
              fuel: "Petrol",
              mileage: "7 kmpl",
              type: "Supercar",
            },
            {
              name: "Maserati Levante",
              image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
              price: "₹19,000/day",
              seats: 5,
              fuel: "Petrol",
              mileage: "13 kmpl",
              type: "Luxury SUV",
            },

          ].map((car, index) => (
            <div className="car-card" key={index}>

              <span className="status">Available</span>

              <img src={car.image} alt={car.name} />

              <span className="price-tag">{car.price}</span>

              <div className="card-content">
                <h3>{car.name}</h3>
                <p className="car-type">{car.type}</p>

                <div className="car-specs">
                  <div>👥 {car.seats} Seats</div>
                  <div>⛽ {car.fuel}</div>
                  <div>🚗 {car.mileage}</div>
                </div>

                <button className="book-btn">
                  Book Now →
                </button>
              </div>

            </div>
          ))}
        </div>
      </div>


{/* ================= PREMIUM FOOTER ================= */}

<footer className="premium-footer">

  <div className="footer-grid">

    <div className="footer-col brand">
      <h2>SMART RIDE</h2>

      <p>
        Premium car rental platform offering luxury vehicles,
        seamless booking, and unforgettable driving experiences.
      </p>

      <div className="socials">
  <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
  <a href="https://twitter.com" target="_blank" rel="noreferrer">Twitter</a>
  <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
  <a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn</a>
  <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
</div>
    </div>

    <div className="footer-col">
      <h3>Quick Links</h3>
      <ul>
        <li>Home</li>
        <li>Cars</li>
        <li>Bookings</li>
        <li>Contact</li>
      </ul>
    </div>

    <div className="footer-col">
      <h3>Contact</h3>
      <p>📍 123 Drive Avenue</p>
      <p>📞 +91 8299431275</p>
      <p>✉️ info@smartride.com</p>
    </div>

    <div className="footer-col newsletter">
      <h3>Newsletter</h3>

      <p>Get exclusive deals & updates</p>

      <input type="email" placeholder="Enter your email" />

      <button>Subscribe →</button>
    </div>

  </div>

  <div className="footer-bottom">
    <p>© 2025 SMART RIDE. All rights reserved.</p>
  </div>

</footer>

    </>
  );
};

export default Cars;