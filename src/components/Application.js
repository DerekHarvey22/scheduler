import React, {useState} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay, getInterviewForDay, getInterviewersForDay } from "helpers/selectors";

export default function Application(props) {
  
  
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {},
  });
  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers')
    ])
      .then((all) => {
        setState((prev) => ({
          ...prev,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data,
        }));
      })
      .catch((err) => console.error(err));
  });

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      setState({
        ...state,
        appointments,
      });
    });
  }


  function bookInterview(id, interview) {
    console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment,
    };
    axios.put(`/api/appointments/${id}`, appointments)
    .then((response) => {
      setState({
        ...state,
        appointments,
      });

      console.log(response);
    })
    .catch((err) => console.log(err));
  
  }
  
  const appointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
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
  const setDay = (day) => setState({ ...state, day });
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
        <Appointment key="last" time="5pm"/> 
      </section>
    </main>
  );
}
