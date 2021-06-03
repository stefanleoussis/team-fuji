const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { searchUsers } = require("../controllers/user");
const {
  getUserConversations,
  postUserConversation,
  postGroupChat,
  addUserToGroupChat,
} = require("../controllers/conversation");
const { getMessages, postMessage } = require("../controllers/message");

router.route("/").get(protect, searchUsers);
router.route("/conversations").get(protect, getUserConversations);
router.route("/conversation/:userId").post(protect, postUserConversation);
router.route("/messages/:conversationId").get(protect, getMessages);
router.route("/message/:conversationId").post(protect, postMessage);
router.route("/groupchat").post(protect, postGroupChat);
router
  .route("/groupchat/:groupChatId/:userId")
  .post(protect, addUserToGroupChat);

module.exports = router;
