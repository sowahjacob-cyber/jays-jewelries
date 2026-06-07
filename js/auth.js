function registerUser({ name, email, password, phone }) {
  const users = getUsers();
  if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
    return { success: false, message: "Email already registered" };
  }
  const user = {
    id: "user-" + Date.now(),
    name,
    email: email.toLowerCase(),
    password: btoa(password),
    phone,
    createdAt: new Date().toISOString()
  };
  users.push(user);
  saveUsers(users);
  const { password: _, ...safe } = user;
  setCurrentUser(safe);
  return { success: true, user: safe };
}

function loginUser(email, password) {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email.toLowerCase() && u.password === btoa(password)
  );
  if (!user) return { success: false, message: "Invalid email or password" };
  const { password: _, ...safe } = user;
  setCurrentUser(safe);
  return { success: true, user: safe };
}

function logoutUser() {
  setCurrentUser(null);
  window.location.href = "index.html";
}

function getUserOrders(userId) {
  return getOrders().filter((o) => o.userId === userId).sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );
}

function createOrder(orderData) {
  const orders = getOrders();
  const order = {
    id: "ORD-" + Date.now().toString(36).toUpperCase(),
    ...orderData,
    status: "pending",
    createdAt: new Date().toISOString()
  };
  orders.push(order);
  saveOrders(orders);
  const products = getProducts();
  orderData.items.forEach((item) => {
    const p = products.find((x) => x.id === item.productId);
    if (p) p.stock = Math.max(0, p.stock - item.quantity);
  });
  saveProducts(products);
  return order;
}
