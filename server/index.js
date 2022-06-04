const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const authRoutes = require("./routes/auth");
const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
require("dotenv").config();
const schedule = require("node-schedule");
const User = require("./models/userModel");
const Matchs = require("./models/matchModel");
const {
  createMatch,
  userCheck,
  newMatch,
} = require("./controllers/matchController");
app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const scheduleCronstyle = () => {
  schedule.scheduleJob("5 * * * * *", async () => {
    console.log("scheduleCronstyle:" + new Date());
    // createMatch({ userID: "629b461fc0eb1500b209c59c" });
    // newMatch({ userID: "6294c191e1bd8e35be2ddbdd" });
    // var check = await createMatch({ userID: "6294c191e1bd8e35be2ddbdd" });
    // console.log(check);
    // console.log(check);

    // console.log("automated testing	");
    // const userID = "6294c191e1bd8e35be2ddbdd";
    // var check = true;
    // const usercheck = await Matchs.findOne({ owner: userID });
    // usercheck.matchs.forEach((match) => {
    //   if (match.match.includes(userID + 123)) {
    //     check = false;
    //   }
    // });
    // if (usercheck & check) {
    //   // usercheck.matchs.push({ match: userID + "123" }, { match: userID + "1" });
    //   // usercheck.save();
    //   console.log(usercheck);
    //   return;
    // } else if (usercheck & !check) {
    //   const user = await Matchs.create({
    //     owner: userID,
    //   });
    //   console.log(user);
    // }
  });
};

scheduleCronstyle();
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});
