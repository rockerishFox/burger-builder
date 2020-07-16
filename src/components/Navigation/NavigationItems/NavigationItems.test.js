import React from "react";

// enzyme lets you run isolated tests, where we don't need to render the complete app
// shallow renders a component without deep copying it
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

import NavigationItems from "./NavigationItems";
import NavigationItem from "./NavigationItem/NavigationItem";

configure({ adapter: new Adapter() }); // this is how we connect enzyme

// first parameter: a descripiton = what will be shown in the console
describe("<NavigationItems />", () => {
  // actual test

  let wrapper;
  // function that executes before each test
  beforeEach(() => {
    // we are shallow-rendering the component we need
    wrapper = shallow(<NavigationItems />);
  });

  // it => one test
  it("should render two <NavigationItem /> elementes if not authenticated", () => {
    // we don't pass the isAuthenticated prop so it should be false => user is not authenticated

    // what we want to check
    // we expect to find 2 navItem elements when not authenticated
    expect(wrapper.find(NavigationItem)).toHaveLength(2);
  });

  it("should render three <NavigationItem /> elementes if authenticated", () => {
    wrapper.setProps({
      isAuthenticated: true,
    });
    expect(wrapper.find(NavigationItem)).toHaveLength(3);
  });

  it("should render a logout <NavigationItem /> element if authenticated", () => {
    wrapper.setProps({
      isAuthenticated: true,
    });
    expect(
      wrapper.contains(<NavigationItem link="/logout">Log out</NavigationItem>)
    ).toEqual(true);
  });
});

// toHaveLength , toEqual -> jest methods
