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
name: "Office Commute Plan",
image: "https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg",
price: "₹2,999/month",
seats: "Daily",
fuel: "GPS",
mileage: "Support",
type: "Starter Plan",
},
{
name: "Executive Plan",
image: "https://images.pexels.com/photos/358070/pexels-photo-358070.jpeg",
price: "₹4,999/month",
seats: "Priority",
fuel: "Premium",
mileage: "24x7",
type: "Business",
},
{
name: "Family Plan",
image: "https://th.bing.com/th/id/OIP.uOXw5-g3bKNc3m0zQOe8PAHaEK",
price: "₹5,999/month",
seats: "Family",
fuel: "Safe",
mileage: "Routes",
type: "Family",
},
{
name: "VIP Premium Plan",
image: "https://images.pexels.com/photos/1149831/pexels-photo-1149831.jpeg",
price: "₹7,999/month",
seats: "Luxury",
fuel: "VIP",
mileage: "Benefits",
type: "Premium",
},
{
name: "Student Pass",
image: "https://th.bing.com/th/id/OIP.dIcLXreSEqo89qB5lXE9GAHaE8",
price: "₹1,999/month",
seats: "College",
fuel: "Pickup",
mileage: "Drop",
type: "Student",
},
{
name: "Corporate Plus",
image: "https://images.pexels.com/photos/1007410/pexels-photo-1007410.jpeg",
price: "₹8,999/month",
seats: "Office",
fuel: "Priority",
mileage: "Support",
type: "Corporate",
},
{
name: "Eco Ride Plan",
image: "https://th.bing.com/th/id/OIP.mJjf5jCRa4v0OlfSczJvUQHaFj",
price: "₹3,499/month",
seats: "Eco",
fuel: "Green",
mileage: "Travel",
type: "Sustainable",
},
{
name: "Elite Membership",
image: "https://images.pexels.com/photos/210019/pexels-photo-210019.jpeg",
price: "₹9,999/month",
seats: "VIP",
fuel: "Luxury",
mileage: "Service",
type: "Elite",
},
{
name: "Gold Membership",
image: "https://images.pexels.com/photos/3764984/pexels-photo-3764984.jpeg",
price: "₹11,999/month",
seats: "Premium",
fuel: "Luxury",
mileage: "Travel",
type: "Gold",
},
{
name: "Platinum Membership",
image: "https://images.pexels.com/photos/337909/pexels-photo-337909.jpeg",
price: "₹14,999/month",
seats: "Unlimited",
fuel: "Priority",
mileage: "Support",
type: "Platinum",
},
{
name: "Diamond Membership",
image: "https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg",
price: "₹19,999/month",
seats: "VIP",
fuel: "Exclusive",
mileage: "Benefits",
type: "Diamond",
},
{
name: "Smart Ride Ultimate",
image: "https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg",
price: "₹24,999/month",
seats: "All",
fuel: "Premium",
mileage: "Features",
type: "Ultimate",
}
,

          ].map((plan, index) => (
  <div className="car-card" key={index}>

    {/* STATUS BADGE */}
    <span className="status">
      {index === 0 ? "Popular" : "Premium"}
    </span>

    <img src={plan.image} alt={plan.name} />

    {/* PRICE TAG → NOW SUBSCRIPTION STYLE */}
    <span className="price-tag">{plan.price}</span>

    <div className="card-content">

      {/* TITLE */}
      <h3>{plan.name}</h3>

      {/* TYPE → now becomes plan category */}
      <p className="car-type">{plan.type}</p>

      {/* SPECS → converted into Smart Ride features */}
      <div className="car-specs">

        <div>📍 {plan.seats} Service</div>

        <div>🛰 {plan.fuel}</div>

        <div>⏱ {plan.mileage}</div>

      </div>

      {/* BUTTON */}
      <button className="book-btn">
        Subscribe Now →
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