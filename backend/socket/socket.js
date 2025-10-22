import { Server } from "socket.io";

const initSocket = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  const onlineUsers = {}; // userId -> socket.id
  const onlineDoctors = {}; // docId -> socket.id
  const onlineAdmins = {}; // adminId -> socket.id

  io.on("connection", (socket) => {
    console.log("Socket connected:", socket.id);

    socket.on("registerUser", (userId) => {
      onlineUsers[userId] = socket.id;
      console.log(`User ${userId} connected → ${socket.id}`);
    });

    socket.on("registerDoctor", (docId) => {
      onlineDoctors[docId] = socket.id;
      console.log(`Doctor ${docId} connected → ${socket.id}`);
    });

    socket.on("registerAdmin", (adminId) => {
      onlineAdmins[adminId] = socket.id;
      console.log(`Admin ${adminId} connected → ${socket.id}`);
    });

    socket.on("disconnect", () => {
      Object.keys(onlineUsers).forEach((id) => {
        if (onlineUsers[id] === socket.id) delete onlineUsers[id];
      });
      Object.keys(onlineDoctors).forEach((id) => {
        if (onlineDoctors[id] === socket.id) delete onlineDoctors[id];
      });
      Object.keys(onlineAdmins).forEach((id) => {
        if (onlineAdmins[id] === socket.id) delete onlineAdmins[id];
      });
      console.log("Socket disconnected:", socket.id);
    });
  });

  return { io, onlineUsers, onlineDoctors, onlineAdmins };
};

export default initSocket;
