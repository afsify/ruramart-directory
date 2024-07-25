const mongoose = require("mongoose");

const developerSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Types.ObjectId,
      ref: "users",
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    domain: {
      type: String,
      required: true,
    },
    experience: {
      type: String,
      required: true,
    },
    github: {
      type: String,
      required: true,
    },
    linkedin: {
      type: String,
      required: true,
    },
    youtube: String,
    whatsapp: String,
    instagram: String,
    resume: String,
    address: String,
    status: {
      type: String,
      default: "requested",
    },
    education: [
      {
        institution: String,
        course: String,
        branch: String,
        year: Number,
      },
    ],
    skill: [
      {
        name: {
          type: String,
          required: true,
        },
        proficiency: {
          type: Number,
          min: 0,
          max: 100,
        },
      },
    ],
  },
  { timestamps: true }
);

const developerModel = mongoose.model("developers", developerSchema);

module.exports = developerModel;
