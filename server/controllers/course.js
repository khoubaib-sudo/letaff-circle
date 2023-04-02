const cloudinary = require("cloudinary").v2;
const { nanoid } = require("nanoid");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadImage = async (req, res) => {
  try {
    const { image } = req.body;
    if (!image) return res.status(400).send("No image");

    // prepare the image
    const base64Data = image.replace(/^data:image\/\w+;base64,/, "");
    const type = image.split(";")[0].split("/")[1];

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/${type};base64,${base64Data}`,
      {
        public_id: nanoid(),
      }
    );

    console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
  }
};

export const removeImage = async (req, res) => {
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).send("No public_id");

    // remove image from cloudinary
    const result = await cloudinary.uploader.destroy(public_id);

    console.log(result);
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const create = async (req, res) => {
  console.log("CREATE COURSE");
};
