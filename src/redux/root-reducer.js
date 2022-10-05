import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import signinReducer from "./auth-redux/signin.slice";
import orderProductsreducer from "./order-product/product.slice";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
  whitelist: ["regions", "signin"],
};

const rootReducer = combineReducers({
  signin: signinReducer,
  orderProduct: orderProductsreducer,
});

export default persistReducer(persistConfig, rootReducer);
