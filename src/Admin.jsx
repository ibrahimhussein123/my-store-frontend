import { useEffect, useState } from "react";

const API_URL =
  "https://my-store-backend-production-579f.up.railway.app";

function Admin() {
  const [activeTab, setActiveTab] =
    useState("dashboard");

  const [checkingAdmin, setCheckingAdmin] =
    useState(true);

  const [authorized, setAuthorized] =
    useState(false);

  const [adminUser, setAdminUser] =
    useState(null);


  const [products, setProducts] =
    useState([
      {
        id: 1,
        name: "Portfolio Pro",
        category: "Website Template",
        price: 15,
        status: "Active",
      },
      {
        id: 2,
        name: "Dashboard UI",
        category: "React Project",
        price: 20,
        status: "Active",
      },
      {
        id: 3,
        name: "Web Development Guide",
        category: "E-book",
        price: 8,
        status: "Active",
      },
      {
        id: 4,
        name: "Landing Page X",
        category: "Website Template",
        price: 12,
        status: "Active",
      },
      {
        id: 5,
        name: "Storefront",
        category: "Website Template",
        price: 18,
        status: "Active",
      },
      {
        id: 6,
        name: "React Components",
        category: "React Components",
        price: 10,
        status: "Active",
      },
    ]);


  const [showAddProduct, setShowAddProduct] =
    useState(false);


  const [newProduct, setNewProduct] =
    useState({
      name: "",
      category: "",
      price: "",
    });


  // =========================================================
  // VERIFY ADMIN WITH BACKEND
  // =========================================================

  useEffect(() => {
    const verifyAdmin = async () => {
      const token =
        localStorage.getItem("token");


      if (!token) {
        window.location.reload();
        return;
      }


      try {
        const response = await fetch(
          `${API_URL}/api/admin/test`,
          {
            headers: {
              Authorization:
                `Bearer ${token}`,
            },
          }
        );


        const data =
          await response.json();


        if (!response.ok) {
          throw new Error(
            data.message ||
              "Not authorized"
          );
        }


        if (
          data.user?.isAdmin !== true
        ) {
          throw new Error(
            "You are not an administrator."
          );
        }


        setAdminUser(
          data.user
        );

        setAuthorized(true);
      } catch (error) {
        console.error(
          "Admin verification failed:",
          error
        );

        localStorage.removeItem(
          "token"
        );

        setAuthorized(false);

        window.location.reload();
      } finally {
        setCheckingAdmin(false);
      }
    };


    verifyAdmin();
  }, []);


  // =========================================================
  // ADD PRODUCT
  // =========================================================

  const addProduct = () => {
    if (
      !newProduct.name ||
      !newProduct.category ||
      !newProduct.price
    ) {
      return;
    }


    const product = {
      id: Date.now(),
      name: newProduct.name,
      category:
        newProduct.category,
      price: Number(
        newProduct.price
      ),
      status: "Active",
    };


    setProducts((prev) => [
      ...prev,
      product,
    ]);


    setNewProduct({
      name: "",
      category: "",
      price: "",
    });


    setShowAddProduct(false);
  };


  // =========================================================
  // DELETE PRODUCT
  // =========================================================

  const deleteProduct = (id) => {
    setProducts((prev) =>
      prev.filter(
        (product) =>
          product.id !== id
      )
    );
  };


  // =========================================================
  // LOGOUT
  // =========================================================

  const logout = () => {
    localStorage.removeItem(
      "token"
    );

    window.location.reload();
  };


  // =========================================================
  // LOADING
  // =========================================================

  if (checkingAdmin) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent:
            "center",
          fontFamily:
            "Arial, sans-serif",
        }}
      >
        <h2>
          Checking administrator access...
        </h2>
      </div>
    );
  }


  // =========================================================
  // NOT AUTHORIZED
  // =========================================================

  if (!authorized) {
    return null;
  }


  const totalRevenue = 1248;
  const totalOrders = 74;
  const totalUsers = 132;


  return (
    <div className="admin-page">

      {/* ================================================= */}
      {/* SIDEBAR */}
      {/* ================================================= */}

      <aside className="admin-sidebar">

        <div className="admin-logo">

          <div className="admin-logo-icon">
            M
          </div>


          <div>
            <strong>
              MY STORE
            </strong>

            <span>
              ADMIN
            </span>
          </div>

        </div>


        <div className="admin-menu">

          <button
            className={
              activeTab ===
              "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "dashboard"
              )
            }
          >
            <span>
              ▦
            </span>

            Dashboard
          </button>


          <button
            className={
              activeTab ===
              "products"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "products"
              )
            }
          >
            <span>
              ◈
            </span>

            Products
          </button>


          <button
            className={
              activeTab ===
              "orders"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "orders"
              )
            }
          >
            <span>
              ▤
            </span>

            Orders
          </button>


          <button
            className={
              activeTab ===
              "users"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "users"
              )
            }
          >
            <span>
              ♙
            </span>

            Users
          </button>


          <button
            className={
              activeTab ===
              "settings"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveTab(
                "settings"
              )
            }
          >
            <span>
              ⚙
            </span>

            Settings
          </button>

        </div>


        <div className="admin-sidebar-bottom">

          <button
            onClick={logout}
          >
            <span>
              ↪
            </span>

            Logout
          </button>

        </div>

      </aside>


      {/* ================================================= */}
      {/* MAIN */}
      {/* ================================================= */}

      <main className="admin-main">

        {/* ================================================= */}
        {/* TOPBAR */}
        {/* ================================================= */}

        <header className="admin-topbar">

          <div>

            <p className="admin-small-label">
              STORE MANAGEMENT
            </p>


            <h1>

              {activeTab ===
                "dashboard" &&
                "Dashboard"}

              {activeTab ===
                "products" &&
                "Products"}

              {activeTab ===
                "orders" &&
                "Orders"}

              {activeTab ===
                "users" &&
                "Users"}

              {activeTab ===
                "settings" &&
                "Settings"}

            </h1>

          </div>


          <div className="admin-profile">

            <div className="admin-avatar">
              A
            </div>


            <div>

              <strong>
                {adminUser?.username ||
                  "Administrator"}
              </strong>

              <span>
                Store Admin
              </span>

            </div>

          </div>

        </header>


        {/* ================================================= */}
        {/* DASHBOARD */}
        {/* ================================================= */}

        {activeTab ===
          "dashboard" && (

          <section className="admin-content">

            <div className="admin-welcome">

              <div>

                <p>
                  WELCOME BACK
                </p>

                <h2>
                  Here's what's happening
                  with your store.
                </h2>

              </div>


              <span className="admin-date">
                August 2026
              </span>

            </div>


            {/* STATS */}

            <div className="admin-stats">

              <div className="admin-stat-card">

                <div className="stat-icon green">
                  $
                </div>

                <div>

                  <span>
                    Total Revenue
                  </span>

                  <strong>
                    $
                    {totalRevenue.toLocaleString()}
                  </strong>

                  <small>
                    +12.5% this month
                  </small>

                </div>

              </div>


              <div className="admin-stat-card">

                <div className="stat-icon orange">
                  #
                </div>

                <div>

                  <span>
                    Total Orders
                  </span>

                  <strong>
                    {totalOrders}
                  </strong>

                  <small>
                    +8.2% this month
                  </small>

                </div>

              </div>


              <div className="admin-stat-card">

                <div className="stat-icon dark">
                  ♙
                </div>

                <div>

                  <span>
                    Total Users
                  </span>

                  <strong>
                    {totalUsers}
                  </strong>

                  <small>
                    +15 new users
                  </small>

                </div>

              </div>


              <div className="admin-stat-card">

                <div className="stat-icon purple">
                  ◈
                </div>

                <div>

                  <span>
                    Products
                  </span>

                  <strong>
                    {products.length}
                  </strong>

                  <small>
                    Active products
                  </small>

                </div>

              </div>

            </div>


            {/* DASHBOARD GRID */}

            <div className="admin-dashboard-grid">

              <div className="admin-panel revenue-panel">

                <div className="admin-panel-header">

                  <div>

                    <span>
                      OVERVIEW
                    </span>

                    <h3>
                      Revenue
                    </h3>

                  </div>


                  <select>
                    <option>
                      Last 7 months
                    </option>

                    <option>
                      Last 30 days
                    </option>

                    <option>
                      This year
                    </option>
                  </select>

                </div>


                <div className="fake-chart">

                  <div className="chart-y">

                    <span>
                      $2k
                    </span>

                    <span>
                      $1.5k
                    </span>

                    <span>
                      $1k
                    </span>

                    <span>
                      $500
                    </span>

                    <span>
                      $0
                    </span>

                  </div>


                  <div className="chart-area">

                    <div className="chart-line"></div>

                    <div className="chart-point point-1"></div>
                    <div className="chart-point point-2"></div>
                    <div className="chart-point point-3"></div>
                    <div className="chart-point point-4"></div>
                    <div className="chart-point point-5"></div>
                    <div className="chart-point point-6"></div>

                  </div>

                </div>

              </div>


              <div className="admin-panel">

                <div className="admin-panel-header">

                  <div>

                    <span>
                      QUICK ACTIONS
                    </span>

                    <h3>
                      Manage Store
                    </h3>

                  </div>

                </div>


                <div className="quick-actions">

                  <button
                    onClick={() => {
                      setActiveTab(
                        "products"
                      );

                      setShowAddProduct(
                        true
                      );
                    }}
                  >
                    <span>
                      ＋
                    </span>

                    <div>

                      <strong>
                        Add Product
                      </strong>

                      <small>
                        Create a new product
                      </small>

                    </div>

                  </button>


                  <button
                    onClick={() =>
                      setActiveTab(
                        "orders"
                      )
                    }
                  >
                    <span>
                      ▤
                    </span>

                    <div>

                      <strong>
                        View Orders
                      </strong>

                      <small>
                        Manage customer orders
                      </small>

                    </div>

                  </button>


                  <button
                    onClick={() =>
                      setActiveTab(
                        "users"
                      )
                    }
                  >
                    <span>
                      ♙
                    </span>

                    <div>

                      <strong>
                        View Users
                      </strong>

                      <small>
                        Manage customers
                      </small>

                    </div>

                  </button>

                </div>

              </div>

            </div>


            {/* RECENT PRODUCTS */}

            <div className="admin-panel recent-products">

              <div className="admin-panel-header">

                <div>

                  <span>
                    STORE
                  </span>

                  <h3>
                    Recent Products
                  </h3>

                </div>


                <button
                  className="admin-view-all"
                  onClick={() =>
                    setActiveTab(
                      "products"
                    )
                  }
                >
                  View all →
                </button>

              </div>


              <div className="admin-table">

                <div className="admin-table-head">

                  <span>
                    PRODUCT
                  </span>

                  <span>
                    CATEGORY
                  </span>

                  <span>
                    PRICE
                  </span>

                  <span>
                    STATUS
                  </span>

                </div>


                {products
                  .slice(0, 5)
                  .map(
                    (product) => (

                      <div
                        className="admin-table-row"
                        key={
                          product.id
                        }
                      >

                        <div className="admin-product-name">

                          <div className="admin-product-icon">
                            {product.name.charAt(
                              0
                            )}
                          </div>

                          <strong>
                            {product.name}
                          </strong>

                        </div>


                        <span>
                          {
                            product.category
                          }
                        </span>


                        <strong>
                          $
                          {
                            product.price
                          }
                        </strong>


                        <span className="status-active">
                          Active
                        </span>

                      </div>

                    )
                  )}

              </div>

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* PRODUCTS */}
        {/* ================================================= */}

        {activeTab ===
          "products" && (

          <section className="admin-content">

            <div className="admin-section-top">

              <div>

                <p className="admin-small-label">
                  STORE
                </p>

                <h2>
                  Product Management
                </h2>

                <p>
                  Add, edit and manage your digital products.
                </p>

              </div>


              <button
                className="admin-add-button"
                onClick={() =>
                  setShowAddProduct(
                    true
                  )
                }
              >
                + Add Product
              </button>

            </div>


            {showAddProduct && (

              <div className="admin-add-product">

                <div className="admin-add-header">

                  <div>

                    <span>
                      NEW PRODUCT
                    </span>

                    <h3>
                      Add a product
                    </h3>

                  </div>


                  <button
                    onClick={() =>
                      setShowAddProduct(
                        false
                      )
                    }
                  >
                    ✕
                  </button>

                </div>


                <div className="admin-form-grid">

                  <div className="admin-form-group">

                    <label>
                      Product Name
                    </label>

                    <input
                      type="text"
                      placeholder="Portfolio Pro"
                      value={
                        newProduct.name
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          name: e.target.value,
                        })
                      }
                    />

                  </div>


                  <div className="admin-form-group">

                    <label>
                      Category
                    </label>

                    <select
                      value={
                        newProduct.category
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          category:
                            e.target.value,
                        })
                      }
                    >

                      <option value="">
                        Select category
                      </option>

                      <option>
                        Website Template
                      </option>

                      <option>
                        React Project
                      </option>

                      <option>
                        E-book
                      </option>

                      <option>
                        React Components
                      </option>

                    </select>

                  </div>


                  <div className="admin-form-group">

                    <label>
                      Price
                    </label>

                    <input
                      type="number"
                      placeholder="15"
                      value={
                        newProduct.price
                      }
                      onChange={(e) =>
                        setNewProduct({
                          ...newProduct,
                          price: e.target.value,
                        })
                      }
                    />

                  </div>

                </div>


                <button
                  className="admin-save-button"
                  onClick={
                    addProduct
                  }
                >
                  Add Product
                </button>

              </div>

            )}


            <div className="admin-panel">

              <div className="admin-panel-header">

                <div>

                  <span>
                    {
                      products.length
                    }{" "}
                    PRODUCTS
                  </span>

                  <h3>
                    All Products
                  </h3>

                </div>

              </div>


              <div className="admin-table">

                <div className="admin-table-head">

                  <span>
                    PRODUCT
                  </span>

                  <span>
                    CATEGORY
                  </span>

                  <span>
                    PRICE
                  </span>

                  <span>
                    STATUS
                  </span>

                  <span>
                    ACTION
                  </span>

                </div>


                {products.map(
                  (product) => (

                    <div
                      className="admin-table-row"
                      key={
                        product.id
                      }
                    >

                      <div className="admin-product-name">

                        <div className="admin-product-icon">
                          {product.name.charAt(
                            0
                          )}
                        </div>

                        <strong>
                          {product.name}
                        </strong>

                      </div>


                      <span>
                        {
                          product.category
                        }
                      </span>


                      <strong>
                        $
                        {
                          product.price
                        }
                      </strong>


                      <span className="status-active">
                        {
                          product.status
                        }
                      </span>


                      <button
                        className="delete-product"
                        onClick={() =>
                          deleteProduct(
                            product.id
                          )
                        }
                      >
                        Delete
                      </button>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* ORDERS */}
        {/* ================================================= */}

        {activeTab ===
          "orders" && (

          <section className="admin-content">

            <div className="admin-section-top">

              <div>

                <p className="admin-small-label">
                  SALES
                </p>

                <h2>
                  Orders
                </h2>

                <p>
                  Track and manage customer purchases.
                </p>

              </div>

            </div>


            <div className="admin-panel">

              <div className="admin-table">

                <div className="admin-table-head">

                  <span>
                    ORDER
                  </span>

                  <span>
                    CUSTOMER
                  </span>

                  <span>
                    PRODUCT
                  </span>

                  <span>
                    TOTAL
                  </span>

                  <span>
                    STATUS
                  </span>

                </div>


                {[
                  [
                    "#1001",
                    "Ahmed",
                    "Portfolio Pro",
                    "$15",
                    "Completed",
                  ],
                  [
                    "#1002",
                    "Omar",
                    "Dashboard UI",
                    "$20",
                    "Completed",
                  ],
                  [
                    "#1003",
                    "Youssef",
                    "Storefront",
                    "$18",
                    "Pending",
                  ],
                  [
                    "#1004",
                    "Mohamed",
                    "React Components",
                    "$10",
                    "Completed",
                  ],
                  [
                    "#1005",
                    "Ali",
                    "Landing Page X",
                    "$12",
                    "Pending",
                  ],
                ].map(
                  (order) => (

                    <div
                      className="admin-table-row"
                      key={
                        order[0]
                      }
                    >

                      <strong>
                        {order[0]}
                      </strong>

                      <span>
                        {order[1]}
                      </span>

                      <span>
                        {order[2]}
                      </span>

                      <strong>
                        {order[3]}
                      </strong>

                      <span
                        className={
                          order[4] ===
                          "Completed"
                            ? "status-active"
                            : "status-pending"
                        }
                      >
                        {order[4]}
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* USERS */}
        {/* ================================================= */}

        {activeTab ===
          "users" && (

          <section className="admin-content">

            <div className="admin-section-top">

              <div>

                <p className="admin-small-label">
                  CUSTOMERS
                </p>

                <h2>
                  Users
                </h2>

                <p>
                  View the people using your store.
                </p>

              </div>

            </div>


            <div className="admin-panel">

              <div className="admin-table">

                <div className="admin-table-head">

                  <span>
                    USER
                  </span>

                  <span>
                    EMAIL
                  </span>

                  <span>
                    ORDERS
                  </span>

                  <span>
                    SPENT
                  </span>

                  <span>
                    STATUS
                  </span>

                </div>


                {[
                  [
                    "Ahmed Hassan",
                    "ahmed@email.com",
                    4,
                    "$67",
                  ],
                  [
                    "Omar Ali",
                    "omar@email.com",
                    2,
                    "$35",
                  ],
                  [
                    "Youssef Mohamed",
                    "youssef@email.com",
                    6,
                    "$92",
                  ],
                  [
                    "Mohamed Salah",
                    "mohamed@email.com",
                    1,
                    "$10",
                  ],
                  [
                    "Ali Hassan",
                    "ali@email.com",
                    3,
                    "$42",
                  ],
                ].map(
                  (user) => (

                    <div
                      className="admin-table-row"
                      key={
                        user[1]
                      }
                    >

                      <div className="admin-product-name">

                        <div className="admin-product-icon">
                          {user[0].charAt(
                            0
                          )}
                        </div>

                        <strong>
                          {user[0]}
                        </strong>

                      </div>


                      <span>
                        {user[1]}
                      </span>


                      <span>
                        {user[2]}
                      </span>


                      <strong>
                        {user[3]}
                      </strong>


                      <span className="status-active">
                        Active
                      </span>

                    </div>

                  )
                )}

              </div>

            </div>

          </section>

        )}


        {/* ================================================= */}
        {/* SETTINGS */}
        {/* ================================================= */}

        {activeTab ===
          "settings" && (

          <section className="admin-content">

            <div className="admin-section-top">

              <div>

                <p className="admin-small-label">
                  CONFIGURATION
                </p>

                <h2>
                  Store Settings
                </h2>

                <p>
                  Manage your store configuration.
                </p>

              </div>

            </div>


            <div className="admin-panel settings-panel">

              <div className="settings-row">

                <div>

                  <strong>
                    Store Name
                  </strong>

                  <span>
                    The name displayed across your store.
                  </span>

                </div>


                <input
                  defaultValue="MY STORE"
                />

              </div>


              <div className="settings-row">

                <div>

                  <strong>
                    Currency
                  </strong>

                  <span>
                    Default currency used for products.
                  </span>

                </div>


                <select defaultValue="USD">

                  <option>
                    USD
                  </option>

                  <option>
                    EGP
                  </option>

                  <option>
                    CAD
                  </option>

                </select>

              </div>


              <div className="settings-row">

                <div>

                  <strong>
                    Store Status
                  </strong>

                  <span>
                    Make your store available to customers.
                  </span>

                </div>


                <span className="status-active">
                  Online
                </span>

              </div>


              <button className="admin-save-button">
                Save Changes
              </button>

            </div>

          </section>

        )}

      </main>

    </div>
  );
}

export default Admin;