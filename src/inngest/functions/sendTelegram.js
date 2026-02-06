import { inngest } from "../client.js";
import { sendTelegramMessage } from "../telegram.js";
import dotenv from "dotenv";
dotenv.config();

export default inngest.createFunction(
  { name: "sendTelegramMessage" },
  { event: "telegram.message.sent" },
  async ({ event }) => {
    const { message } = event.data;
    await sendTelegramMessage(
      process.env.TELEGRAM_BOT_TOKEN,
      process.env.TELEGRAM_CHAT_ID,
      message
    );
  }
);
