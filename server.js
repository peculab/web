// server.js (使用 Node.js 18 內建 fetch)
const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors()); // allow all origins

app.get("/api/taipei", async (req, res) => {
  try {
    const r = await fetch("https://citydashboard.taipei/api/v1/dashboard/", {
      headers: { Accept: "application/json" },
    });
    const data = await r.text();
    res.setHeader("Content-Type", r.headers.get("content-type") || "application/json");
    res.status(r.status).send(data);
  } catch (e) {
    res.status(500).json({ error: String(e) });
  }
});

const port = process.env.PORT || 4000;
app.listen(port, () => console.log(`Proxy on http://localhost:${port}`));
