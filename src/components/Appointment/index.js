//imports
import React from 'react';
import 'components/Appointment/styles.scss';
import Header from "./header";
import Show from "./Show";
import Empty from "./Empty"
import { Fragment } from 'react';

export default function Appointment(props) {
  return (
    <Fragment>
      <Header time={props.time} />
      {props.interview ? 
          <article className="appointment">
        <Show
          student={props.interview.student}
          interviewer={props.interview.interviewer}
        />
        </article>
 :
 <article className="appointment"> 
        <Empty />
    
    </article>
    }
    </Fragment>
  )
};