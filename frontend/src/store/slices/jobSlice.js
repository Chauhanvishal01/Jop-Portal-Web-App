import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const jobSlice = createSlice({
  name: "jobs",
  initialState: {
    jobs: [],
    loading: false,
    error: null,
    message: null,
    singleJob: {},
    myJobs: [],
  },
  reducers: {
    requestForAllJobs(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllJobs(state, action) {
      state.loading = false;
      state.jobs = action.payload;
      state.error = null;
    },
    failedForAllJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForSingleJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForSingleJob(state, action) {
      state.loading = false;
      state.error = null;
      state.singleJob = action.payload;
    },
    failedForSingleJob(state, action) {
      state.singleJob = action.singleJob;
      state.error = action.payload;
      state.loading = false;
    },
    requestForPostJob(state, action) {
      state.message = null;
      state.error = null;
      state.loading = true;
    },
    successForPostJob(state, action) {
      state.message = action.payload;
      state.error = null;
      state.loading = false;
    },
    failureForPostJob(state, action) {
      state.message = null;
      state.error = action.payload;
      state.loading = false;
    },
    requestForMyJobs(state, action) {
      state.loading = true;
      state.myJobs = [];
      state.error = null;
    },
    successForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = action.payload;
      state.error = null;
    },
    failuretForMyJobs(state, action) {
      state.loading = false;
      state.myJobs = state.myJobs;
      state.error = action.payload;
    },
    requestForDeletemyJobs(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeletemyJobs(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeletemyJobs(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErros(state, action) {
      state.error = null;
      state.jobs = state.jobs;
    },
    resetJobSlice(state, action) {
      state.error = null;
      state.jobs = state.jobs;
      state.loading = false;
      state.message = null;
      state.myJobs = state.myJobs;
      state.singleJob = {};
    },
  },
});

export const fetchjobs =
  (city, niche, searchKeyword = "") =>
  async (dispatch) => {
    try {
      dispatch(jobSlice.actions.requestForAllJobs());
      let link = "http://localhost:4000/api/v1/job/getall?";
      let queryParams = [];
      if (searchKeyword) {
        queryParams.push(`searchKeyword=${searchKeyword}`);
      }
      if (city) {
        queryParams.push(`city=${city}`);
      }
      if (niche) {
        queryParams.push(`niche=${niche}`);
      }
      link += queryParams.join("&");
      const response = await axios.get(link, { withCredentials: true });
      dispatch(jobSlice.actions.successForAllJobs(response.data.jobs));
      dispatch(jobSlice.actions.clearAllErros());
    } catch (error) {
      dispatch(jobSlice.actions.failedForAllJobs(error?.response?.data.message));
    }
  };

export const fetchSingleJob = (jobId) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForSingleJob());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/get/${jobId}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForSingleJob(response.data.job));
    dispatch(jobSlice.actions.clearAllErros());
  } catch (error) {
    dispatch(jobSlice.actions.failedForSingleJob(error.response.data.message));
  }
};

export const postJob = (data) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForPostJob());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/job/post`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(jobSlice.actions.successForPostJob(response.data.message));
    dispatch(jobSlice.actions.clearAllErros());
  } catch (error) {
    dispatch(jobSlice.actions.failureForPostJob(error.response.data.message));
  }
};

export const getMyJobs = () => async (dispatch) => {
  dispatch(jobSlice.actions.requestForMyJobs());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/job/getmyjobs`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForMyJobs(response.data.myJobs));
    dispatch(jobSlice.actions.clearAllErros());
  } catch (error) {
    dispatch(jobSlice.actions.failuretForMyJobs(error.response.data.message));
  }
};

export const deleteJob = (id) => async (dispatch) => {
  dispatch(jobSlice.actions.requestForDeletemyJobs());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/job/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(jobSlice.actions.successForDeletemyJobs(response.data.message));
    dispatch(clearAllJobsErrors());
  } catch (error) {
    dispatch(
      jobSlice.actions.failureForDeletemyJobs(error.response.data.message)
    );
  }
};

export const clearAllJobsErrors = () => (dispatch) => {
  dispatch(jobSlice.actions.clearAllErros());
};

export const resetJobSlice = () => (dispatch) => {
  dispatch(jobSlice.actions.resetJobSlice());
};

export default jobSlice.reducer;
