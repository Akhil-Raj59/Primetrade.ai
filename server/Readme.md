# 🔧 Nexora Backend - API Server

Express.js REST API with MongoDB for e-commerce cart operations.

## 🚀 Quick Setup
```bash
cd server
npm install
cp .env.example .env  # Add your credentials
npm run dev           # Starts on port 8000
```

## 📡 API Endpoints

### **Base URL**: `http://localhost:8000`

### Authentication (Bonus)
```
POST   /api/v1/users/register    - Register user (multipart/form-data)
POST   /api/v1/users/login        - Login user
POST   /api/v1/users/logout       - Logout user (Protected)
POST   /api/v1/users/refresh-token - Refresh access token
```

### Products
```
GET    /api/products              - Get all products (10 items)
```

### Cart (Protected)
```
POST   /api/cart                  - Add item {productId, qty}
GET    /api/cart                  - Get cart with total
DELETE /api/cart/:productId       - Remove item
DELETE /api/cart/clear            - Clear entire cart
```

### Checkout (Protected)
```
POST   /api/checkout              - Process order {name, email, cartItems?}
                                   Returns: {orderId, items, total, timestamp}
```

## 🔐 Authentication

Protected routes require JWT token:
```javascript
Headers: {
  "Authorization": "Bearer <access_token>"
}
```

## 📦 Dependencies
```json
{
  "express": "^4.18.0",
  "mongoose": "^8.0.0",
  "jsonwebtoken": "^9.0.0",
  "bcrypt": "^5.1.0",
  "multer": "^1.4.5",
  "cloudinary": "^1.40.0",
  "cookie-parser": "^1.4.6",
  "cors": "^2.8.5",
  "dotenv": "^16.0.0"
}
```

## 🗂️ Folder Structure
```
server/
├── src/
│   ├── controllers/    # Request handlers
│   ├── models/         # MongoDB schemas
│   ├── routes/         # API routes
│   ├── middlewares/    # Auth & multer
│   ├── utils/          # Helper functions
│   ├── db/             # Database connection
│   ├── app.js          # Express app
│   └── index.js        # Entry point
├── public/temp/        # Temporary uploads
├── .env.example
└── package.json
```

## 🔥 Key Features

- **JWT Authentication** with access & refresh tokens
- **File Upload** to Cloudinary for avatars
- **User-specific Carts** with MongoDB relations
- **Auto Token Refresh** on 401 errors
- **Error Handling** with custom ApiError class
- **CORS Enabled** for frontend integration

## 🧪 Testing

Import `postman_collection.json` into Postman for ready-to-use API tests.

## 🌱 Environment Variables
```env
PORT=8000
MONGODB_URI=mongodb://localhost:27017/nexora
ACCESS_TOKEN_SECRET=your_access_secret_key_here
REFRESH_TOKEN_SECRET=your_refresh_secret_key_here
CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_API_KEY=your_cloudinary_key
CLOUDINARY_API_SECRET=your_cloudinary_secret
```