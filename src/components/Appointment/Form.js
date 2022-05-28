import React from "react";
import InterviewerList from "components/InterviewerList";
import Button from "components/Button";
import { useState } from "react";


export default function Form(props) {
  const [student, setStudent] = useState(props.student || "");
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const clear = function () {
    setStudent("");
    setInterviewer(null);
    props.onCancel();
  };
  return (
    <main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
  <form autoComplete="off" onSubmit={(event) => event.preventDefault()}>      <input
        className="appointment__create-input text--semi-bold"
        name="name"
        type="text"
        placeholder="Enter Student Name"
        onChange={(event)=> {setStudent(event.target.value)}}
        value={student}
        /*
          This must be a controlled component
          your code goes here
        */
      />
    </form>
    <InterviewerList 
      interviewers={props.interviewers}
      value={interviewer}
      setInterviewer={setInterviewer}
    />
  </section>
  <section className="appointment__card-right">
    <section className="appointment__actions">
      <Button danger onClick={clear}>Cancel</Button>
      <Button confirm onClick={() => {props.onSave(student, interviewer)}}>Save</Button>
    </section>
  </section>
</main>
  );
}