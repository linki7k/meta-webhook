import express from "express";

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Webhook is alive 👋");
});

// Meta Webhook 验证
app.get("/webhook", (req, res) => {
  const VERIFY_TOKEN = "my_verify_token";

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 接收消息
app.post("/webhook", (req, res) => {
  console.log("📩 Incoming webhook:");
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// ⚠️ 注意：不要 app.listen
export default app;
