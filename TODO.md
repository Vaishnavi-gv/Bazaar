# TODO: Cart, Orders, and Buying/Selling Flows

## Phase 1: Backend Models

- [ ] Create `backend/models/cartModel.js` - Cart schema with items array, user reference
- [ ] Create `backend/models/orderModel.js` - Order schema with items, shipping info, payment status, order status

## Phase 2: Backend Controllers

- [ ] Create `backend/controllers/cartController.js`
  - [ ] getCart - Get user's cart
  - [ ] addToCart - Add product to cart
  - [ ] updateCartItem - Update quantity of cart item
  - [ ] removeFromCart - Remove item from cart
  - [ ] clearCart - Empty the cart

- [ ] Create `backend/controllers/orderController.js`
  - [ ] createOrder - Create order from cart
  - [ ] getOrders - Get user's orders
  - [ ] getOrderById - Get single order details
  - [ ] updateOrderStatus - Update order status (admin)
  - [ ] cancelOrder - Cancel order (user)

## Phase 3: Backend Routes

- [ ] Create `backend/routes/cartRoute.js` - Cart API routes
- [ ] Create `backend/routes/orderRoute.js` - Order API routes
- [ ] Update `backend/server.js` - Register new routes

## Phase 4: User Model Updates

- [ ] Update `backend/models/userModel.js` - Add seller fields (isSeller, shopName, products array reference)

## Phase 5: Frontend - Cart Context

- [ ] Create `frontend/src/context/CartContext.tsx` - Cart state management

## Phase 6: Frontend Pages

- [ ] Create `frontend/src/pages/Cart.tsx` - Shopping cart page
- [ ] Create `frontend/src/pages/Orders.tsx` - Order history page
- [ ] Create `frontend/src/pages/OrderDetails.tsx` - Single order details
- [ ] Create `frontend/src/pages/MyProducts.tsx` - Seller's products management
- [ ] Create `frontend/src/pages/AddProduct.tsx` - Add/edit product form

## Phase 7: Frontend API Updates

- [ ] Update `frontend/src/api.ts` - Add cart and order API methods

## Phase 8: Frontend Navigation

- [ ] Update `frontend/src/App.tsx` - Add routes for new pages and navigation
