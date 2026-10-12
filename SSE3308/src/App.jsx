
import React, { useState } from "react";
import "./App.css";

const products = [
  {
    id: 1,
    name: "Blush Satin Set",
    category: "Satin Collection",
    price: 59.9,
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=700",
    color: "Blush Pink",
    badge: "BEST SELLER",
  },
  {
    id: 2,
    name: "Cloud Cotton Pyjamas",
    category: "Cotton Collection",
    price: 49.9,
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=700",
    color: "Soft Cream",
    badge: "NEW",
  },
  {
    id: 3,
    name: "Moonlight Lounge Set",
    category: "Loungewear",
    price: 69.9,
    image: "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=700",
    color: "Lavender",
    badge: "POPULAR",
  },
  {
    id: 4,
    name: "Sweet Dreams Nightdress",
    category: "Nightdress",
    price: 54.9,
    image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=700",
    color: "Rose Pink",
    badge: "NEW",
  },
  {
    id: 5,
    name: "Cozy Weekend Set",
    category: "Cotton Collection",
    price: 45.9,
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=700",
    color: "Ivory",
    badge: "",
  },
  {
    id: 6,
    name: "Dreamy Silk Collection",
    category: "Satin Collection",
    price: 79.9,
    image: "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=700",
    color: "Champagne",
    badge: "LIMITED",
  },
];

const categories = [
  "All",
  "Satin Collection",
  "Cotton Collection",
  "Loungewear",
  "Nightdress",
];

