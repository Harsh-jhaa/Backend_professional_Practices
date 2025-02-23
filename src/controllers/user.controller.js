import { asynchandler } from "../utils/asynchandler.js";

const registerUser = asynchandler(async (req, res) => {
  res.status(200).json({
    message: "That's it , the server is running !",
  });
});

export { registerUser };
