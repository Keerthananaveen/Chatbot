# Chatbot API Backend

A scalable and secure **Chatbot Backend API** built with **Node.js, Express, PostgreSQL, and Prisma**, supporting authentication, conversation management, chatbot responses, webhooks, role-based access control, and detailed Postman testing.

This project is designed for **learning backend development** and **real-world API design**.

---

## Features

### Authentication & Authorization
- User Signup & Login
- Secure password hashing using **bcryptjs**
- JWT-based authentication
- Role-based access control (USER / ADMIN)

### Chatbot & Conversations
- Start and manage chat sessions
- Rule-based chatbot responses
- Typing indicator simulation
- Chat history retrieval
- End chat sessions gracefully

###  Customer Support
- Escalation to human agent
- Feedback submission
- Chat summaries

### Webhooks 
- Register webhooks for chatbot events
- Events supported:
  - CHAT_STARTED
  - MESSAGE_SENT
  - CHAT_ENDED
- Secure webhook dispatch with secret signing

### Security & Reliability
- Input validation
- Centralized error handling
- JWT token verification
- Environment-based configuration

---

## Tech Stack

| Technology | Usage |
|---------|------|
| Node.js (v20.x) | Runtime |
| Express.js | Web framework |
| PostgreSQL | Database |
| Prisma ORM | Database access |
| bcryptjs | Password hashing |
| jsonwebtoken | JWT authentication |
| dotenv | Environment variables |

---

## Project Structure
```markdown
chatbot-api/
├── prisma/
│ ├── schema.prisma
│ └── migrations/
│
├── src/
│ ├── config/
│ │ └── db.js
│ │
│ ├── controllers/
│ │ ├── auth.controller.js
│ │ ├── chat.controller.js
│ │ ├── feedback.controller.js
│ │ └── webhook.controller.js
│ │
│ ├── middlewares/
│ │ ├── auth.middleware.js
│ │ ├── role.middleware.js
│ │ └── error.middleware.js
│ │
│ ├── routes/
│ │ ├── auth.routes.js
│ │ ├── chat.routes.js
│ │ ├── feedback.routes.js
│ │ └── webhook.routes.js
│ │
│ ├── services/
│ │ └── chatbot.service.js
│ │
│ ├── webhooks/
│ │ ├── webhook.dispatcher.js
│ │ └── webhook.events.js
│ │
│ ├── utils/
│ │ └── password.validator.js
│ │
│ ├── app.js
│ └── server.js
│
├── .env
├── package.json
└── README.md
```
## Environment Variables

Create a `.env` file in the root directory
PORT=3000
DATABASE_URL=postgresql://user:password@localhost:5432/chatbotdb
JWT_SECRET=supersecretkey
JWT_EXPIRES_IN=1d

---

## Database Setup (Prisma)

###  Install Dependencies
npm install
### Initialize Prisma
npx prisma init
### Run Migrations
npx prisma migrate dev --name init
### Generate Prisma Client
npx prisma generate
---

##  Running the Project
npm run dev


---

## 📡 API Endpoints

### Auth
| Method | Endpoint | Description |
|-----|--------|-----------|
| POST | /auth/signup | Register user |
| POST | /auth/login | Login user |

### Chat
| Method | Endpoint | Description |
|-----|--------|-----------|
| POST | /chat/start | Start chat |
| POST | /chat/query | Send message |
| GET | /chat/history | View history |
| POST | /chat/end | End chat |

### Feedback
| Method | Endpoint | Description |
|-----|--------|-----------|
| POST | /feedback | Submit feedback |

### Webhooks (Admin)
| Method | Endpoint | Description |
|-----|--------|-----------|
| POST | /webhooks | Create webhook |
| GET | /webhooks | List webhooks |
| DELETE | /webhooks/:id | Delete webhook |

---

## Postman Testing

### Environment Variables
baseUrl
token
chatId

### Correct Request Body Example
```json
{
  "chatId": "{{chatId}}",
  "message": "Hello"
}
```
### Testing Flow
- Signup
- Login (token auto-saved)
- Start chat (chatId auto-saved)
- Send messages
- View history
- End chat






