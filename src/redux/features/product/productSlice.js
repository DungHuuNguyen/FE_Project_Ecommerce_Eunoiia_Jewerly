import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { productApis } from "../../../apis/productApis";

const initialState = {
  isLoading: false,
  products: [],
  productInfo: {},
  imgsProducts: [],
  errors: {},
  pagination: {
    currentPage: 1,
    limitPerPage: 8,
    total: 8,
  },
  searchKey: "",
  params: {
    _sort: null,
    _order: null,
    material: null,
    // brand: null,
    // q: "Rings", truyền vào q => nó sẽ search product theo key này
    // q: null,
    price_lte: null,
    price_gte: null,
    // price_lte: 5000000,
    // price_gte: 1500000,
  },
  filter: "",
};

export const actFetchAllProducts = createAsyncThunk(
  "products/fetchAllProducts",
  // Lấy total từ header response của json-server - key: json-server total count
  async (params = {}) => {
    const response = await productApis.getAllProducts({
      ...params,
    });
    return {
      data: response.data,
      total: response.headers.get("X-Total-Count"),
    };
  }
);

export const actFetchProductById = createAsyncThunk(
  "products/fetchProductById",
  async (productId) => {
    const product = await productApis.getProductsById(productId);
    return product;
  }
);

export const actFetchAllImgsProducts = createAsyncThunk(
  "products/fetchAllImgsProducts",
  async () => {
    const data = await productApis.getAllImgsProduct();
    return data;
  }
);

export const actUpdateProductById = createAsyncThunk(
  "products/updateProductById",
  async ({ id, productUpdate }, thunkAPI) => {
    await productApis.updateProductById(id, productUpdate);
    return productUpdate;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState: initialState,
  reducers: {
    actSetLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setNewPage: (state, action) => {
      state.pagination = {
        ...state.pagination,
        currentPage: action.payload,
      };
    },
    setSearchKey: (state, action) => {
      state.searchKey = action.payload;
    },
    filterReducer: (state, action) => {
      // console.log(action.payload, "action.payload filterreducer");
      state.filter = action.payload;

      switch (action.payload) {
        case "Name: A-Z":
          state.params._sort = "name";
          state.params._order = "asc";
          break;
        case "Name: Z-A":
          state.params._sort = "name";
          state.params._order = "desc";
          break;
        case "Price: Low to High":
          state.params._sort = "price";
          state.params._order = "asc";
          break;
        case "Price: High to Low":
          state.params._sort = "price";
          state.params._order = "desc";
          break;

        case "less than 1.500.000đ":
          state.params.price_gte = 0;
          state.params.price_lte = 1499999;
          state.params._sort = "price";
          state.params._order = "asc";
          break;
        case "1.500.000đ - 5.000.000đ":
          state.params.price_gte = 1500000;
          state.params.price_lte = 5000000;
          state.params._sort = "price";
          state.params._order = "asc";
          break;
        case "5.000.000đ - 10.000.000đ":
          state.params.price_gte = 5000000;
          state.params.price_lte = 10000000;
          state.params._sort = "price";
          state.params._order = "asc";
          break;
        case "greater than 10.000.000đ":
          state.params.price_gte = 10000000;
          state.params.price_lte = 9000000000000000;
          state.params._sort = "price";
          state.params._order = "asc";
          break;
        default:
          state.params._sort = "brands";
          state.params._order = "asc";
          break;
      }
      console.log({ ...state.params }, "state.params in filter reducer");
      if (action.payload === "material") {
        state.params.material_like = action.payload.value;
      }
    },

    deleteFilterReducer: (state, action) => {
      state.params = {
        _sort: null,
        _order: null,
        // brand: null,
        // q: null,
        price_lte: null,
        price_gte: null,
      };
    },
  },
  extraReducers: (builder) => {
    // fetch all products:
    builder.addCase(actFetchAllProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(actFetchAllProducts.rejected, (state, action) => {
      state.errors = {};
      state.isLoading = false;
    });
    builder.addCase(actFetchAllProducts.fulfilled, (state, action) => {
      // console.log(action.payload.data, "products fetch all");
      state.products = action.payload.data;
      state.pagination.total = action.payload.total;
      state.isLoading = false;
    });

    // fetch product by Id:
    builder.addCase(actFetchProductById.fulfilled, (state, action) => {
      state.productInfo = action.payload;
    });

    builder.addCase(actFetchAllImgsProducts.fulfilled, (state, action) => {
      state.imgsProducts = action.payload;
    });

    builder.addCase(actUpdateProductById.fulfilled, (state, action) => {
      state.productInfo = action.payload;
    });
  },
});

export const {
  actSetLoading,
  setNewPage,
  setSearchKey,
  filterReducer,
  deleteFilterReducer,
  setParams,
} = productSlice.actions;
export const productReducer = productSlice.reducer;
