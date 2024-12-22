import asyncHandler from "express-async-handler";
import { AppError } from "../../middleware/error.js";
import { Banner } from "../../model/banner.model.js";

//! ============================================== List Banners ==============================================

export const listBanner = asyncHandler(async (req, res) => {
  const banner = await Banner.find({});
  res.status(200).json({
    message: "Banners Fetched",
    success: true,
    data: banner,
  });
});

//! =============================================== Add Banner ===============================================

export const insertBanner = asyncHandler(async (req, res) => {
  const { title, description, link, image } = req.body;
  const bannerExists = await Banner.findOne({ title: req.body.title });
  if (bannerExists) {
    throw new AppError("Banner already exists");
  }
  const newBanner = new Banner({
    title,
    description,
    link,
    image,
  });
  const savedBanner = await newBanner.save();
  res.status(200).json({
    message: "Banner Created",
    success: true,
    data: savedBanner,
  });
});

//! ============================================== Edit Banner ==============================================

export const editBanner = asyncHandler(async (req, res) => {
  const { image, title, description, link } = req.body;
  const bannerId = req.params.bannerId;
  const banner = await Banner.findById(bannerId);
  if (!banner) {
    throw new AppError("Banner not found");
  }
  banner.image = image;
  banner.title = title;
  banner.description = description;
  banner.link = link;
  const savedBanner = await banner.save();
  res
    .status(200)
    .json({ success: true, message: "Banner Updated", data: savedBanner });
});

//! ============================================== Banner Status ==============================================

export const bannerStatus = asyncHandler(async (req, res) => {
  const bannerId = req.params.bannerId;
  const banner = await Banner.findById(bannerId);
  if (!banner) {
    throw new AppError("Banner not found");
  }
  banner.status = !banner.status;
  const savedBanner = await banner.save();
  res
    .status(200)
    .json({ success: true, message: "Status Updated", data: savedBanner });
});

//! ============================================== Delete Banner ==============================================

export const deleteBanner = asyncHandler(async (req, res) => {
  const bannerId = req.params.bannerId;
  const banner = await Banner.findOneAndDelete({ _id: bannerId });
  if (!banner) {
    throw new AppError("Banner not found");
  }
  res.status(200).json({ success: true, message: "Banner Deleted" });
});
