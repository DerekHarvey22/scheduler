//imports
import React from 'react';
import 'components/Appointment/styles.scss';
import Header from "./header";
import Show from "./Show";
import Empty from "./Empty"
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form"




export default function Appointment(props) {
  const CONFIRM = "CONFIRM";
  const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const { mode, transition, back } = useVisualMode(
  props.interview ? SHOW : EMPTY
);

function save(name, interviewer) {
  const interview = {
    student: name,
    interviewer,
  };
  console.log("mode : ", mode);
    transition(SAVING);
  props.bookInterview(props.id, interview)
  .then(transition(SHOW))
  .catch((err) => console.error(err));
}


  return (
<article className="appointment">
    < Header time={props.time} />
    {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
    {mode === SHOW && (
      <Show
        {...props.interview}
        onDelete={() => transition(CONFIRM)}
      />
    )}
    {mode === CREATE && (
      < Form
        interviewers={props.interviewers} onCancel={() => back()} onSave={save} />
    )}
    </article>
  )
    }