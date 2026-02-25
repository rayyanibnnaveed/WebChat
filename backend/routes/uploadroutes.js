const upload = require("../upload");

router.post("/upload-image", upload.single("image"), async (req, res) => {
  res.json({
    imageUrl: req.file.location
  });
});