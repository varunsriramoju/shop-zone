<div align="center"> 
  
 <!-- ANIMATED BANNER --> 
 <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=200&section=header&text=ShopZone&fontSize=80&fontColor=fff&animation=twinkling&fontAlignY=35&desc=Next-Gen%20Full-Stack%20E-Commerce%20Platform&descAlignY=60&descSize=18" width="100%"/> 
  
 <!-- BADGES ROW 1 --> 
 <p> 
   <img src="https://img.shields.io/badge/Java-17-ED8B00?style=for-the-badge&logo=openjdk&logoColor=white"/> 
   <img src="https://img.shields.io/badge/Spring_Boot-3.5.14-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white"/> 
   <img src="https://img.shields.io/badge/React-19.2.6-20232A?style=for-the-badge&logo=react&logoColor=61DAFB"/> 
   <img src="https://img.shields.io/badge/MySQL-8.0+-4479A1?style=for-the-badge&logo=mysql&logoColor=white"/> 
 </p> 
  
 <!-- BADGES ROW 2 --> 
 <p> 
   <img src="https://img.shields.io/badge/JWT-Auth-black?style=for-the-badge&logo=JSON%20web%20tokens"/> 
   <img src="https://img.shields.io/badge/Spring_Security-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white"/> 
   <img src="https://img.shields.io/badge/Swagger-OpenAPI-85EA2D?style=for-the-badge&logo=swagger&logoColor=black"/> 
   <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white"/> 
 </p> 
  
 <!-- ANIMATED DIVIDER --> 
 <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"> 
  
 </div> 
  
 --- 
  
 ## 🌟 What is ShopZone? 
  
 > **ShopZone** is a production-ready, full-stack e-commerce application engineered for performance, security, and elegance. Built on a **Spring Boot 3** backend with stateless **JWT authentication** and a **React 19** glassmorphic frontend — every layer of the stack has been crafted with care. 
  
 <div align="center"> 
   <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=22&pause=1000&color=7C3AED&center=true&vCenter=true&width=600&lines=Secure+JWT+Authentication+%F0%9F%94%90;Role-Based+Access+Control+%F0%9F%91%A4;Real-time+Cart+%26+Checkout+%F0%9F%9B%92;Admin+Portal+%26+Analytics+%F0%9F%93%8A;Glassmorphic+Dark+UI+%F0%9F%8C%9F" alt="Typing SVG" /> 
 </div> 
  
 --- 
  
 ## 📸 Screenshots 
  
 <br/> 
  
 ### 🏠 Hero / Landing Page 
 ![Hero Page](screenshots/hero.png) 
 > *Glassmorphic dark landing page with animated feature highlights — Ultra Fast Dispatch, Encrypted Checkouts, Signature Quality.* 
  
 --- 
  
 ### 🔐 Login & Authentication 
 ![Login Page](screenshots/login.png) 
 > *Elegant "Welcome Back" login modal with gradient sign-in button and JWT-powered session management.* 
  
 --- 
  
 ### 🛍️ Product Catalog 
 ![Shop Page](screenshots/shop.png) 
 > *Dynamic product grid with live images, pricing, and "View Details" — powered by the public `/api/products` endpoint.* 
  
 --- 
  
 ### 🛒 Your Basket 
 ![Cart Page](screenshots/cart.png) 
 > *Real-time cart with quantity controls, live subtotal, free shipping badge, and one-click checkout flow.* 
  
 --- 
  
 ### 💳 Secure Checkout 
 ![Checkout Page](screenshots/checkout.png) 
 > *Order review with shipping address input, grand total summary, and confirm order — clean and trustworthy.* 
  
 --- 
  
 ### 📦 Your Orders 
 ![Orders Page](screenshots/orders.png) 
 > *User order history with status badges (PENDING / SHIPPED / DELIVERED), timestamps, and cancel functionality.* 
  
 --- 
  
 ### 🛠️ Admin — Admin Portal 
 ![Admin Dashboard](screenshots/admin-dashboard.png) 
 > *Real-time dashboard showing active products, total orders, and gross revenue with management quicklinks.* 
  
 --- 
  
 ### 📋 Admin — Catalog Management 
 ![Catalog Management](screenshots/catalog-management.png) 
 > *Add/edit/delete products with a live Catalog Registry panel — full CRUD for the product inventory.* 
  
 --- 
  
 ### 📬 Admin — Order Management 
 ![Order Management](screenshots/order-management.png) 
 > *Admin order table with inline status dropdowns (Pending → Shipped → Delivered) and delete controls.* 
  
 --- 
  
 <div align="center"> 
 <img src="https://user-images.githubusercontent.com/73097560/115834477-dbab4500-a447-11eb-908a-139a6edaec5c.gif" width="100%"> 
 </div> 
  
 --- 
  
 ## 🏗️ Tech Stack 
  
 <div align="center"> 
  
 | Layer | Technology | Version | 
 |-------|-----------|---------| 
 | 🍃 **Backend Framework** | Spring Boot | `3.5.14` | 
 | ☕ **Language** | Java | `17` | 
 | 🔐 **Security** | Spring Security + JWT (JJWT) | Stateless | 
 | 🗄️ **Database** | MySQL | `8.0+` | 
 | 🔁 **ORM** | Spring Data JPA / Hibernate | — | 
 | 📄 **API Docs** | SpringDoc OpenAPI (Swagger UI) | — | 
 | ⚛️ **Frontend** | React | `19.2.6` | 
 | 🧭 **Routing** | React Router DOM | `6.30.3` | 
 | 🌐 **HTTP Client** | Axios (with interceptors) | — | 
 | 🎨 **Styling** | Custom CSS + Glassmorphism | — | 
 | 📦 **State** | React Context API | Auth, Cart, Toast | 
  
 </div> 
  
 --- 
  
 ## 🔐 Authentication & RBAC 
  
 ``` 
 ┌─────────────────────────────────────────────────────────────┐ 
 │                    Authentication Flow                       │ 
 ├─────────────────────────────────────────────────────────────┤ 
 │                                                             │ 
 │  Client          axiosInstance         Spring Security      │ 
 │    │                   │                      │            │ 
 │    │── POST /login ──►  │                      │            │ 
 │    │                   │── Bearer Token ──►    │            │ 
 │    │                   │                 Validates JWT      │ 
 │    │                   │◄── 200 OK ──────────  │            │ 
 │    │◄── accessToken ── │                      │            │ 
 │    │  (localStorage)   │                      │            │ 
 │                                                             │ 
 │  On every request: Authorization: Bearer <token>            │ 
 │  On 401: auto-redirect to /login                            │ 
 └─────────────────────────────────────────────────────────────┘ 
 ``` 
  
 ### 👥 Role-Based Access Control 
  
 | Role | Access Level | 
 |------|-------------| 
 | 🌐 **PUBLIC** | Browse products, categories, register/login | 
 | 👤 **USER** | Cart management, place & view orders, cancel orders | 
 | 🛡️ **ADMIN** | Full CRUD on products/categories, manage all orders, update dispatch status | 
  
 **Backend protection:** `@PreAuthorize("hasRole('ADMIN')")`   
 **Frontend protection:** `<ProtectedRoute>` and `<AdminRoute>` components 
  
 --- 
  
 ## 🗺️ API Reference 
  
 <details> 
 <summary><b>🔑 Auth Endpoints</b></summary> 
  
 | Method | Endpoint | Access | Description | 
 |--------|----------|--------|-------------| 
 | `POST` | `/api/auth/register` | Public | Create new account | 
 | `POST` | `/api/auth/login` | Public | Login & receive JWT | 
  
 </details> 
  
 <details> 
 <summary><b>📦 Product Endpoints</b></summary> 
  
 | Method | Endpoint | Access | Description | 
 |--------|----------|--------|-------------| 
 | `GET` | `/api/products` | Public | List all products | 
 | `GET` | `/api/products/{id}` | Public | Get product detail | 
 | `POST` | `/api/products` | Admin | Create new product | 
 | `PUT` | `/api/products/{id}` | Admin | Update product | 
 | `DELETE` | `/api/products/{id}` | Admin | Delete product | 
  
 </details> 
  
 <details> 
 <summary><b>🏷️ Category Endpoints</b></summary> 
  
 | Method | Endpoint | Access | Description | 
 |--------|----------|--------|-------------| 
 | `GET` | `/api/categories` | Public | List all categories | 
 | `POST` | `/api/categories` | Admin | Create category | 
 | `PUT` | `/api/categories/{id}` | Admin | Update category | 
 | `DELETE` | `/api/categories/{id}` | Admin | Delete category | 
  
 </details> 
  
 <details> 
 <summary><b>🛒 Cart Endpoints</b></summary> 
  
 | Method | Endpoint | Access | Description | 
 |--------|----------|--------|-------------| 
 | `GET` | `/api/cart` | User | Get user's cart | 
 | `POST` | `/api/cart/add` | User | Add item to cart | 
 | `PUT` | `/api/cart/items/{itemId}` | User | Update item quantity | 
 | `DELETE` | `/api/cart/clear` | User | Clear cart | 
  
 </details> 
  
 <details> 
 <summary><b>📬 Order Endpoints</b></summary> 
  
 | Method | Endpoint | Access | Description | 
 |--------|----------|--------|-------------| 
 | `POST` | `/api/orders` | User | Place new order | 
 | `GET` | `/api/orders` | User | Get my orders | 
 | `GET` | `/api/orders/all` | Admin | Get all orders | 
 | `PATCH` | `/api/orders/{id}/status` | Admin | Update dispatch status | 
  
 </details> 
  
 --- 
  
 ## 🚀 Getting Started 
  
 ### Prerequisites 
  
 - Java 17+ 
 - Node.js 18+ 
 - MySQL 8.0+ 
 - Maven 3.8+ 
  
 ### 🗄️ Database Setup 
  
 ```sql 
 CREATE DATABASE shopzone_db; 
 ``` 
  
 Update `shopzone-backend/src/main/resources/application.properties`: 
  
 ```properties 
 spring.datasource.url=jdbc:mysql://localhost:3306/shopzone_db 
 spring.datasource.username=YOUR_USERNAME 
 spring.datasource.password=YOUR_PASSWORD 
 spring.jpa.hibernate.ddl-auto=update 
 jwt.secret=YOUR_SECRET_KEY_HERE 
 ``` 
  
 ### ▶️ Run the Backend 
  
 ```bash 
 # Clone the repository 
 git clone https://github.com/varunsriramoju/shop-zone.git
 cd shop-zone/shopzone-backend 
  
 # Build & run 
 ./mvnw clean install 
 ./mvnw spring-boot:run 
 ``` 
  
 > Backend starts at `http://localhost:8080`   
 > Swagger UI available at `http://localhost:8080/swagger-ui.html` 
  
 ### ⚛️ Run the Frontend 
  
 ```bash 
 cd ../shopzone-frontend 
 npm install 
 npm run start 
 ``` 
  
 > Frontend starts at `http://localhost:3000` (via proxy to 8080) 
  
 --- 
  
 ## ✨ Key Features 
  
 <div align="center"> 
  
 | Feature | Description | 
 |---------|-------------| 
 | 🔐 **Stateless JWT Auth** | Secure login/register, tokens auto-attached via Axios interceptors | 
 | 🛡️ **RBAC** | Admin vs User roles, protected routes on both frontend and backend | 
 | 🛍️ **Dynamic Catalog** | Full product CRUD with image URLs, descriptions, stock tracking | 
 | 🛒 **Smart Cart** | Real-time stock validation, quantity controls, persistent per-user | 
 | 💳 **Checkout Flow** | Address entry, order review, grand total confirmation | 
 | 📦 **Order Tracking** | Status lifecycle: Pending → Shipped → Delivered | 
 | 🖥️ **Admin Portal** | Live KPIs — active products, order count, gross revenue | 
 | 🌟 **Glassmorphic UI** | Dark theme with CSS custom properties and blur effects | 
 | 🔔 **Toast System** | Context-based toast notifications for all user actions | 
 | ❌ **Error Handling** | Centralized `GlobalExceptionHandler` with user-friendly messages | 
  
 </div> 
  
 --- 
  
 ## 📁 Project Structure 
  
 ``` 
 product-inventory-app/ 
 ├── shopzone-backend/ 
 │   ├── src/main/java/com/shopzone/shopzone_backend/ 
 │   │   ├── config/          # Security, JWT, CORS config 
 │   │   ├── controller/      # REST controllers 
 │   │   ├── dto/             # Request/Response DTOs 
 │   │   ├── model/           # JPA entities 
 │   │   ├── exception/       # GlobalExceptionHandler 
 │   │   ├── repository/      # Spring Data repos 
 │   │   └── service/         # Business logic 
 │   └── src/main/resources/ 
 │       └── application.properties 
 │ 
 └── shopzone-frontend/ 
     └── src/ 
         ├── components/      # Reusable UI components 
         ├── context/         # Auth, Cart, Toast contexts 
         ├── pages/           # Route-level page components 
         ├── utils/           # Token and other utilities 
         └── api/             # axiosInstance + API calls 
  
 screenshots/                 # ← Place your screenshots here 
 ├── hero.png 
 ├── login.png 
 ├── shop.png 
 ├── cart.png 
 ├── checkout.png 
 ├── orders.png 
 ├── admin-dashboard.png 
 ├── catalog-management.png 
 └── order-management.png 
 ``` 
  
 --- 
  
 <div align="center"> 
  
 <img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=6,11,20&height=120&section=footer&animation=twinkling" width="100%"/> 
  
 **Built with ❤️ using Spring Boot & React** 
  
 ⭐ Star this repo if you found it useful! 
  
 </div>
