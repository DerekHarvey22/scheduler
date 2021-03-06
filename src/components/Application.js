import React from "react";
import "components/Application.scss";
import useApplicationData from "hooks/useApplicationData";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterviewForDay, getInterviewersForDay } from "helpers/selectors";
import DayList from "./DayList";

export default function Application(props) {
  const { state, setDay, bookInterview, deleteInterview } = useApplicationData();
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  console.log({ state })
  const arrayAppointments = appointments.map((appointment) => {
    const interview = getInterviewForDay(state, appointment.interview);
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        deleteInterview={deleteInterview}

      />
    );
  });
  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList days={state.days} value={state.day} onChange={setDay} />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {/* Replace this with the schedule elements durint the "The Scheduler" activity. */}
        {arrayAppointments}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
