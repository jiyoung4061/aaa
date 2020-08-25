import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import Section from "Components/Section";
import Loader from "../../Components/Loader";
import Message from "../../Components/Message";
import Poster from "../../Components/Poster";
import Helmet from "react-helmet";
import { withRouter } from "react-router-dom";
import { Carousel } from "antd";
const Container = styled.div`
  scroll-behavior: smooth;
  margin-top: -50px;
  z-index: -1;
`;
const Effect = styled.div`
  width: 100%;
  margin-top: 600px;
`;
const TopSection = styled.div`
  margin-top: -160px;
`;
const Hero = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
`;
const HeroContent = styled.div`
  position: relative;
  z-index: 4;
  width: auto;
  left: 10px;
  top: 10px;
`;
const HeroContentText = styled.span`
  font-size: 60px;
`;
const HeroContentP = styled.div`
  width: 100%;
  font-size: 20px;
  margin-top: 40px;
  color: white;
`;
const HomePresenter = ({
  nowPlaying,
  upcoming,
  loading,
  error,
}) => (
  <>
    <Helmet>
      <title>Movies | Nomflix</title>
    </Helmet>
    {loading ? (
      <Loader />
    ) : (
      <>
        <Container>
          <Carousel autoplay>
            <div>
              <div style={{ position: "absolute" }}>
                <img
                  src="https://cdna.artstation.com/p/assets/images/images/017/022/542/large/amirhosein-naseri-desktop-screenshot-2019-04-03-18-17-47-11.jpg?1554338571"
                  alt="1"
                  style={{
                    position: "releative",
                    height: "100%",
                  }}
                />
              </div>
              <Hero>
                <Effect>
                  <HeroContent>
                    <HeroContentText></HeroContentText>
                    <HeroContentP>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </HeroContentP>
                  </HeroContent>
                </Effect>
              </Hero>
            </div>
            <div>
              <div style={{ position: "absolute" }}>
                <img
                  src="https://i0.wp.com/www-images.theonering.org/torwp/wp-content/uploads/2014/10/HBFA_30sht_Azog_RGB_INTL_master.jpg"
                  alt="2"
                />
              </div>
              <Hero>
                <Effect>
                  <HeroContent>
                    <HeroContentText></HeroContentText>
                  </HeroContent>
                </Effect>
              </Hero>
            </div>
            <div>
              <div style={{ position: "absolute" }}>
                <img
                  width="99%"
                  src="https://d13ezvd6yrslxm.cloudfront.net/wp/wp-content/images/zz409b4c4c.jpg"
                  alt="3"
                />
              </div>
              <Hero>
                <Effect>
                  <HeroContent>
                    <HeroContentText></HeroContentText>
                    <HeroContentP>
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                      <br />
                    </HeroContentP>
                  </HeroContent>
                </Effect>
              </Hero>
            </div>
          </Carousel>
          <br />
          <Helmet>
            <title>Movies | Nomflix</title>
          </Helmet>
          <br />
          <br />
          <br />
          <br />
          <br />
          <br />
          <TopSection>
            {/* 현재 상영중 */}
            {nowPlaying && nowPlaying.length > 0 && (
              <Section title="Now Playing" nowPlaying={nowPlaying}>
                {nowPlaying.map((movie) => (
                  <Poster
                  key={movie.id}
                  id={movie.id}
                  imageUrl={movie.poster_path}
                  title={movie.title}
                  rating={movie.vote_average}
                  year={movie.release_date.substring(0, 4)}
                  isMovie={true}
                  />
                  )
                  )
                }
                </Section>
            )}
            {upcoming && upcoming.length > 0 && (
              <Section title="Upcoming">
                {upcoming.map(movie => (
                  <Poster
                    key={movie.id}
                    id={movie.id}
                    imageUrl={movie.poster_path}
                    title={movie.title}
                    rating={movie.vote_average}
                    year={movie.release_date.substring(0, 4)}
                    isMovie={true}
                  />
                ))}
              </Section>
            )}
          </TopSection>
          {error && <Message color="#e74c3c" text={error} />}
        </Container>
      </>
    )}
  </>
);

HomePresenter.propTypes = {
  nowPlaying: PropTypes.array,
  popular: PropTypes.array,
  upcoming: PropTypes.array,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};
export default withRouter(HomePresenter);
//프리젠터는 그 데이터들을 보여주는 역할을 한다. 프리젠터는 스타일이고, 컨테이너는 데이타야.
//react에서 children은 일반적으로 태그 사이의 값을 받아.
