# 📓 WebChat – Cloud-Based Journal App

WebChat is a full-stack web application where users can register, log in, and write daily journal posts. The project is built with Node.js and MySQL, deployed on AWS, and connected with a CI/CD pipeline using GitHub Actions.

This project was created to practice real-world backend development, cloud deployment, and DevOps workflows.

---

## 🚀 Features

- Secure user signup and login (JWT authentication)
- Create and view journal posts
- Data stored on AWS RDS (MySQL)
- Hosted on AWS EC2
- Automatic deployment with GitHub Actions
- Separate frontend and backend structure
- Environment variables managed with .env

---

## 🛠️ Tech Stack

### Frontend
- HTML
- CSS
- JavaScript

### Backend
- Node.js
- Express.js
- MySQL
- JSON Web Tokens (JWT)

### Cloud & DevOps
- AWS EC2
- AWS RDS
- GitHub Actions
- PM2

---

## 📂 Project Structure

WebChat/

├── backend/  
│   ├── routes/  
│   ├── app.js  
│   └── .env  
│   └── db.js 

├── frontend/  
│   ├── login.html  
│   ├── signup.html 
│   ├── dashboard.html  
│   ├── script.js  
│   └── style.css  
│   └── dashboard.css

├── .github/workflows/  
│   └── deploy.yml  
└── README.md  

---

## ⚙️ Local Setup

### 1. Clone the Repository

git clone https://github.com/rayyanibnnaveed/WebChat.git  
cd WebChat

---

### 2. Install Dependencies

cd backend  
npm install

---

### 3. Environment Variables

Create a `.env` file inside the backend folder:

DB_HOST=your-rds-endpoint  
DB_USER=your-username  
DB_PASS=your-password  
DB_NAME=your-database  
JWT_SECRET=your-secret-key  
PORT=3000  

Important: Do not upload your .env file to GitHub.

---

### 4. Run the Server

npm start  

or

pm2 start app.js

---

### 5. Open in Browser

http://localhost:3000

---

## ☁️ Deployment

The project is deployed using AWS services.

- EC2 is used to host the application
- RDS is used for the MySQL database
- GitHub Actions handles automatic deployment

When code is pushed to the main branch, GitHub Actions pulls the latest version on EC2 and restarts the server.

---

## 🔄 CI/CD Pipeline

The deployment workflow is located at:

.github/workflows/deploy.yml

Every push to the main branch triggers an automatic update on the server.

---

## 🔐 Authentication

User authentication is handled using JWT:

1. User logs in
2. Server generates a token
3. Token is stored in the browser
4. Token is sent with API requests
5. Protected routes are verified on the backend

---

## 📌 Future Improvements

Some features that can be added later:

- Mobile responsive design
- User profiles
- Password reset system
- Notifications
- HTTPS with SSL
- Real-time chat

---

## 👨‍💻 Author

Rayyan Ahmed

GitHub: https://github.com/rayyanibnnaveed

---

## 📜 License

This project is licensed under the MIT License.

---

## 💬 Notes

This project helped me understand how real production systems work, including authentication, cloud hosting, and automated deployments. It reflects practical experience with full-stack development and DevOps tools.

