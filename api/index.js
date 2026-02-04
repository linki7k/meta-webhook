import express from "express";
const app = express();

app.use(express.json());

// 首页显示，证明你的 Webhook 已启动
app.get("/", (req, res) => {
  res.send("Webhook is alive and kicking! 🚀");
});

// --- Meta Webhook 验证 (GET) ---
// 当你在 Meta 后台点击“验证”时，Meta 会发送一个请求到这里
app.get("/api", (req, res) => {
  const VERIFY_TOKEN = "my_vibes_token"; // 你可以自己定义一个复杂的字符串

  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("✅ Webhook 已成功验证！");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// --- 接收消息 (POST) ---
// WhatsApp 和 Instagram 的消息都会推送到这个接口
app.post("/api", (req, res) => {
  console.log("📩 收到新消息:", JSON.stringify(req.body, null, 2));

  // 这里就是你未来把数据存到数据库的地方
  
  res.status(200).send("EVENT_RECEIVED");
});

export default app;
