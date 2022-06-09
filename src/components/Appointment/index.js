//imports
import React from "react";
import "./styles.scss";
import Header from "./header";
import Show from "./Show";
import Empty from "./Empty";
import Status from "./Status";
import useVisualMode from "hooks/useVisualMode";
import Form from "./Form";
import Confirm from "./Confirm";
import Error from "./Error";


export default function Appointment(props) {
  //some consts
  const EMPTY = "EMPTY";
  const SHOW = "SHOW";
  const CREATE = "CREATE";
  const SAVING = "SAVING";
  const DELETING = "DELETING";
  const CONFIRM = "CONFIRM";
  const EDIT = "EDIT";
  const ERROR_SAVE = "ERROR_SAVE";
  const ERROR_DELETE = "ERROR_DELETE";
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  console.log({ props })
  //.log(props.interviewers)
  function save(name, interviewer) {
    const interview = {
      student: name,
      interviewer,
    };
    //.log("mode : ", mode);
    transition(SAVING);
    props.bookInterview(props.id, interview)

      .then(() => transition(SHOW))
      .catch((error) => transition(ERROR_SAVE));
  }
  //Function for deleting interviews
  function deleteInterview() {
    transition(DELETING, true);
    props.deleteInterview(props.id)
      .then(() => transition(EMPTY))
      .catch((error) => transition(ERROR_DELETE, true));
  }
  function editInterview() {
    console.log("logging props from SHOW: ", props);
    transition(EDIT);
  }
  //console.log("propstest ", props)

  // function closeError() {
  //   transition(SHOW)
  // }

  // function createCloseError() {
  //   transition(props.interview ? SHOW : EMPTY)
  // }

  return (
    <article className="appointment">
      < Header time={props.time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          {...props.interview}
          onDelete={() => transition(CONFIRM)}
          onEdit={() => transition(EDIT)}
        />
      )}
      {mode === CREATE && (
        < Form
          interviewers={props.interviewers} onCancel={() => back()} onSave={save} />
      )}

      {mode === EDIT && (
        <Form
          {...props.interview}
          interviewer={props.interview.interviewer.id}
          interviewers={props.interviewers}
          onEdit={editInterview}
          onCancel={() => back()}
          onSave={save}
        />
      )}
      {mode === SAVING && <Status message={"Saving"} />}
      {mode === ERROR_SAVE && (
        <Error message={"Denied"} onClose={back} />
      )}
      {mode === DELETING && <Status message={"Deleting"} />}
      {mode === ERROR_DELETE && (
        <Error message={"Denied."} onClose={back} />
      )}
      {mode === CONFIRM && (
        <Confirm
          message={"Confirm that you would like to delete the appointment."}
          onConfirm={deleteInterview}
          onCancel={back}
        />
      )}
    </article>
  )
}