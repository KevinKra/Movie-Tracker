import React from "react";
import { shallow } from "enzyme";
import { GenrePage } from "./GenrePage";
import MockData from "../../assets/mockData";

let mockMoviesProps = MockData.popularMovies;
let mockTvProps = MockData.popularShows;
let mockFavoritesProp = MockData.favoritedMovies;
let mockSeachProps = MockData.searchResults;
let mockGenreProps = MockData.genreResults;
let mockLocation = jest.fn();


describe("GenrePage", () => {
  let wrapper;
  
  beforeEach(() => {
    wrapper = shallow(
      <GenrePage
        location={mockLocation}
        movie={mockMoviesProps}
        tv={mockTvProps}
        favoriteList={mockFavoritesProp}
        searchResults={mockSeachProps}
        genre={mockGenreProps}
      />
    );
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });


});