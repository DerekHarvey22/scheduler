import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";
import PropTypes from "prop-types";

const InterviewerList = (props) => {
  console.log(props)
  const { interviewers, value, setInterviewer } = props;
  const eachInterviewer = interviewers.map((interviewer) => {
    return (
      <InterviewerListItem
        key={interviewer.id}
        id={interviewer.id}
        name={interviewer.name}
        avatar={interviewer.avatar}
        selected={interviewer.id === value}
        setInterviewer={() => setInterviewer(interviewer.id)}
      />
    )
  })
  return (
    <section className="interviewers">
      <h4 className="interviewers__header text--light">
        {eachInterviewer}
      </h4>
      <ul className="interviewers__list"></ul>
    </section>
  );


};

InterviewerList.propTypes = {
  interviewers: PropTypes.array.isRequired,
};


export default InterviewerList;