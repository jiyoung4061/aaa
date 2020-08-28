import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  getMovieItems,
  removeMovieItem,
  getCartItems,
  removeCartItem,
  onSuccessBuy,
} from "../../_actions/user_action";
import UserMovie from "./Sections/UserMovie";
import { Empty, Result } from "antd";
import CartPage from "../Product/CartPage/CartPage";
import styled from "styled-components";

const Button1 = styled.button`
  color: #9c88ff;
  border: 3px solid #9c88ff;
  border-radius: 5px;
  font-size: 18px;
  font-weight: 600;
  background-color: #151515;
  margin-left: 20px;
  padding: 5px;
  box-shadow: 0 1.5rem 2rem rgba(156, 136, 255, 0.2);
`;

function MyMovie(props) {
  const dispatch = useDispatch();
  const [ShowTotalMovie, setShowTotalMovie] = useState(true);
  const [ShowTotalProduct, setShowTotalProduct] = useState(true);
  const [Total, setTotal] = useState(0);
  const [ShowSuccess, setShowSuccess] = useState(false);
  useEffect(() => {
    let movieObjIds = [];
    let cartItems = [];
    //리덕스 User state안에 movie안에 결재내역이 있는지 확인
    if (props.user.userData && props.user.userData.movie) {
      if (props.user.userData.movie.length > 0) {
        props.user.userData.movie.forEach(item => {
          movieObjIds.push(item._id);
        });
        dispatch(getMovieItems(movieObjIds, props.user.userData.movie));
      }
    }

    //redux User state안에 Cart 안에 상품이 들어 있는지 확인
    if (props.user.userData && props.user.userData.cart) {
      if (props.user.userData.cart.length > 0) {
        props.user.userData.cart.forEach(item => {
          cartItems.push(item.id);
        });
        dispatch(getCartItems(cartItems, props.user.userData.cart)).then(
          response => {
            calculateTotal(response.payload);
          }
        );
      }
    }
  }, [props.user.userData, dispatch]);

  let calculateTotal = cartDetail => {
    let total = 0;
    cartDetail.forEach(item => {
      total += parseInt(item.price, 10) * item.quantity;
    });

    setTotal(total);
  };

  const removeFromMovie = movieObjId => {
    dispatch(removeMovieItem(movieObjId)).then(response => {
      if (response.payload.movieInfo.length <= 0) {
        setShowTotalMovie(false);
      }
    });
  };

  let removeFromCart = productId => {
    dispatch(removeCartItem(productId)).then(response => {
      if (response.payload.productInfo.length <= 0) {
        setShowTotalProduct(false);
      }
    });
  };

  const transactionSuccess = data => {
    dispatch(
      onSuccessBuy({
        paymentData: data,
        cartDetail: props.user.cartDetail,
      })
    ).then(response => {
      if (response.payload.success) {
        setShowTotalProduct(false);
        setShowSuccess(true);
      }
    });
  };

  const onKaKaoPay = () => {
    var IMP = window.IMP; // 생략가능
    IMP.init("imp10561880");
    // 'iamport' 대신 부여받은 "가맹점 식별코드"를 사용

    IMP.request_pay(
      {
        pg: "inicis", // version 1.1.0부터 지원.
        pay_method: "card",
        merchant_uid: "merchant_" + new Date().getTime(),
        name: props.user.cartDetail[0].title + " 외",
        amount: Total,
        buyer_email: props.user.userData.email,
        buyer_name: props.user.userData.name,
        buyer_tel: "010-1234-5678",
        buyer_addr: "서울특별시 강남구 삼성동",
        buyer_postcode: "123-456",
        m_redirect_url: "https://www.yourdomain.com/payments/complete",
      },
      function (rsp) {
        if (rsp.success) {
          var id = {
            uid: rsp.imp_uid,
          };
          var msg = "결제가 완료되었습니다.";
          msg += "고유ID : " + rsp.imp_uid;
          msg += "상점 거래ID : " + rsp.merchant_uid;
          msg += "결제 금액 : " + rsp.paid_amount;
          transactionSuccess(id);
        } else {
          msg = "결제에 실패하였습니다.";
          msg += "에러내용 : " + rsp.error_msg;
        }
        alert(msg);
      }
    );
  };

  return (
    <div style={{ width: "85%", margin: "4rem auto" }}>
      <h1 style={{ color: "white", fontSize: "30px" }}>My Product</h1>
      <br />
      <div>
        <CartPage
          products={props.user.cartDetail && props.user.cartDetail}
          removeItem={removeFromCart}
        />
        {ShowTotalProduct ? (
          <div
            style={{
              marginTop: "1rem",
              fontSize: "35px",
              color: "white",
              textAlign: "right",
              width: "100%",
            }}
          >
            <h4 style={{ color: "#f7f7f7" }}>
              총 금액:
              <span style={{ color: "#f7f7f7" }}>{Total}</span>
              <b>원</b>
            </h4>
          </div>
        ) : ShowSuccess ? (
          <Result status="success" title="Success!" />
        ) : (
          <>
            <br />
            <Empty description={false} />
          </>
        )}
        <div style={{ textAlign: "right", paddingTop: "2%" }}>
          {ShowTotalProduct && (
            <Button1 variant="contained" color="primary" onClick={onKaKaoPay}>
              주문하기
            </Button1>
          )}
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <hr style={{ color: "white", border: "thin solid white" }} />
      <br />
      <br />
      <hr />
      <h1 style={{ color: "white", fontSize: "30px" }}>My Movie</h1>
      <br />
      <div>
        <UserMovie
          movies={props.user.movieDetail && props.user.movieDetail}
          removeItem={removeFromMovie}
        />
        {ShowTotalMovie ? <br /> : <Empty description={false} />}
      </div>
    </div>
  );
}

export default MyMovie;
