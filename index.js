var express = require("express");
var cors = require("cors");
require("dotenv").config();
const multer = require("multer");
const upload = multer({ dest: __dirname });

var app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use("/public", express.static(process.cwd() + "/public"));

app.get("/", function (req, res) {
  res.sendFile(process.cwd() + "/views/index.html");
});

app.post("/api/fileanalyse", upload.single("upfile"), (req, res) => {
  try {
    const { originalname, size, mimetype } = req.file;

    return res.json({ name: originalname, type: mimetype, size });
  } catch (error) {
    console.error(error.message);
    return res.json("Deu ruim !!!");
  }
});

const port = process.env.PORT || 4000;
app.listen(port, function () {
  console.log("Your app is listening on port " + port);
});
