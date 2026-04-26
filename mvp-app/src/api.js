const BASE_URL = process.env.REACT_APP_API_URL || "http://127.0.0.1:5000/api";

// Helper to get token from localStorage
const getToken = () => localStorage.getItem("token");

// Helper for authenticated requests
const authHeaders = () => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${getToken()}`,
});

// ─── AUTH ────────────────────────────────────────────────
export async function registerUser(name, email, password) {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password }),
  });
  return res.json();
}

export async function loginUser(email, password) {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  });
  return res.json();
}

// ─── MVP ────────────────────────────────────────────────
export async function generateMVP(idea_description, target_users, category) {
  const res = await fetch(`${BASE_URL}/mvp/generate`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ idea_description, target_users, category }),
  });
  return res.json();
}

export async function getMyPlans() {
  const res = await fetch(`${BASE_URL}/mvp/my-plans`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
}

export async function getPlanById(planId) {
  const res = await fetch(`${BASE_URL}/mvp/plan/${planId}`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
}

// ─── USER / DASHBOARD ────────────────────────────────────────────────────
export async function getUserProfile() {
  const res = await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    headers: authHeaders(),
  });
  return res.json();
}

export async function updateProfile(name) {
  const res = await fetch(`${BASE_URL}/user/profile`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ name }),
  });
  return res.json();
}

export async function changePassword(current_password, new_password) {
  const res = await fetch(`${BASE_URL}/user/change-password`, {
    method: "PUT",
    headers: authHeaders(),
    body: JSON.stringify({ current_password, new_password }),
  });
  return res.json();
}
