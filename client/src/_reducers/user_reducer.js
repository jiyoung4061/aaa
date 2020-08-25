import {
  LOGIN_USER,
  REGISTER_USER,
  AUTH_USER,
  ADD_TO_MOVIE,
  //   LOGOUT_USER,
  GET_MOVIE_ITEMS,
  REMOVE_MOVIE_ITEM,
  ADD_TO_CART,
  GET_CART_ITEMS,
  REMOVE_CART_ITEM,
  ON_SUCCESS_BUY,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case LOGIN_USER:
      return { ...state, loginSuccess: action.payload };
    case REGISTER_USER:
      return { ...state, register: action.payload };
    case AUTH_USER:
      return { ...state, userData: action.payload };
    // case LOGOUT_USER:
    //   return { ...state };
    case ADD_TO_MOVIE:
      return {
        ...state,
        userData: {
          ...state.userData,
          movie: action.payload,
        },
      };
    case GET_MOVIE_ITEMS:
      return { ...state, movieDetail: action.payload };
    case REMOVE_MOVIE_ITEM:
      return {
        ...state,
        movieDetail: action.payload.movieInfo,
        userData: {
          ...state.userData,
          movie: action.payload.movie,
        },
      };
    case ADD_TO_CART:
      return {
        ...state,
        userData: {
          ...state.userData,
          cart: action.payload,
        },
      };
    case GET_CART_ITEMS:
      return { ...state, cartDetail: action.payload };
    case REMOVE_CART_ITEM:
      return {
        ...state,
        cartDetail: action.payload.productInfo,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    case ON_SUCCESS_BUY:
      return {
        ...state,
        cartDetail: action.payload.cartDetail,
        userData: {
          ...state.userData,
          cart: action.payload.cart,
        },
      };
    default:
      return state;
  }
}

// userData : action.payload에 아래 코드들이 들어간다.
// res.status(200).json({
//     _id: req.user._id,
//     isAdmin: req.user.role === 0 ? false : true,
//     isAuth: true,
//     email: req.user.email,
//     name: req.user.name,
//     lastname: req.user.lastname,
//     role: req.user.role,
//     image: req.user.image
//   })