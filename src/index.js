import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
dotenv.config();

import { serve } from "inngest/express";
import { inngest as inngestClient } from "./inngest/client.js";
import sendTelegram from "./inngest/functions/sendTelegram.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();

app.use(express.json());

app.use(express.static(path.join(__dirname, "../public")));

app.use("/api/inngest", serve({ client: inngestClient, functions: [sendTelegram] }));

// Endpoint para disparar desde HTML o scripts
app.post("/send-event", async (req, res) => {
  const { message } = req.body;
  try {
    await inngestClient.send({
      name: "telegram.message.sent",
      data: { message },
    });
    res.json({ status: "Evento enviado" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error enviando evento" });
  }
});

app.listen(process.env.PORT || 3000, () => {
  console.log(`Server listening on ${process.env.PORT}`); 
});
