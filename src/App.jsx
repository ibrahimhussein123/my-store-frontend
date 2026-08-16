import { useState, useEffect } from "react";
import "./App.css";
import PortfolioPro from "./PortfolioPro";
const API_URL = "https://my-store-backend-production-579f.up.railway.app";


function App() {
  const [page, setPage] = useState("signup");
  const [loggedIn, setLoggedIn] = useState(false);
  const [authChecking, setAuthChecking] = useState(true);
const [username, setUsername] = useState("");
const [password, setPassword] = useState("");
const [email, setEmail] = useState("");
const [confirmEmail, setConfirmEmail] = useState("");
const [loginIdentifier, setLoginIdentifier] = useState("");
const [loginPassword, setLoginPassword] = useState("");
const [loginMessage, setLoginMessage] = useState("");
const [loginLoading, setLoginLoading] = useState(false);

const [signupMessage, setSignupMessage] = useState("");
const [signupLoading, setSignupLoading] = useState(false);
  // Product window
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFullscreen, setIsFullscreen] = useState(false);
const [cart, setCart] = useState([]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutMessage, setCheckoutMessage] = useState("");
  // =========================================================
  // PRODUCTS
  // =========================================================

  const products = [
    {
      id: "portfolio",
      type: "WEBSITE TEMPLATE",
      title: "Portfolio Pro",
      price: "$15",
      description:
        "A modern responsive portfolio template designed for developers, designers and creators.",
      preview: "PORTFOLIO",
      category: "Website",
    },

    {
      id: "dashboard",
      type: "REACT PROJECT",
      title: "Dashboard UI",
      price: "$20",
      description:
        "A clean and powerful React dashboard ready for your next project.",
      preview: "REACT",
      category: "React",
    },

    {
      id: "ebook",
      type: "E-BOOK",
      title: "Web Development Guide",
      price: "$8",
      description:
        "A practical guide covering the fundamentals of modern web development.",
      preview: "E-BOOK",
      category: "E-book",
    },

    {
      id: "landing",
      type: "WEBSITE TEMPLATE",
      title: "Landing Page X",
      price: "$12",
      description:
        "A stylish landing page template for products, startups and businesses.",
      preview: "LANDING",
      category: "Website",
    },

    {
      id: "shop",
      type: "WEBSITE TEMPLATE",
      title: "Storefront",
      price: "$18",
      description:
        "A modern digital storefront template for selling products online.",
      preview: "STORE",
      category: "Website",
    },

    {
      id: "components",
      type: "REACT COMPONENTS",
      title: "React Components",
      price: "$10",
      description:
        "A collection of reusable React components for your next project.",
      preview: "REACT",
      category: "React",
    },
  ];
const handleSignup = async () => {
  setSignupMessage("");

  if (!username || !email || !password || !confirmEmail) {
    setSignupMessage("Please fill in all fields.");
    return;
  }

  if (email !== confirmEmail) {
    setSignupMessage("Emails do not match.");
    return;
  }

  if (password.length < 6) {
    setSignupMessage("Password must be at least 6 characters.");
    return;
  }

  try {
    setSignupLoading(true);

    const response = await fetch(
  `${API_URL}/api/signup`,
  {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      email,
      password,
    }),
  }
);

    const data = await response.json();

    if (!response.ok) {
      setSignupMessage(data.message || "Signup failed.");
      return;
    }

    setSignupMessage("Account created successfully!");

    // Clear the form
    setUsername("");
    setPassword("");
    setEmail("");
    setConfirmEmail("");

    // Move to Sign In after a short delay
    setTimeout(() => {
      setSignupMessage("");
      setPage("signin");
    }, 1200);

  } catch (error) {
    console.error(error);

    setSignupMessage(
      "Could not connect to the server."
    );
  } finally {
    setSignupLoading(false);
  }
};

