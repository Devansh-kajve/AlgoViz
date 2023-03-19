import React from "react";
import "./../../css/Chatbox.css";
import axios from "axios";
import chatbot from "./../../images/chatbot.png";
import user from "./../../images/user.png";

const Chatbox = () => {
  async function enterPrompt() {
    const form = document.getElementById("chat-form");
    const input = document.getElementById("chat-input");
    const messages = document.getElementById("chat-messages");
    const apiKey = "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";

    const message = input.value;
    if (!message) return;
    input.value = "";
    messages.innerHTML += `<div class="message user-message">
  <img src=${user} alt="user icon"> <span>${message}</span>
  </div>`;

    // Use axios library to make a POST request to the OpenAI API
    const response = await axios.post(
      "https://api.openai.com/v1/completions",
      {
        prompt: message,
        model: "text-davinci-003",
        temperature: 0,
        max_tokens: 100,
        top_p: 1,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
      }
    );
    const chatbotResponse = response.data.choices[0].text;

    messages.innerHTML += `<div class="message bot-message">
  <img src=${chatbot} alt="bot icon"> <span>${chatbotResponse}</span>
  </div>`;
  }
  return (
    <div id="chat-window">
      <div class="main-title">CHAT BOT USING OPENAI MODEL</div>
      <hr
        style={{ width: "300px", border: "none ", height: "1px" }}
        color="#e7e7e7"
      />
      <div id="chat-messages"></div>
      <form id="chat-form">
        <input
          type="text"
          id="chat-input"
          autocomplete="off"
          placeholder="Ask your doubt here?"
          required
        />
        <button type="submit" onClick={() => enterPrompt()}>
          Ask
        </button>
      </form>
    </div>
  );
};

export default Chatbox;
