import React from "react";
import styled from "styled-components";
import {Rate} from "antd"
import { IMAGE_BASE_URL } from "../../../Components/Config";

const Chart = styled.div`
  float: bottom;
  width: 90%;
  height: 100%;
  border-radius: 5px;
  margin: 0 auto;
`;

const SectionTitle = styled.div`
  font-size: 20px;
  font-weight: 400;
  margin-top: 15px;
  margin-bottom: 15px;
  color: #f7f7f7;
  position: relative;
`;

const SectionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 160px);
  grid-gap: 10px;
`;

const PosterContainer = styled.div`
  font-size: 12px;
  text-align: center;
  width: 100%;
  margin-right: 1%;
`;

const PosterImage = styled.div`
  background-image: url(${props => props.bgUrl});
  width: 130px;
  height: 180px;
  background-size: cover;
  transition: all 0.1s linear 0s;
  position: relative;
  margin: 0 auto;
  border: 1px solid black;
`;

const PosterTitle = styled.div`
  font-size: 15px;
  color: #2e2e2e;
  margin: 0 auto;
  margin-top: 5px;
  margin-bottom: 5px;
`;

const RatingWapper = styled.div`
  margin: 0 auto;
`;

const PosterWrapper = styled.div`
  background-color: #c9c9c9;
  border: 1px solid #585858;
  width: 155px;
  height: 100%;
  padding: 5px;
  border-radius: 5px;
`;

const Nothing = styled.div`
  font-size: 20px;
  color: black;
  width: 100%;
  height: 100%;
  text-align: center;
  display: table;
`;

const RecentRating = ({ recent, user }) => {
  return (
    <Chart>
      <SectionTitle>
        {user.userData && user.userData.name}님의 최근 별점 목록
      </SectionTitle>
      {recent.length === 0 ? (
        <Nothing>
          <span
            style={{
              color: "#f7f7f7",
              display: "table-cell",
              verticalAlign: "middle",
            }}
          >
            최근 목록 없음
          </span>
        </Nothing>
      ) : (
        recent &&
        recent.length > 0 && (
          <SectionGrid>
            {recent.map((item, index) => (
              <PosterContainer key={index}>
                <PosterWrapper>
                  <PosterImage
                    bgUrl={`${IMAGE_BASE_URL}original${item.imageUrl}`}
                  />
                  <PosterTitle>
                    {item.title.length > 11
                      ? `${item.title.substring(0, 11)}...`
                      : item.title}
                  </PosterTitle>
                  <RatingWapper>
                    {/* <MyScoreRating number={item.score}/> */}
                    <Rate value={item.score} disabled style={{color:"#2e2e2e"}}/>
                  </RatingWapper>
                </PosterWrapper>
              </PosterContainer>
            ))}
          </SectionGrid>
        )
      )}
    </Chart>
  );
};

export default RecentRating;