const handleLogin = async () => {
  setLoginMessage("");

  if (!loginIdentifier || !loginPassword) {
    setLoginMessage("Please fill in all fields.");
    return;
  }

  try {
    setLoginLoading(true);

    const response = await fetch(`${API_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        identifier: loginIdentifier,
        password: loginPassword,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      setLoginMessage(data.message || "Login failed.");
      return;
    }

      // Credentials verified by the backend — now log in
    localStorage.setItem("token", data.token);

    setLoggedIn(true);
    setLoginIdentifier("");
    setLoginPassword("");
    setLoginMessage("");

  } catch (error) {
    console.error(error);
    setLoginMessage("Could not connect to the server.");
  } finally {
    setLoginLoading(false);
  }
};
const handleLogout = () => {
  localStorage.removeItem("token");
  setLoggedIn(false);
  setPage("signin");
};
  // =========================================================
  // OPEN PRODUCT
  // =========================================================

  const openProduct = (product) => {
    setSelectedProduct(product);
    setIsFullscreen(false);
  };

  // =========================================================
  // CLOSE PRODUCT
  // =========================================================

  const closeProduct = () => {
    setSelectedProduct(null);
    setIsFullscreen(false);
  };
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);

      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, delta) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const handleBuyNow = (product) => {
    addToCart(product);
    setCartOpen(true);
  };

  const handleCheckout = () => {
    setCheckoutMessage(
      "Order placed! (Demo store — no real payment was processed.)"
    );

    setCart([]);

    setTimeout(() => {
      setCheckoutMessage("");
      setCartOpen(false);
    }, 2500);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + parseFloat(item.price.replace("$", "")) * item.quantity,
    0
  );

  // =========================================================
  // SCROLL ANIMATION
  // =========================================================

  useEffect(() => {
    if (!loggedIn || selectedProduct) return;

    const elements = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.15,
      }
    );

    elements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, [loggedIn, selectedProduct]);


  useEffect(() => {
  const token = localStorage.getItem("token");

  if (!token) {
    setAuthChecking(false);
    return;
  }

 fetch(`${API_URL}/api/me`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((res) => {
      if (!res.ok) throw new Error("Invalid token");
      return res.json();
    })
    .then(() => {
      setLoggedIn(true);
    })
    .catch(() => {
      localStorage.removeItem("token");
    })
    .finally(() => {
      setAuthChecking(false);
    });
}, []);
  // =========================================================
  // PREVENT BACKGROUND SCROLL
  // =========================================================

  useEffect(() => {
    if (selectedProduct) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedProduct]);

  // =========================================================
  // ESCAPE KEY
  // =========================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (isFullscreen) {
          setIsFullscreen(false);
        } else if (selectedProduct) {
          closeProduct();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedProduct, isFullscreen]);

  // =========================================================
  // APP
  // =========================================================
if (authChecking) {
  return (
    <div
      className="page"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <p style={{ color: "#777" }}>Loading...</p>
    </div>
  );
}
  return (
    <div className="page">

      {/* ===================================================== */}
      {/* ==================== AUTHENTICATION ================= */}
      {/* ===================================================== */}

      {!loggedIn ? (
        <>
          <div className="circle circle-one"></div>
          <div className="circle circle-two"></div>

          <div className="stars">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
          </div>

          {/* ================================================= */}
          {/* ======================= SIGN UP ================= */}
          {/* ================================================= */}

          {page === "signup" ? (
            <div className="signup-card">

              <div className="user-icon">
                <span>♙</span>
              </div>

              <h1>Sign Up</h1>

              <p className="subtitle">
                Create your account to get started
              </p>

              <div className="input-box">
                <div className="input-icon">♙</div>

               <input
  type="text"
  placeholder="Username"
  value={username}
  onChange={(e) => setUsername(e.target.value)}
/>
              </div>

              <div className="input-box">
                <div className="input-icon">🔒</div>

                <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

                <span className="eye">
                  ◉
                </span>
              </div>

              <div className="input-box">
                <div className="input-icon">✉</div>

               <input
  type="email"
  placeholder="Email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>
              </div>

              <div className="input-box">
                <div className="input-icon">✉</div>

               <input
  type="email"
  placeholder="Confirm Email"
  value={confirmEmail}
  onChange={(e) => setConfirmEmail(e.target.value)}
/>
              </div>

             <button
  className="signup-button"
  onClick={handleSignup}
  disabled={signupLoading}
>
  {signupLoading ? "Creating Account..." : "Sign Up"}
</button>
{signupMessage && (
  <p
    style={{
      marginTop: "15px",
      color: signupMessage.includes("successfully")
        ? "#075c3a"
        : "#d64545",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    {signupMessage}
  </p>
)}

              <p className="login-text">
                Already have an account?{" "}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("signin");
                  }}
                >
                  Log in
                </a>
              </p>

            </div>
          ) : (

            /* ================================================= */
            /* ======================= SIGN IN ================= */
            /* ================================================= */

            <div className="signin-card">

              <div className="user-icon">
                <span>♙</span>
              </div>

              <h1>Sign In</h1>

              <p className="subtitle">
                Welcome back! Please sign in to continue
              </p>

              <div className="input-box">

                <div className="input-icon">
                  ♙
                </div>

                <input
  type="text"
  placeholder="Username or Email"
  value={loginIdentifier}
  onChange={(e) => setLoginIdentifier(e.target.value)}
/>

              </div>

              <div className="input-box">

                <div className="input-icon">
                  🔒
                </div>

              <input
  type="password"
  placeholder="Password"
  value={loginPassword}
  onChange={(e) => setLoginPassword(e.target.value)}
/>

                <span className="eye">
                  ◉
                </span>

              </div>

              <div className="forgot">

                <a href="#">
                  Forgot password?
                </a>

              </div>

              <button
  className="signup-button"
  onClick={handleLogin}
  disabled={loginLoading}
>
  {loginLoading ? "Signing In..." : "Sign In"}
</button>
{loginMessage && (
  <p
    style={{
      marginTop: "15px",
      color: "#d64545",
      fontSize: "14px",
      fontWeight: "bold",
    }}
  >
    {loginMessage}
  </p>
)}

              <p className="login-text">

                Don't have an account?{" "}

                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setPage("signup");
                  }}
                >
                  Sign Up
                </a>

              </p>

            </div>
          )}
        </>

      ) : (

        /* ===================================================== */
        /* ======================== STORE ===================== */
        /* ===================================================== */

        <div className="store-page">

          {/* ================================================= */}
          {/* ======================= NAVBAR ================== */}
          {/* ================================================= */}

          <nav className="navbar">

            <div className="store-name">
              <img src="/logo.jpg"></img>
            </div>

            <div className="nav-links">

              <a
                href="#home"
                className="active"
              >
                Home
              </a>

              <a href="#templates">
                Templates
              </a>

              <a href="#ebooks">
                E-books
              </a>

              <a href="#projects">
                Projects
              </a>

              <a href="#freebies">
                Freebies
              </a>

            </div>

            <div className="nav-actions">

              <button className="search-btn">
                🔍
              </button>

            <button
                className="cart-btn"
                onClick={() => setCartOpen(true)}
              >

                🛒

                <span className="cart-count">
                  {cartCount}
                </span>

              </button>

              <button
  className="profile-btn"
  onClick={handleLogout}
>
  👤
</button>

            </div>

          </nav>

          {/* ================================================= */}
          {/* ======================== HERO =================== */}
          {/* ================================================= */}

          <section
            className="hero"
            id="home"
          >

            <div className="hero-content">

              <p className="hero-small">
                DIGITAL CREATIONS
              </p>

              <h1>
                Build.
                <br />
                Create.
                <br />
                <span>Launch.</span>
              </h1>

              <p className="hero-description">
                Ready-to-use websites, templates,
                projects and digital resources
                made for creators.
              </p>

              <div className="hero-buttons">

                <button
                  className="explore-button"
                  onClick={() =>
                    document
                      .getElementById("projects")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  Explore Products
                </button>

                <button
                  className="template-button"
                  onClick={() =>
                    document
                      .getElementById("templates")
                      ?.scrollIntoView({
                        behavior: "smooth",
                      })
                  }
                >
                  View Templates →
                </button>

              </div>

            </div>

            <div className="hero-image">

              <img
                src="/hero.png"
                alt="Creative workspace"
              />

            </div>

          </section>

          {/* ================================================= */}
          {/* ===================== CATEGORIES ================ */}
          {/* ================================================= */}

          <section
            className="categories reveal"
            id="templates"
          >

            <p className="section-label">
              EXPLORE
            </p>

            <h2>
              What are you looking for?
            </h2>

            <div className="category-grid">

              <div className="category-card">

                <span>
                  💻
                </span>

                <h3>
                  Web Templates
                </h3>

                <p>
                  Modern websites ready to customize.
                </p>

              </div>

              <div className="category-card">

                <span>
                  ⚛️
                </span>

                <h3>
                  React Projects
                </h3>

                <p>
                  Ready-to-use React projects
                  and components.
                </p>

              </div>

              <div
                className="category-card"
                id="ebooks"
              >

                <span>
                  📚
                </span>

                <h3>
                  E-books
                </h3>

                <p>
                  Guides, resources and digital books.
                </p>

              </div>

              <div
                className="category-card"
                id="freebies"
              >

                <span>
                  🎁
                </span>

                <h3>
                  Freebies
                </h3>

                <p>
                  Useful digital products completely free.
                </p>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* ================= FEATURED PRODUCTS ============= */}
          {/* ================================================= */}

          <section
            className="featured reveal"
            id="projects"
          >

            <div className="section-heading">

              <div>

                <p className="section-label">
                  HAND PICKED
                </p>

                <h2>
                  Featured Products
                </h2>

              </div>

              <a href="#">
                View all →
              </a>

            </div>

            <div className="product-grid">

              {/* ================= PORTFOLIO ================= */}

              <div className="product-card">

                <div className="product-preview">
                  WEBSITE
                </div>

                <div className="product-info">

                  <p className="product-type">
                    WEBSITE TEMPLATE
                  </p>

                  <h3>
                    Portfolio Pro
                  </h3>

                  <p>
                    A modern responsive portfolio
                    template for developers.
                  </p>

                  <div className="product-bottom">

                    <strong>
                      $15
                    </strong>

                    <button
                      onClick={() =>
                        openProduct(products[0])
                      }
                    >
                      View →
                    </button>

                  </div>

                </div>

              </div>

              {/* ================= DASHBOARD ================= */}

              <div className="product-card">

                <div className="product-preview preview-two">
                  REACT
                </div>

                <div className="product-info">

                  <p className="product-type">
                    REACT PROJECT
                  </p>

                  <h3>
                    Dashboard UI
                  </h3>

                  <p>
                    Clean and powerful dashboard
                    ready for your next project.
                  </p>

                  <div className="product-bottom">

                    <strong>
                      $20
                    </strong>

                    <button
                      onClick={() =>
                        openProduct(products[1])
                      }
                    >
                      View →
                    </button>

                  </div>

                </div>

              </div>

              {/* ================= EBOOK ================= */}

              <div className="product-card">

                <div className="product-preview preview-three">
                  E-BOOK
                </div>

                <div className="product-info">

                  <p className="product-type">
                    E-BOOK
                  </p>

                  <h3>
                    Web Development Guide
                  </h3>

                  <p>
                    A practical guide to building
                    modern websites.
                  </p>

                  <div className="product-bottom">

                    <strong>
                      $8
                    </strong>

                    <button
                      onClick={() =>
                        openProduct(products[2])
                      }
                    >
                      View →
                    </button>

                  </div>

                </div>

              </div>

            </div>

          </section>

          {/* ================================================= */}
          {/* ======================= FOOTER ================== */}
          {/* ================================================= */}

          <footer className="store-footer reveal">

            <h2>
              Create something great.
            </h2>

            <p>
              Digital products made for creators.
            </p>

          </footer>

          {/* ================================================= */}
          {/* ================= PRODUCT OVERLAY =============== */}
          {/* ================================================= */}

          {selectedProduct && (

            <div
              className={`product-overlay ${
                isFullscreen
                  ? "overlay-fullscreen"
                  : ""
              }`}
              onClick={(e) => {

                if (
                  e.target.classList.contains(
                    "product-overlay"
                  )
                ) {
                  closeProduct();
                }

              }}
            >

              {/* ================================================= */}
              {/* ================= PRODUCT WINDOW ================ */}
              {/* ================================================= */}

              <div
                className={`product-window ${
                  isFullscreen
                    ? "product-window-fullscreen"
                    : ""
                }`}
              >

                {/* ================================================= */}
                {/* ===================== TOP BAR =================== */}
                {/* ================================================= */}

                <div className="product-window-bar">

                  <div className="window-dots">

                    <span className="dot red"></span>

                    <span className="dot yellow"></span>

                    <span className="dot green"></span>

                  </div>

                  <div className="window-title">

                    {selectedProduct.title}

                  </div>

                  {/* ================= WINDOW CONTROLS ================= */}

                  <div className="window-controls">

                    <button
                      className="fullscreen-product"
                      onClick={() =>
                        setIsFullscreen(
                          !isFullscreen
                        )
                      }
                      title={
                        isFullscreen
                          ? "Exit fullscreen"
                          : "Fullscreen"
                      }
                    >
                      {isFullscreen
                        ? "↙"
                        : "↗"}
                    </button>
                    <button
                      className="close-product"
                      onClick={closeProduct}
                      title="Close"
                    >
                      ✕
                    </button>

                  </div>

                </div>

                {/* ================================================= */}
                {/* ================ PORTFOLIO PRO ================== */}
                {/* ================================================= */}

                {selectedProduct.id === "portfolio" ? (

                  <div className="portfolio-product-page">

                    <PortfolioPro />

                  </div>

                ) : (

                  /* ================================================= */
                  /* ============== OTHER PRODUCTS ================== */
                  /* ================================================= */

                  <>

                    <div className="product-detail">

                      <div className="product-detail-preview">

                        <div className="fake-browser">

                          <div className="fake-browser-bar">

                            <span></span>
                            <span></span>
                            <span></span>

                          </div>

                          <div className="fake-browser-content">

                            <div className="fake-title">

                              {selectedProduct.preview}

                            </div>

                            <div className="fake-lines">

                              <div></div>
                              <div></div>
                              <div></div>

                            </div>

                            <div className="fake-button">
                              EXPLORE
                            </div>

                          </div>

                        </div>

                      </div>

                      <div className="product-detail-info">

                        <p className="product-type">

                          {selectedProduct.type}

                        </p>

                        <h1>

                          {selectedProduct.title}

                        </h1>

                        <p className="detail-description">

                          {selectedProduct.description}

                        </p>

                        <div className="detail-price">

                          {selectedProduct.price}

                        </div>

                       <div className="detail-actions">

                          <button
                            className="buy-button"
                            onClick={() => handleBuyNow(selectedProduct)}
                          >
                            Buy Now
                          </button>

                          <button
                            className="add-cart-button"
                            onClick={() => addToCart(selectedProduct)}
                          >
                            🛒 Add to Cart
                          </button>

                        </div>

                        <div className="product-features">

                          <div>
                            <strong>✓</strong>
                            Instant access
                          </div>

                          <div>
                            <strong>✓</strong>
                            Fully responsive
                          </div>

                          <div>
                            <strong>✓</strong>
                            Easy to customize
                          </div>

                          <div>
                            <strong>✓</strong>
                            Modern design
                          </div>

                        </div>

                      </div>

                    </div>

                    {/* ================================================= */}
                    {/* ================= MORE PRODUCTS ================= */}
                    {/* ================================================= */}

                    <div className="more-products">

                      <div className="more-products-heading">

                        <div>

                          <p className="section-label">
                            KEEP EXPLORING
                          </p>

                          <h2>
                            More templates
                          </h2>

                        </div>

                        <span>
                          {products.length} products
                        </span>

                      </div>

                      <div className="mini-product-grid">

                        {products.map((product) => (

                          <div
                            className={`mini-product ${
                              product.id ===
                              selectedProduct.id
                                ? "selected"
                                : ""
                            }`}
                            key={product.id}
                            onClick={() =>
                              openProduct(product)
                            }
                          >

                            <div className="mini-preview">

                              {product.preview}

                            </div>

                            <div className="mini-info">

                              <p>
                                {product.type}
                              </p>

                              <h3>
                                {product.title}
                              </h3>

                              <strong>
                                {product.price}
                              </strong>

                            </div>

                          </div>

                        ))}

                      </div>

                    </div>

                  </>

                )}

              </div>

            </div>

          )}

{/* ================= CART PANEL ================= */}

          {cartOpen && (

            <div
              className="cart-overlay"
              onClick={(e) => {
                if (e.target.classList.contains("cart-overlay")) {
                  setCartOpen(false);
                }
              }}
            >

              <div className="cart-panel">

                <div className="cart-header">

                  <h2>Your Cart</h2>

                  <button
                    className="cart-close"
                    onClick={() => setCartOpen(false)}
                  >
                    ✕
                  </button>

                </div>

                {checkoutMessage ? (

                  <div className="cart-success">
                    <p>{checkoutMessage}</p>
                  </div>

                ) : cart.length === 0 ? (

                  <div className="cart-empty">
                    <p>Your cart is empty.</p>
                  </div>

                ) : (

                  <>

                    <div className="cart-items">

                      {cart.map((item) => (

                        <div className="cart-item" key={item.id}>

                          <div className="cart-item-preview">
                            {item.preview}
                          </div>

                          <div className="cart-item-info">

                            <h4>{item.title}</h4>

                            <p>{item.type}</p>

                            <div className="cart-item-qty">

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, -1)
                                }
                              >
                                −
                              </button>

                              <span>{item.quantity}</span>

                              <button
                                onClick={() =>
                                  updateQuantity(item.id, 1)
                                }
                              >
                                +
                              </button>

                            </div>

                          </div>

                          <div className="cart-item-right">

                            <strong>{item.price}</strong>

                            <button
                              className="cart-item-remove"
                              onClick={() => removeFromCart(item.id)}
                            >
                              Remove
                            </button>

                          </div>

                        </div>

                      ))}

                    </div>

                    <div className="cart-footer">

                      <div className="cart-total">
                        <span>Total</span>
                        <strong>${cartTotal.toFixed(2)}</strong>
                      </div>

                      <button
                        className="cart-checkout"
                        onClick={handleCheckout}
                      >
                        Checkout
                      </button>

                    </div>

                  </>

                )}

              </div>

            </div>

          )}
        </div>
      )}

    </div>
  );
}

export default App;