import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { registerUser } from "../../_actions/user_action";
import "./SignUp.css";
import { withRouter } from "react-router-dom";
import Dropzone from "react-dropzone";
import Axios from "axios";
import { LOCAL_SERVER } from "../../Components/Config";
function SignUp(props) {
  const dispatch = useDispatch();

  const [Email, setEmail] = useState("");
  const [Name, setName] = useState("");
  const [Password, setPassword] = useState("");
  const [ConfirmPassword, setConfirmPassword] = useState("");
  const [FilePath, setFilePath] = useState("uploads/default.png");
  const [FileName, setFileName] = useState("");
  const [Gender, setGender] = useState("");

  const onEmailHandler = event => {
    setEmail(event.currentTarget.value);
  };

  const onNameHandler = event => {
    setName(event.currentTarget.value);
  };

  const onPasswordHandler = event => {
    setPassword(event.currentTarget.value);
  };

  const onConfirmPasswordHandler = event => {
    setConfirmPassword(event.currentTarget.value);
  };

  const onGenderHandler = event => {
    setGender(event.currentTarget.value);
  };

  const onDrop = files => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    Axios.post("/api/image/uploadfiles", formData, config).then(response => {
      if (response.data.success) {
        setFilePath(
          response.data.filePath
            ? response.data.filePath
            : "uploads/default.png"
        );
        setFileName(response.data.fileName);
      } else {
        alert("failed to save the video in server");
      }
    });
  };
  const onSubmitHandler = event => {
    event.preventDefault(); //페이지 refresh 방지

    if (Password !== ConfirmPassword) {
      return alert("비밀번호와 비밀번호 확인은 같아야 합니다.");
    }

    let body = {
      email: Email,
      password: Password,
      name: Name,
      image: FilePath,
      gender: Gender,
    }; 

    // redux action => loginUser는 action이름
    dispatch(registerUser(body)).then(response => {
      if (response.payload.success) {
        props.history.push("/sign-in");
        alert("회원가입 성공!");
      } else {
        alert("회원가입 실패");
      }
    });
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-inner">
        <form onSubmit={onSubmitHandler} style={{ margin: "0" }}>
          <div className="form-group" style={{ textAlign: "center" }}>
            <label style={{ marginBottom: "10px", display: "inline-block" }}>
              프로필 이미지
            </label>
            <br />
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: "30px",
              }}
            >
              <Dropzone onDrop={onDrop} multiple={false} maxSize={800000000}>
                {({ getRootProps, getInputProps }) => (
                  <div
                    style={{
                      width: "60px",
                      height: "50px",
                      border: "1px solid lightgray",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    {...getRootProps()}
                  >
                    <input {...getInputProps()} />
                    <img
                      style={{
                        display: "flex",
                        borderRadius: "30%",
                        justifyContent: "center",
                      }}
                      src={
                        FilePath
                          ? `${LOCAL_SERVER}${FilePath}`
                          : `${LOCAL_SERVER}uploads/default.png`
                      }
                      alt="haha"
                      width="110px"
                      height="110px"
                    />
                  </div>
                )}
              </Dropzone>
              
            </div>
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>이메일</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter Email"
              value={Email}
              onChange={onEmailHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>이름</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={Name}
              onChange={onNameHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>비밀번호</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={Password}
              onChange={onPasswordHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>비밀번호 확인</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={ConfirmPassword}
              onChange={onConfirmPasswordHandler}
            />
          </div>
          <div className="form-group">
            <label style={{ marginBottom: "5px" }}>성별</label>
            <br />
            <label style={{ marginRight: "10px", fontSize: "20px" }}>
              남자
            </label>
            <input
              type="radio"
              className="form-control-radio"
              value={"male"}
              name={Gender}
              onClick={onGenderHandler}
              style={{ marginRight: "20px" }}
            />
            <label style={{ marginRight: "10px", fontSize: "20px" }}>
              여자
            </label>
            <input
              type="radio"
              className="form-control-radio"
              value={"female"}
              name={Gender}
              onClick={onGenderHandler}
            />
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            회원 가입
          </button>
        </form>
      </div>
    </div>
  );
}

export default withRouter(SignUp);
