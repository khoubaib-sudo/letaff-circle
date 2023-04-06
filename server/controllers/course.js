const cloudinary = require("cloudinary").v2;
const { nanoid } = require("nanoid");
import Course from "../models/course";
import slugify from "slugify";
import { readFileSync } from "fs";

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
  try {
    const alreadyExist = await Course.findOne({
      slug: slugify(req.body.name.toLowerCase()),
    });
    if (alreadyExist) return res.status(400).send("Title is taken");
    const course = await new Course({
      slug: slugify(req.body.name),
      instructor: req.user._id,
      ...req.body,
    }).save();
    res.json(course);
  } catch (err) {
    console.log(err);
    return res.status(400).send("course create failed. try again");
  }
};

export const read = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("instructor", "_id name")
      .exec();
    res.json(course);
  } catch (err) {
    console.log(err);
  }
};

export const uploadVideo = async (req, res) => {
  try {
    // console.log("req.user._id", req.user._id);
    // console.log("req.params.instructorId", req.params.instructorId);
    // return;
    if(req.user._id != req.params.instructorId){
      return res.status(400).send('Unauthorized')
    }
    const { video } = req.files;
    if (!video) return res.status(400).send("No video");

    // upload to cloudinary
    const result = await cloudinary.uploader.upload(video.path, {
      resource_type: "video",
      public_id: nanoid(),
    });

    // console.log(result);
    res.send(result);
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};

export const removeVideo = async (req, res) => {
  if(req.user._id != req.params.instructorId){
    return res.status(400).send('Unauthorized')
  }
  try {
    const { public_id } = req.body;
    if (!public_id) return res.status(400).send("No public_id");

    // remove video from cloudinary
    const result = await cloudinary.uploader.destroy(public_id, {
      resource_type: "video",
    });

    console.log(result);
    res.send({ ok: true });
  } catch (err) {
    console.log(err);
    res.sendStatus(400);
  }
};
