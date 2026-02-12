const express = require("express");
const router = express.Router();
const protect = require("../middlewares/auth.middleware");
const { getUserInfo } = require("../controllers/user.controller");


const {
    createUser,
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
} = require("../controllers/user.controller");


router.get("/", (req, res) => {
  res.send("User API is running");
});
router.get("/get", getAllUsers);
// /get/:id
router.get("/get/:id", getUserById);

// /post
router.post("/post", createUser);

// /patch/:id
router.patch("/patch/:id", updateUser);

// /delete/:id
router.delete("/delete/:id", deleteUser);
router.get("/info", protect, getUserInfo);



module.exports = router;