const express = require('express');
const cors = require('cors');
const API_URL = "https://chat-rahat-backend.vercel.app/api";
const authRoutes = require("./routes/auth.js");

const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const messagingServiceSid = process.env.TWILIO_MESSAGING_SERVICE_SID;
const twilioClient = require('twilio')(accountSid, authToken);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World! Backend running on Vercel!');
});

app.get("/api/messages", (req, res) => {
  res.json([{ id: 1, text: "Hello from backend!" }]);
});

app.post('/', (req, res) => {
    const { message, user: sender, type, members } = req.body;

    if(type === 'message.new') {
        members
            .filter((member) => member.user_id !== sender.id)
            .forEach(({ user }) => {
                if(!user.online) {
                    twilioClient.messages.create({
                        body: `You have a new message from ${message.user.fullName} - ${message.text}`,
                        messagingServiceSid: messagingServiceSid,
                        to: user.phoneNumber
                    })
                        .then(() => console.log('Message sent!'))
                        .catch((err) => console.log(err));
                }
            });

        return res.status(200).send('Message sent!');
    }

    return res.status(200).send('Not a new message request');
});

app.use('/auth', authRoutes);

// Tambahkan ini agar kompatibel dengan Vercel
module.exports = app;

// Jalankan server hanya jika bukan di lingkungan Vercel
if (process.env.NODE_ENV !== "vercel") {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
