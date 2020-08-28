import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Loader from "Components/Loader";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import Cast from "./Cast/Cast";
import Video from "./Video/Video";
import Favorite from "./Sections/Favorite";
import { IMAGE_BASE_URL } from "../../Components/Config";
import Recommendation from "./Recommendation/Recommendation";

const Container = styled.div`
  height: calc(100vh - 50px);
  width: 100vw;
  position: relative;
  padding: 50px;
  overflow: hidden;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Backdrop = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  filter: blur(0px);
  opacity: 0.5;
  z-index: 0;
`;

const Content = styled.div`
  display: flex;
  width: 100%;
  position: relative;
  z-index: 1;
  height: 100%;
`;

const Cover = styled.div`
  width: 30%;
  background-image: url(${props => props.bgImage});
  background-position: center center;
  background-size: cover;
  height: 100%;
  border-radius: 5px;
`;
const Data = styled.div`
  width: 65%;
  height: 100%;
  margin-left: 10px;
  overflow-x: auto;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none !important; // 윈도우 크롬 등
  }
`;

const Title = styled.h3`
  font-size: 2rem;
  font-weight: 200;
  line-height: 1.2;
  letter-spacing: -0.5px;
  text-transform: uppercase;
  margin-bottom: 0.5rem;
  display: flex;
  color: white;
`;

const ItemContainer = styled.div`
  margin: 20px 0;
`;

const Item = styled.span``;

const Divider = styled.span`
  margin: 0 10px;
`;

const Overview = styled.p`
  font-size: 17px;
  opacity: 0.9;
  line-height: 1.5;
  width: 50%;
  color: white;
`;

const Heading = styled.h3`
  color: var(--color-primary-dark);
  font-weight: 300;
  text-transform: uppercase;
  margin-bottom: 1rem;
  font-size: 1.4rem;
  margin-top: 10px;
  color: white;
  @media ${props => props.theme.mediaQueries.medium} {
    font-size: 1.2rem;
  }
`;

const ButtonsWrapper = styled.div`
  margin-top: -73px;
  display: flex;
  align-items: center;
  @media ${props => props.theme.mediaQueries.small} {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const DetailPresenter = ({
  result,
  loading,
  error,
  castResult,
  isMovie,
  video,
  recommendations,
}) => {
  return loading ? (
    <>
      <Helmet>
        <title>Detail | Nomflix</title>
      </Helmet>
      <Loader />
    </>
  ) : (
    <Container>
      <Helmet>
        <title>
          {result.title ? result.title : result.original_name} | Nomflix
        </title>
      </Helmet>
      <Backdrop bgImage={`${IMAGE_BASE_URL}original${result.backdrop_path}`} />
      <Content>
        <Cover bgImage={`${IMAGE_BASE_URL}original${result.poster_path}`} />
        <Data>
          <Title>{isMovie ? result.title : result.name}</Title>

          <ItemContainer>
            <Item>
              {isMovie
                ? result.release_date.substring(0, 4)
                : result.first_air_date.substring(0, 4)}
            </Item>

            <Divider>•</Divider>

            <Item>
              {isMovie ? result.runtime : result.episode_run_time[0]} min
            </Item>

            <Divider>•</Divider>

            <Item>
              {result.genres &&
                result.genres.map((genre, index) =>
                  index === result.genres.length - 1
                    ? genre.name
                    : `${genre.name} / `
                )}
            </Item>

            <Favorite
              isMovie={isMovie}
              movieInfo={result}
              movieId={parseInt(result.id)}
              userFrom={localStorage.getItem("userId")}
            />
          </ItemContainer>

          <Overview>{result.overview}</Overview>

          <Heading>The Cast</Heading>
          <Cast cast={castResult.cast} />

          <ButtonsWrapper>
            <Video video={video.results[0]} />
          </ButtonsWrapper>
          <Recommendation recommendation={recommendations.results} />
        </Data>
      </Content>
    </Container>
  );
};

DetailPresenter.propTypes = {
  castResult: PropTypes.object,
  result: PropTypes.object,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
  isMovie: PropTypes.bool,
};
export default withRouter(DetailPresenter);