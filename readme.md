# 📗 Exeter Greens Modern Frontend PoC

This is a proof of concept (PoC) for building a modern frontend on top of the existing Exeter Greens WordPress / MySQL database.

## ✅ Why?

The current system is an old PHP WordPress plugin that mixes data and views, making it hard to maintain or extend.

This project shows how we can:
- Safely pull live data from the existing database
- Build a new React frontend (or any modern frontend)
- Without disrupting the existing site.

---

## ⚙️ How it works

- We use a small Node.js (Express) API server to talk to the MySQL database
- It only does SELECT queries so it can't accidentally change or delete any data
- We connect to the database via an SSH tunnel, which means:
  - The database is never exposed to the public internet
  - If the tunnel isn't open, it simply doesn't work — super safe

---

## 🚀 Folder structure

```
/
├── backend/    # Node.js + Express API server
└── frontend/   # React app (or whatever frontend we build later)
```

## 🔐 How the database safety works

1. **The Node API only has SELECT statements**, so it never modifies the data
2. **It connects through an SSH tunnel** to the live Cloudways server. If the tunnel is closed, the API simply cannot reach the DB
3. **Later we can improve this** by using a dedicated read-only MySQL user, so even accidental UPDATE or DELETE queries would be blocked by the database itself

---

## 🚀 How to run it

### 1. Start the SSH tunnel

This forwards your local port 3307 to the remote MySQL port 3306 over SSH.

```bash
ssh -L 3307:127.0.0.1:3306 exetergreens@178.62.82.245
```

**Keep this terminal open.**

### 2. Start the Node API server

In a second terminal:

```bash
cd backend
node index.js
```

This runs on: **http://localhost:3001**

### 3. Test it

In your browser or terminal, hit:

```bash
curl http://localhost:3001/api/addresses
```

✅ You should see live data from the database.

---

## 💡 Notes for future devs (or if we get stuck)

**If you see "Database error" it usually means:**
- Your SSH tunnel isn't open
- Or your `.env` isn't set up right (`MYSQL_HOST`, `MYSQL_PORT`, etc)

**The database can't be modified from this PoC** — so it's very safe to experiment.