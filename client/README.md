# 🎨 Nexora Frontend - React Client

Modern React application with TailwindCSS for e-commerce shopping experience.

## 🚀 Quick Setup
```bash
cd client
npm install
npm run dev    # Starts on http://localhost:5173
```

## 📱 Features

### Pages
- **Register** - User signup with avatar upload
- **Login** - JWT-based authentication
- **Products** - Grid view of 10 products
- **Cart** - Manage items, quantities, and totals
- **Checkout** - Order form with receipt modal

### Components
- `Navbar` - Navigation with auth state
- `ProductCard` - Product display with "Add to Cart"
- `CartItem` - Cart item with quantity controls
- `ProtectedRoute` - Auth-gated routes

## 🎨 Tech Stack
```json
{
  "react": "^18.2.0",
  "react-router-dom": "^6.20.0",
  "axios": "^1.6.0",
  "tailwindcss": "^3.4.0"
}
```

## 🗂️ Folder Structure
```
client/
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Route pages
│   ├── context/        # AuthContext for state
│   ├── services/       # API calls (api.js)
│   ├── App.jsx         # Routes setup
│   └── main.jsx        # Entry point
├── public/
├── index.html
└── package.json
```

## 🔑 Key Features

- **Context API** for global auth state
- **Axios Interceptors** for auto token attachment
- **Protected Routes** redirect to login if unauthenticated
- **Auto Token Refresh** on 401 errors
- **Responsive Design** with TailwindCSS
- **Toast Notifications** for user feedback
- **Image Fallbacks** for broken product images

## 🎯 User Flow
```
Register → Login → Products → Add to Cart → Cart → Checkout → Receipt
```

## 🔧 Configuration

Update API base URL in `/src/services/api.js`:
```javascript
baseURL: "http://localhost:8000"
```

## 🎨 Styling

Uses **TailwindCSS** utility classes:
- Responsive grid layouts
- Hover effects & transitions
- Custom color schemes
- Mobile-first design

## 📸 Responsive Breakpoints

- Mobile: < 640px
- Tablet: 640px - 1024px
- Desktop: > 1024px