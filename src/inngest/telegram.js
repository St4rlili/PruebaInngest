import axios from "axios";

export async function sendTelegramMessage(botToken, chatId, message) {
  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });
    console.log("Mensaje enviado a Telegram");
  } catch (err) {
    console.error("Error enviando mensaje:", err.response?.data || err.message);
  }
}
