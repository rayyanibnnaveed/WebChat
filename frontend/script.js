const API = "http://54.221.9.161/api";
function parseJwt(token) {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );

    return JSON.parse(jsonPayload);
  } catch (err) {
    return null;
  }
}
/* ========================= */
/* GLOBALS */
/* ========================= */

let loadedPostIds = new Set();

/* ========================= */
/* SIGNUP */
/* ========================= */

async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch(API + "/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message);
}


/* ========================= */
/* LOGIN */
/* ========================= */

async function login() {
  const res = await fetch(API + "/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      email: email.value,
      password: password.value,
    }),
  });

  const data = await res.json();

  console.log("LOGIN RESPONSE:", data);

  if (!data.token) {
    alert("Login failed");
    return;
  }

  localStorage.setItem("token", data.token);

  // 🔥 Decode token to get user info
  const decoded = parseJwt(data.token);

  console.log("DECODED TOKEN:", decoded);

  if (decoded) {
    localStorage.setItem("userId", decoded.id);
  }

  window.location = "dashboard.html";
}


/* ========================= */
/* POST MESSAGE */
/* ========================= */

async function post() {
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({
      content: content.value,
    }),
  });

  const data = await res.json();

  alert(data.message);
}


/* ========================= */
/* LOAD POSTS (CHAT RENDER) */
/* ========================= */

async function loadPosts() {
  try {
    const res = await fetch(API + "/posts");
    const data = await res.json();

    const postsDiv = document.getElementById("posts");
    const loggedInUserId = localStorage.getItem("userId");

    data.forEach((p) => {

      console.log("Logged in:", loggedInUserId);
      console.log("Post user:", p.user_id);
        console.log("FULL POST OBJECT:", p);
      // Skip already rendered posts
      if (loadedPostIds.has(p.id)) return;

      const isMyMessage = Number(p.user_id) === Number(loggedInUserId);

      const postHTML = `
        <div 
          class="message-card ${isMyMessage ? "my-message" : "other-message"}"
          id="post-${p.id}"
        >
          <div>
            <b>${p.name}</b>
            <small>${new Date(p.created_at).toLocaleString()}</small>
          </div>

          <p>${p.content}</p>

          <button onclick="deletePost(${p.id})">Delete</button>
        </div>
      `;

      postsDiv.insertAdjacentHTML("beforeend", postHTML);
      loadedPostIds.add(p.id);

      // Auto scroll if user is near bottom
      scrollToBottomIfNeeded(postsDiv);
    });

  } catch (err) {
    console.error("Error loading posts:", err);
  }
}


/* ========================= */
/* DELETE POST */
/* ========================= */

async function deletePost(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/posts/" + id, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  if (res.ok) {
    document.getElementById("post-" + id)?.remove();
    loadedPostIds.delete(id);
  }
}


/* ========================= */
/* AUTO SCROLL */
/* ========================= */

function scrollToBottomIfNeeded(container) {

  const distanceFromBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;

  const isUserNearBottom = distanceFromBottom < 100;

  if (isUserNearBottom) {
    container.scrollTo({
      top: container.scrollHeight,
      behavior: "smooth"
    });
  }
}


/* ========================= */
/* DASHBOARD INITIALIZATION */
/* ========================= */

if (window.location.pathname.includes("dashboard")) {

  loadPosts();

  // Force scroll after first load
  setTimeout(() => {
    const postsDiv = document.getElementById("posts");
    if (postsDiv) {
      postsDiv.scrollTop = postsDiv.scrollHeight;
    }
  }, 300);

  // Poll every second
  setInterval(loadPosts, 1000);
}


/* ========================= */
/* LOGOUT */
/* ========================= */

function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("userName");
  window.location = "login.html";
}