function App() {
  const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sizes, setSizes] = useState({});
  const [menuOpen, setMenuOpen] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      category === "All" || product.category === category;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const addToCart = (product) => {
    const size = sizes[product.id] || "M";
    const key = `${product.id}-${size}`;

    setCart((previous) => {
      const existing = previous.find((item) => item.key === key);

      if (existing) {
        return previous.map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...previous, { ...product, key, size, quantity: 1 }];
    });

    setCartOpen(true);
  };

  const changeQuantity = (key, amount) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.key === key
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const checkout = () => {
    if (!cart.length) return;

    const phone = "60123456789"; // Replace with your WhatsApp number

    const order = cart
      .map(
        (item) =>
          `${item.name} (${item.size}) x${item.quantity} - RM${(
            item.price * item.quantity
          ).toFixed(2)}`
      )
      .join("\n");

    const message =
      `Hello LUNA SLEEPWEAR! 🌙\n\n` +
      `I would like to order:\n\n${order}\n\n` +
      `Total: RM${total.toFixed(2)}\n\n` +
      `Please confirm availability and delivery charges.`;

    window.open(
      `https://wa.me/${phone}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  const scrollToShop = () => {
    document.getElementById("shop")?.scrollIntoView({
      behavior: "smooth",
    });
    setMenuOpen(false);
  };

  return (
    <div className="website">
      <div className="announcement">
        ✨ FREE SHIPPING FOR ORDERS ABOVE RM150 ✨
      </div>

      <header className="header">
        <a href="#" className="logo">
          ☾ LUNA<span>SLEEPWEAR</span>
        </a>

        <button
          className="mobile-menu"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          ☰
        </button>

        <nav className={menuOpen ? "nav open" : "nav"}>
          <a href="#home" onClick={() => setMenuOpen(false)}>
            Home
          </a>
          <a href="#shop" onClick={() => setMenuOpen(false)}>
            Shop
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)}>
            About Us
          </a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>
            Contact
          </a>
        </nav>

        <button
          className="cart-button"
          onClick={() => setCartOpen(true)}
        >
          🛍️ Cart ({cartCount})
        </button>
      </header>

      <main>
        <section className="hero" id="home">
          <div className="hero-content">
            <div className="eyebrow">YOUR DREAMY SLEEP STARTS HERE</div>
            <h1>
              Sweet Dreams,
              <br />
              <em>Beautiful Nights.</em>
            </h1>
            <p>
              Wrap yourself in softness and elegance.
              Discover sleepwear made for cozy nights,
              slow mornings and beautiful dreams.
            </p>
            <button className="primary-btn" onClick={scrollToShop}>
              SHOP COLLECTION →
            </button>
            <div className="hero-note">
              ♡ Soft fabrics &nbsp; ♡ Made for comfort
            </div>
          </div>

          <div className="hero-visual">
            <img
              src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1100"
              alt="Luna fashion collection"
            />
            <div className="floating-note">
              ☾ Your comfort, our priority
            </div>
          </div>
        </section>

        <section className="benefits">
          <div>
            <span>♡</span>
            <strong>SOFT & COMFORTABLE</strong>
            <small>Gentle on your skin</small>
          </div>
          <div>
            <span>✧</span>
            <strong>PRETTY & ELEGANT</strong>
            <small>Feel beautiful every night</small>
          </div>
          <div>
            <span>☾</span>
            <strong>MADE FOR SWEET DREAMS</strong>
            <small>Relax in style</small>
          </div>
        </section>

        <section className="shop-section" id="shop">
          <div className="section-heading">
            <span className="eyebrow">HANDPICKED WITH LOVE</span>
            <h2>Our Dreamy Collection</h2>
            <p>
              Find your perfect bedtime outfit ♡
            </p>
          </div>

          <div className="shop-tools">
            <div className="categories">
              {categories.map((item) => (
                <button
                  key={item}
                  className={category === item ? "active" : ""}
                  onClick={() => setCategory(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            <input
              type="search"
              placeholder="⌕ Search sleepwear..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search products"
            />
          </div>

          <div className="product-grid">
            {filteredProducts.map((product) => (
              <article className="product-card" key={product.id}>
                <div className="product-image">
                  <img src={product.image} alt={product.name} />
                  {product.badge && (
                    <span className="product-badge">
                      {product.badge}
                    </span>
                  )}
                </div>

                <div className="product-info">
                  <span className="product-category">
                    {product.category}
                  </span>
                  <h3>{product.name}</h3>
                  <p className="product-color">
                    Colour: {product.color}
                  </p>
                  <div className="product-bottom">
                    <strong>RM {product.price.toFixed(2)}</strong>
                    <span>♡</span>
                  </div>

                  <div className="product-actions">
                    <select
                      aria-label={`Size for ${product.name}`}
                      value={sizes[product.id] || "M"}
                      onChange={(event) =>
                        setSizes({
                          ...sizes,
                          [product.id]: event.target.value,
                        })
                      }
                    >
                      <option value="S">Size S</option>
                      <option value="M">Size M</option>
                      <option value="L">Size L</option>
                      <option value="XL">Size XL</option>
                    </select>
                    <button onClick={() => addToCart(product)}>
                      ADD TO CART +
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {filteredProducts.length === 0 && (
            <p className="empty-message">
              No products found. Try another search ♡
            </p>
          )}
        </section>

        <section className="promo-section">
          <div className="promo-content">
            <span className="eyebrow">A LITTLE SELF-LOVE</span>
            <h2>
              Because Every Girl
              <br />
              Deserves Sweet Dreams.
            </h2>
            <p>
              Your nighttime routine deserves something special.
              Stay cozy, feel pretty and dream beautifully.
            </p>
            <button className="primary-btn" onClick={scrollToShop}>
              EXPLORE NOW →
            </button>
          </div>
          <div className="promo-decoration">☾ ✦</div>
        </section>

        <section className="about-section" id="about">
          <span className="eyebrow">OUR LITTLE STORY</span>
          <h2>Welcome to Luna Sleepwear ♡</h2>
          <p>
            At LUNA SLEEPWEAR, we believe bedtime should be
            the most beautiful part of your day. Our collection
            celebrates comfort, softness and effortless elegance.
            Whether you're enjoying a cozy night in or a slow
            Sunday morning, we want you to feel your best.
          </p>
          <div className="about-signature">
            Made with love, for your sweetest dreams ☾
          </div>
        </section>

        <section className="newsletter">
          <h2>Join Our Dreamy Club ♡</h2>
          <p>Follow us for new arrivals and special offers!</p>
          <a href="#contact" className="newsletter-link">
            CONNECT WITH US →
          </a>
        </section>
      </main>

      <footer className="footer" id="contact">
        <div className="footer-top">
          <div>
            <h3>☾ LUNA SLEEPWEAR</h3>
            <p>
              Soft nights, sweet dreams and
              beautiful mornings.
            </p>
          </div>
          <div>
            <h4>QUICK LINKS</h4>
            <a href="#home">Home</a>
            <a href="#shop">Shop Collection</a>
            <a href="#about">About Us</a>
          </div>
          <div>
            <h4>CONTACT US</h4>
            <p>📍 Malaysia</p>
            <p>✉️ hello@lunasleepwear.com</p>
            <p>♡ Instagram: @lunasleepwear</p>
          </div>
        </div>
        <div className="footer-bottom">
          © 2026 LUNA SLEEPWEAR. Made with ♡
        </div>
      </footer>

      {cartOpen && (
        <div
          className="cart-overlay"
          onClick={() => setCartOpen(false)}
        >
          <aside
            className="cart-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cart-header">
              <h2>Your Shopping Bag ♡</h2>
              <button onClick={() => setCartOpen(false)}>
                ✕
              </button>
            </div>

            <div className="cart-items">
              {cart.length === 0 ? (
                <div className="cart-empty">
                  <span>🛍️</span>
                  <p>Your shopping bag is empty!</p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      scrollToShop();
                    }}
                  >
                    Start Shopping
                  </button>
                </div>
              ) : (
                cart.map((item) => (
                  <div className="cart-item" key={item.key}>
                    <img src={item.image} alt={item.name} />
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <small>Size: {item.size}</small>
                      <strong>
                        RM {(item.price * item.quantity).toFixed(2)}
                      </strong>
                      <div className="quantity-control">
                        <button
                          onClick={() =>
                            changeQuantity(item.key, -1)
                          }
                        >
                          −
                        </button>
                        <span>{item.quantity}</span>
                        <button
                          onClick={() =>
                            changeQuantity(item.key, 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="cart-footer">
              <div className="cart-total">
                <span>Subtotal</span>
                <strong>RM {total.toFixed(2)}</strong>
              </div>
              <small>Shipping calculated upon confirmation.</small>
              <button
                className="checkout-btn"
                onClick={checkout}
                disabled={cart.length === 0}
              >
                CHECKOUT VIA WHATSAPP →
              </button>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}

export default App;
