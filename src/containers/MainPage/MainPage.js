import React from "react";
import SplashImage from "../SplashImage/SplashImage";
import Carousel from "../Carousel/Carousel";
import MovieCard from "../MovieCard/MovieCard";
import { NavLink, Link } from "react-router-dom";
import GenrePage from "../GenrePage/GenrePage";
import News from "../News/News";
import { apiKey } from "../../api/apiKey";
import { nytApiKey } from "../../api/nytApiKey";
import Footer from "../Footer/Footer";
import PropTypes from "prop-types";
import "./_MainPage.scss";
import * as actions from "../../actions/index";
import { connect } from "react-redux";
import { fetchData } from "../../apiCalls/apiCalls";

export class MainPage extends React.Component {
  state = {
    movieUrl: "https://api.themoviedb.org/3",
    newsUrl: "https://api.nytimes.com/svc",
    showPopUp: false,
    error: ""
  };
  componentDidMount() {
    this.renderNewsResults();
    this.fetchPopularMovies();
    this.fetchPopularTvShows();
    this.fetchComingSoon();
  }

  fetchPopularMovies = () => {
    fetchData(
      `${this.state.movieUrl}/discover/movie?${apiKey}&sort_by=popularity.desc`
    )
      .then(response => this.props.fetchPopularMovies(response.results))
      .catch(error => this.setState({ error }));
  };

  renderPopularMovies = () => {
    return this.props.movies.map(movie => (
      <MovieCard
        key={movie.id}
        wholeObj={movie}
        title={movie.title}
        img={movie.backdrop_path}
      />
    ));
  };

  fetchPopularTvShows = () => {
    fetchData(
      `${this.state.movieUrl}/discover/tv?${apiKey}&sort_by=popularity.desc`
    )
      .then(response => this.props.fetchPopularTv(response.results))
      .catch(error => this.setState({ error }));
  };

  renderPopularTvShows = () => {
    return this.props.tv.map(tvShow => (
      <MovieCard
        key={tvShow.id}
        wholeObj={tvShow}
        title={tvShow.name}
        img={tvShow.backdrop_path}
      />
    ));
  };

  fetchComingSoon = () => {
    fetchData(`${this.state.movieUrl}/movie/upcoming?${apiKey}`)
      .then(response => this.props.fetchUpcoming(response.results))
      .catch(error => this.setState({ error }));
  };

  renderComingSoon = () => {
    return this.props.upcoming.map(film => (
      <MovieCard
        key={film.id}
        wholeObj={film}
        title={film.title}
        img={film.backdrop_path}
      />
    ));
  };

  renderNewsResults = () => {
    fetchData(`${this.state.newsUrl}/topstories/v2/movies.json?${nytApiKey}`)
      .then(response => this.props.fetchNews(response.results))
      .catch(error => this.setState({ error }));
  };

  handleClick = endPath => {
    fetchData(
      `${this.state.movieUrl}/discover/movie?${apiKey}${endPath}&page=3`
    )
      .then(response => this.props.fetchGenres(response.results))
      .catch(error => this.setState({ error }));
  };

  render() {
    return (
      <main className="main-page">
        <div>
          <SplashImage />
          <div className="under-splash">
            <section className="major-release-container">
              <h1 className="container-title">Major Releases</h1>
              <section className="major-release-section">
                <article className="main-release" />
                <article className="main-release" />
                <News />
              </section>
            </section>
            <section className="genre-container">
              <h1 className="container-title">Genres</h1>
              <section className="genres">
                <NavLink
                  to="/ActionMovies"
                  data-test="genre-click-event"
                  className="genre action"
                  onClick={() => this.handleClick("&with_genres=28")}
                >
                  <div>
                    <h1 className="genreTitle">Action</h1>
                  </div>
                </NavLink>
                <Link
                  to="/ComedyMovies"
                  className="genre comedy"
                  onClick={() => this.handleClick("&with_genres=35")}
                >
                  <div>
                    <h1 className="genreTitle">Comedy</h1>
                  </div>
                </Link>
                <Link
                  to="/Documentaries"
                  className="genre documentaries"
                  onClick={() => this.handleClick("&with_genres=99")}
                >
                  <div>
                    <h1 className="genreTitle">Documentaries</h1>
                  </div>
                </Link>
                <Link
                  to="/FamilyMovies"
                  className="genre family"
                  onClick={() => this.handleClick("&with_genres=10751")}
                >
                  <div>
                    <h1 className="genreTitle">Family</h1>
                  </div>
                </Link>
                <Link
                  to="/HorrorMovies"
                  className="genre horror"
                  onClick={() => this.handleClick("&with_genres=27")}
                >
                  <div>
                    <h1 className="genreTitle">Horror</h1>
                  </div>
                </Link>
                <Link
                  to="/RomanceMovies"
                  component={GenrePage}
                  className="genre romance"
                  onClick={() => this.handleClick("&with_genres=10749")}
                >
                  <div>
                    <h1 className="genreTitle">Romance</h1>
                  </div>
                </Link>
              </section>
              <section className="carousel-section">
                <h1>Popular Movies</h1>
                <Carousel>{this.renderPopularMovies()}</Carousel>
                <h1>Popular TV Shows</h1>
                <Carousel>{this.renderPopularTvShows()}</Carousel>
                <h1>Coming to theaters soon</h1>
                <Carousel>{this.renderComingSoon()}</Carousel>
              </section>
            </section>
          </div>
        </div>
        <Footer />
      </main>
    );
  }
}

MainPage.propTypes = {
  movies: PropTypes.array.isRequired,
  tv: PropTypes.array.isRequired,
  upcoming: PropTypes.array.isRequired,
  news: PropTypes.array,
  genre: PropTypes.array.isRequired,
  fetchPopularMovies: PropTypes.func,
  fetchPopularTv: PropTypes.func,
  fetchUpcoming: PropTypes.func,
  fetchNews: PropTypes.func,
  fetchGenres: PropTypes.func
};

export const mapStateToProps = state => {
  return {
    movies: state.movies,
    tv: state.tv,
    upcoming: state.upcoming,
    news: state.news,
    genre: state.genre
  };
};

export const mapDispatchToProps = dispatch => ({
  fetchPopularMovies: popularMovies =>
    dispatch(actions.fetchPopularMovies(popularMovies)),
  fetchPopularTv: popularTv => dispatch(actions.fetchPopularTv(popularTv)),
  fetchUpcoming: upcoming => dispatch(actions.fetchUpcoming(upcoming)),
  fetchNews: news => dispatch(actions.fetchNews(news)),
  fetchGenres: genres => dispatch(actions.fetchGenres(genres))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
