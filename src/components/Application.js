import React, {useState} from "react";
import "components/Application.scss";
import DayList from "./DayList";
import Appointment from "./Appointment";
import { useEffect } from "react";
import axios from "axios";
import { getAppointmentsForDay } from "helpers/selectors";



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
  
  
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const arrayAppointments = dailyAppointments.map((appointment)=> {
    return(
      <Appointment 
        key={appointment.id}
        {...appointment}
      />
    )
  })
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
