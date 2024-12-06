const express = require("express");
const rateLimit = require("express-rate-limit");
const app = express();
const {
  getRandomHexColor,
  getRandomRgbColor,
  getRandomRgbaColor,
} = require("./helpers/generators");
const fs = require("fs");
const path = require("path");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 500,
  message: "Too many requests from this IP, please try again after an hour",
});

app.use("/api", limiter);

app.use(express.static(path.join(__dirname, "../site/dist")));

const htmlFile = fs.readFileSync(
  path.join(__dirname, "../site/dist/index.html"),
  "utf8"
);
app.get("/", (req, res) => {
  res.send(htmlFile);
});

app.get("/api", (req, res) => {
  try {
    const { type } = req.query;
    let color;

    switch (type) {
      case "hex":
        color = getRandomHexColor();
        break;
      case "rgb":
        color = getRandomRgbColor();
        break;
      case "rgba":
        color = getRandomRgbaColor();
        break;
      default:
        return res
          .status(400)
          .send("Invalid type. Please use 'hex', 'rgb' or 'rgba'.");
    }

    res.send({ color });
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
});

const PORT = 3030;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Site is running on http://localhost:${PORT}`);
});
