import React from "react";
import InterviewerListItem from "./InterviewerListItem";
import "./InterviewerList.scss";

const InterviewerList = (props) => {
  console.log(props)
  const {interviewers, i, setInterviewer } = props;
  const eachInterviewer = interviewers.map((p) => {
    return(
      <InterviewerListItem
        key={p.id}
        name={p.name}
        avatar={p.avatar}
        selected={p.id === i}
        setInterviewer={() => setInterviewer(p.id)}
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
export default InterviewerList;