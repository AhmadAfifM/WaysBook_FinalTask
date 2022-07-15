require("dotenv").config();
const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const router = require("./src/routes");

const app = express();
const PORT = 5009;
app.use(express.json());
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", // define client origin if both client and server have different origin
  },
});

require("./src/socket")(io);

app.use("/api/v1/", router);
app.use("/uploads", express.static("uploads"));

server.listen(PORT, () => console.log(`Server running on PORT ${PORT}`));
