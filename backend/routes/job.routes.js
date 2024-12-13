import express from "express";
import {
  isAuthenticated,
  isAuthorized,
} from "../middlewares/auth.middleware.js";
import {
  deleteJob,
  getAllJobs,
  getMyJobs,
  getSingleJob,
  postJob,
} from "../controller/job.Controller.js";
const router = express.Router();

router.post("/post", isAuthenticated, isAuthorized("Employer"), postJob);
router.get("/getall", getAllJobs);
router.get("/getmyjobs", isAuthenticated, isAuthorized("Employer"), getMyJobs);
router.delete(
  "/delete/:id",
  isAuthenticated,
  isAuthorized("Employer"),
  deleteJob
);
router.get("/get/:id", getSingleJob);

export default router;
