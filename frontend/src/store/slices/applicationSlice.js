import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const applicationSlice = createSlice({
  name: "applications",
  initialState: {
    applications: [],
    loading: false,
    error: null,
    message: null,
  },

  reducers: {
    requestForAllApplication(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForAllApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failedForAllApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForMyApplication(state, action) {
      state.loading = true;
      state.error = null;
    },
    successForMyApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.applications = action.payload;
    },
    failedForMyApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    requestForPostApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForPostApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failedForPostApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    requestForDeleteApplication(state, action) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    successForDeleteApplication(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    failureForDeleteApplication(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state, action) {
      state.error = null;
      state.applications = state.applications;
    },
    resetApplicationSlice(state, action) {
      state.error = null;
      state.applications = state.applications;
      state.message = null;
      state.loading = false;
    },
  },
});
export const fetchEmployerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForAllApplication());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/employer/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForAllApplication(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failedForAllApplication(
        error.response.data.message
      )
    );
  }
};
export const fetchJobSeekerApplications = () => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForMyApplication());
  try {
    const response = await axios.get(
      `http://localhost:4000/api/v1/application/jobseeker/getall`,
      {
        withCredentials: true,
      }
    );
    dispatch(
      applicationSlice.actions.successForMyApplication(
        response.data.applications
      )
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failedForMyApplication(
        error.response.data.message
      )
    );
  }
};

export const postApplication = (data, jobId) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForPostApplication());
  try {
    const response = await axios.post(
      `http://localhost:4000/api/v1/application/post/${jobId}`,
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(
      applicationSlice.actions.successForPostApplication(response.data.message)
    );
    dispatch(applicationSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failedForPostApplication(
        error.response.data.message
      )
    );
  }
};

export const deleteApplication = (id) => async (dispatch) => {
  dispatch(applicationSlice.actions.requestForDeleteApplication());
  try {
    const response = await axios.delete(
      `http://localhost:4000/api/v1/application/delete/${id}`,
      { withCredentials: true }
    );
    dispatch(
      applicationSlice.actions.successForDeleteApplication(
        response.data.message
      )
    );
    dispatch(clearAllApplicationsErrors());
  } catch (error) {
    dispatch(
      applicationSlice.actions.failureForDeleteApplication(
        error.response.data.message
      )
    );
  }
};

export const clearAllApplicationsErrors = () => (dispatch) => {
  dispatch(applicationSlice.actions.clearAllErrors());
};

export const resetApplicationSlice = () => (dispatch) => {
  dispatch(applicationSlice.actions.resetApplicationSlice());
};

export default applicationSlice.reducer;
