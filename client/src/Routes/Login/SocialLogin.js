import React from "react";
import GoogleLogin from "react-google-login";
import KaKaoLogin from "react-kakao-login";
import Axios from "axios";
import { withRouter } from "react-router-dom";
import styled from "styled-components";
import { GOOGLE_KEY, KAKAO_KEY } from "../../Components/Config";

const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  // height:100px;
  `;

const KaKaoBtn = styled(KaKaoLogin)`
  width: 100%;
  height: 38px;
  color: #783c00;
  background-color: #EFEFEF;
  border: 1px solid transparent;
  border-radius: 5px;
  font-size: 14px;
  font-weight: bold;
  text-align: center;
  cursor: pointer;
  &:hover {
    box-shadow: 0 0px 15px 0 rgba(0, 0, 0, 0.2);
  };
  display: flex;
  flexDirection: row;
  justifyContent: center;
  `;
const ButtonWrapper = styled.div`
  width: 100%;
  margin-top: 10px;
  text-align: center;
  `;
const ButtonImageWrapper = styled.div`
width: 30%;
margin-top: 3px; 
`;
const ButtonTextWrapper = styled.div`
height: 100%; 
margin-top: 10px;
`;
const ButtonText = styled.span`
font-size: 14px;
font-weight: bold;
color: #5C3C00;
`;
function SocialLogin(props) {
  const responseGoogle = response => {
    const data = {
      tokenId: response.tokenId,
    };
    Axios.post("/api/users/googlelogin", data).then(response => {
      if (response.data.loginSuccess) {
        window.localStorage.setItem("userId", response.data.userId);
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };
  const responseKaKao = response => {
    const data = response;
    Axios.post("/api/users/kakaologin", data).then(response => {
      if (response.data.loginSuccess) {
        window.localStorage.setItem("userId", response.data.userId);
        props.history.push("/");
      } else {
        alert("로그인 실패");
      }
    });
  };
  return (
    <Container>
      <ButtonWrapper>
        <GoogleLogin
          clientId={GOOGLE_KEY}
          render={renderProps => (
            <button
              className="c-flex"
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
              style={{
                width: "100%",
                border: " 1px solid transparent",
                borderRadius: "5px",
                height: "38px",
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
              }}
            >
              <ButtonImageWrapper>
                <img
                  src={require("./img/google5.png")}
                  style={{ width: "60%", }}
                  alt="Google Logo"
                />
              </ButtonImageWrapper>
              <ButtonTextWrapper>
                <ButtonText>구글 로그인</ButtonText>
              </ButtonTextWrapper>
            </button>
          )}
          buttonText=""
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
          scope="email"
        />
      </ButtonWrapper>
      <div style={{ width: "5%" }}></div>
      <ButtonWrapper>
        <KaKaoBtn
          //styled component 통해 style을 입혀 줄 예정
          jsKey={KAKAO_KEY}
          //카카오에서 할당받은 jsKey를 입력
          // buttonText="Kakao 로그인"
          //로그인 버튼의 text를 입력
          onSuccess={responseKaKao}
          //성공했을때 불러올 함수로서 fetch해서 localStorage에 저장할 함수를 여기로 저장
          getProfile={true}
        >
          <ButtonImageWrapper style={{ marginTop: "5px" }}>
            <img
              src={require("./img/kakao.png")}
              style={{ width: "60%", }}
              alt="Kakao Logo"
            />
          </ButtonImageWrapper>
          <ButtonTextWrapper>
            <ButtonText>Kakao 로그인</ButtonText>
          </ButtonTextWrapper>
        </KaKaoBtn>
      </ButtonWrapper>
    </Container>
  );
}
export default withRouter(SocialLogin);
