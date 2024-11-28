import {Banner} from "../../model/banner.model.js";

//! ============================================== List Banners ==============================================

export const listBanner = async (req, res, next) => {
  try {
    const banner = await Banner.find({});
    res.status(200).json({
      message: "Banners Fetched",
      success: true,
      data: banner,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! =============================================== Add Banner ===============================================

export const insertBanner = async (req, res, next) => {
  try {
    const { title, description, link, image } = req.body;
    const bannerExists = await Banner.findOne({ title: req.body.title });
    if (bannerExists) {
      return res
        .status(200)
        .json({ message: "Already Exists", success: false });
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
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== Edit Banner ==============================================

export const editBanner = async (req, res, next) => {
  try {
    const { image, title, description, link } = req.body;
    const bannerId = req.params.bannerId;
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    banner.image = image;
    banner.title = title;
    banner.description = description;
    banner.link = link;
    const savedBanner = await banner.save();
    res
      .status(200)
      .json({ success: true, message: "Banner Updated", data: savedBanner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== Banner Status ==============================================

export const bannerStatus = async (req, res, next) => {
  try {
    const bannerId = req.params.bannerId;
    const banner = await Banner.findById(bannerId);
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not Found" });
    }
    banner.status = !banner.status;
    const savedBanner = await banner.save();
    res
      .status(200)
      .json({ success: true, message: "Status Updated", data: savedBanner });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

//! ============================================== Delete Banner ==============================================

export const deleteBanner = async (req, res, next) => {
  try {
    const bannerId = req.params.bannerId;
    const banner = await Banner.findOneAndDelete({ _id: bannerId });
    if (!banner) {
      return res
        .status(404)
        .json({ success: false, message: "Banner not found" });
    }
    res.status(200).json({ success: true, message: "Banner Deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error Occurred" });
    next(error);
  }
};

