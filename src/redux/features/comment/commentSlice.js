import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { commentApis } from "../../../apis/commentApis";
import { message } from "antd";

const initialState = {
  isLoading: false,
  errors: {},
  comments: [],
  commentsCalcuStarAverage: [],
  comment: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 5,
    total: 25,
  },
};

export const actFetchAllComments = createAsyncThunk(
  "comment/fetchAllComments",
  async (params = {}) => {
    const response = await commentApis.getAllComments(params);
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const actFetchAllCommentsCalcuStarAverage = createAsyncThunk(
  "comment/fetchAllCommentsCalcuStarAverage",
  async (params = {}) => {
    const response = await commentApis.getAllComments(params);
    return response.data;
  }
);

export const actAddComment = createAsyncThunk(
  "comment/addComment",
  async (comment) => {
    const response = await commentApis.addComment(comment);
    return response;
  }
);

export const actFetchCommentById = createAsyncThunk(
  "comment/fetchCommentById",
  async (id) => {
    const response = await commentApis.getCommentById(id);
    console.log(response, "fetch comment by id");
    return response.data;
  }
);

export const actEditCommentById = createAsyncThunk(
  "comment/editCommentById",
  async ({ id, commentUpdate }) => {
    const response = await commentApis.editCommentById(id, commentUpdate);
    return response;
  }
);

const commentSlice = createSlice({
  name: "comment",
  initialState: initialState,
  reducers: {
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
  },
  extraReducers: (builder) => {
    builder.addCase(actFetchAllComments.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllComments.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = {};
    });
    builder.addCase(actFetchAllComments.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comments = action.payload.data;
      state.pagination.total = action.payload.total;
    });

    builder.addCase(
      actFetchAllCommentsCalcuStarAverage.fulfilled,
      (state, action) => {
        state.isLoading = false;
        state.commentsCalcuStarAverage = action.payload;
      }
    );

    builder.addCase(actAddComment.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actAddComment.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = {};
      message.error("add review product failure!");
    });
    builder.addCase(actAddComment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.comment = action.payload;
      state.comments.push(action.payload);
      state.commentsCalcuStarAverage.push(action.payload);
      message.success("add review product success!");
    });

    builder.addCase(actEditCommentById.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actEditCommentById.rejected, (state, action) => {
      state.isLoading = false;
      state.errors = {};
      message.error("update review product failure!");
    });
    builder.addCase(actEditCommentById.fulfilled, (state, action) => {
      console.log(action.payload, "edit comment fulfilled ne");
      message.success("update review product success!");
    });
  },
});

export const { setNewPage } = commentSlice.actions;
export const commentReducer = commentSlice.reducer;
