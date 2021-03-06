import React from "react";
import { shallow } from "enzyme";
import { News, mapStateToProps } from "./News";
import MockData from "../../assets/mockData";

let mockNews = MockData.newsResults;

describe("News", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<News news={mockNews} />);
  });

  it("should match the snapshot", () => {
    expect(wrapper).toMatchSnapshot();
  });

  it("should have a default state", () => {
    expect(wrapper.state()).toEqual({
      slidesPosition: 7
    });
  });

});

describe("mapStateToProps", () => {
  it("should return an object", () => {
    const mockData = {
      news: []
    };
    const expected = {
      news: []
    };

    const mockprops = mapStateToProps(mockData);
    expect(mockprops).toEqual(expected);
  });
});
