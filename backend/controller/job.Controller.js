import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.middleware.js";
import ErrorHandler from "../middlewares/error.middleware.js";
import { Job } from "../models/jobSchema.model.js";

export const postJob = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualification,
    offers,
    salary,
    hiringMultipleCandidate,
    personalWebsiteTitle,
    personalWebsiteUrl,
    jobNiche,
  } = req.body;
  if (
    !title ||
    !jobType ||
    !location ||
    !companyName ||
    !introduction ||
    !responsibilities ||
    !qualification ||
    !salary ||
    !jobNiche
  ) {
    return next(new ErrorHandler("Please provide full job details", 400));
  }

  if (
    (personalWebsiteTitle && !personalWebsiteUrl) ||
    (!personalWebsiteTitle && personalWebsiteUrl)
  ) {
    return next(
      new ErrorHandler(
        "Provide both the website url and title,or leave both blank"
      )
    );
  }

  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    jobType,
    location,
    companyName,
    introduction,
    responsibilities,
    qualification,
    offers,
    salary,
    hiringMultipleCandidates: hiringMultipleCandidate,
    personalWebsite: {
      title: personalWebsiteTitle,
      url: personalWebsiteUrl,
    },
    jobNiche,
    postedBy,
  });

  res.status(201).json({
    success: true,
    message: "Job posted successfully",
    job,
  });
});

export const getAllJobs = catchAsyncErrors(async (req, res, next) => {
  const { city, niche, searchKeyword } = req.query;
  const query = {};
  if (city) {
    query.location = city;
  }
  if (niche) {
    query.jobNiche = niche;
  }
  if (searchKeyword) {
    query.$or = [
      { title: { $regex: searchKeyword, $options: "i" } },
      { companyName: { $regex: searchKeyword, $options: "i" } },
      { introduction: { $regex: searchKeyword, $options: "i" } },
    ];
  }
  //.sort({ createdAt: -1 });
  const jobs = await Job.find(query);
  res.status(200).json({
    success: true,
    message: "Job founds",
    jobs,
    count: jobs.length,
  });
});
export const getMyJobs = catchAsyncErrors(async (req, res, next) => {
  const myJobs = await Job.find({ postedBy: req.user._id });

  res.status(200).json({
    success: true,
    myJobs,
  });
});
export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Oops! Job Not Found", 400));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted Successfully",
  });
});
export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("Job Not Found", 400));
  }
  res.status(200).json({
    success: true,
    job,
  });
});
