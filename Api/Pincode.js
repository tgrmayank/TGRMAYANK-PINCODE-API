const axios = require("axios");

const checkKey = require("../middleware/key");
const checkExpiry = require("../middleware/expiry");
const info = require("../config/info");

module.exports = async (req, res) => {

  if (!checkKey(req)) {
    return res.status(401).json({
      success: false,
      message: "❌ Invalid API Key. Contact owner for access.",
      developer: info
    });
  }

  if (!checkExpiry()) {
    return res.status(403).json({
      success: false,
      message: "⛔ API Expired. New API key purchase required.",
      developer: info
    });
  }

  const pin = req.query.pin;

  if (!pin) {
    return res.status(400).json({
      success: false,
      message: "PIN code required.",
      developer: info
    });
  }

  try {

    const result = await axios.get(
      `https://api.postalpincode.in/pincode/${pin}`
    );

    return res.status(200).json({
      success: true,
      data: result.data,
      developer: info
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: "Server error.",
      developer: info
    });

  }

};
