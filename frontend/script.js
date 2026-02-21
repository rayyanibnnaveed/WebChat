const API = "http://54.221.9.161/api";


/* SIGNUP */
async function signup() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const res = await fetch("http://54.221.9.161/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  });

  const data = await res.json();
  alert(data.message);
}


/* LOGIN */
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

  localStorage.setItem("token", data.token);

  window.location = "dashboard.html";
}

/* POST */
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

  alert((await res.json()).message);
}

function scrollToBottomIfNeeded(container) {
  const distanceFromBottom =
    container.scrollHeight - container.scrollTop - container.clientHeight;

  const isUserNearBottom = distanceFromBottom < 100;

  if (isUserNearBottom) {
    container.scrollTop = container.scrollHeight;
  }
}

/* LOAD POSTS */
async function loadPosts() {
  try {
    const res = await fetch(API + "/posts");
    const data = await res.json();

    const postsDiv = document.getElementById("posts");

    data.forEach((p) => {
      if (!document.getElementById("post-" + p.id)) {
        const postHTML = `
          <div class="message-card" id="post-${p.id}">
            <div>
              <b>${p.name}</b>
              <small>${new Date(p.created_at).toLocaleString()}</small>
            </div>
            <p>${p.content}</p>
            <button onclick="deletePost(${p.id})">Delete</button>
          </div>
        `;

        postsDiv.insertAdjacentHTML("beforeend", postHTML);

        // 👇 Auto-scroll only if user is at bottom
        scrollToBottomIfNeeded(postsDiv);
      }
    });

  } catch (err) {
    console.error("Error loading posts:", err);
  }
}

async function deletePost(id) {
  const token = localStorage.getItem("token");

  const res = await fetch(API + "/posts/" + id, {
    method: "DELETE",
    headers: { Authorization: token },
  });

  if (res.ok) {
    const postElement = document.getElementById("post-" + id);
    if (postElement) postElement.remove();
  }
}

// Initial load
if (window.location.pathname.includes("dashboard")) {
  loadPosts();

  // Force scroll after initial load
  setTimeout(() => {
    const postsDiv = document.getElementById("posts");
    postsDiv.scrollTop = postsDiv.scrollHeight;
  }, 200);

  setInterval(loadPosts, 1000);
}


/* LOGOUT */
function logout() {
  localStorage.removeItem("token");
  window.location = "login.html";
}