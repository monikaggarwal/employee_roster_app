import React from "react";
import { shallow } from "enzyme";
import EmployeeModal from "./EmployeeModal";

describe("EmployeeModal", () => {
  it("renders employee details correctly", () => {
    const employee = {
      empName: "Deepti",
      jobTitle: "Analyst",
      jobDescription: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      empAge: 30,
      dateOfJoining: "2023-10-23",
    };

    const wrapper = shallow(<EmployeeModal employee={employee} onClose={() => {}} />);
    expect(wrapper.find("h2").text()).toEqual("John Doe");
    expect(wrapper.find("p").at(0).text()).toEqual("Job Title: Software Engineer");
    expect(wrapper.find("p").at(1).text()).toEqual("Job Description: Developing awesome software");
    expect(wrapper.find("p").at(2).text()).toEqual("Age: 30");
    expect(wrapper.find("p").at(3).text()).toEqual("Date of Joining: 2023-01-01");
  });

  it("calls onClose when close icon is clicked", () => {
    const onCloseMock = jest.fn();
    const employee = {
      empName: "John Doe",
      jobTitle: "Software Engineer",
      jobDescription: "Developing awesome software",
      empAge: 30,
      dateOfJoining: "2023-01-01",
    };

    const wrapper = shallow(<EmployeeModal employee={employee} onClose={onCloseMock} />);

    wrapper.find(".close-icon").simulate("click");

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });
});
