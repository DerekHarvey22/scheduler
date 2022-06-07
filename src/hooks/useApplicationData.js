import { useState, useEffect } from "react";
import axios from "axios";






export default function Application() {



  function updateSpots(state, appointments, id) {
    //const selectedDay = state.days.find((item) => item.name === state.day);
    const newDays = [];
    let availableSpots = 0;
    for (const day of state.days) {
      if (day.appointments.includes(id)) {
        for (const appointmentID of day.appointments) {
          if (appointments[appointmentID].interview === null) {
            availableSpots += 1;
          }
        }
        newDays.push({ ...day, spots: availableSpots })
      } else {
        newDays.push(day)
      }
    }
    return newDays;
  }
  // function countSpots(state) {
  //   const currentDay = state.days.find((item) => item.name === state.day);
  //   const appointmentIds = currentDay.appointments;

  //   const spots = appointmentIds.filter(
  //     (id) => !state.appointments[id].interview
  //   ).length;

  //   return spots;
  // }

  // function updateSpots(state) {
  //   const updatedState = { ...state };
  //   const updatedDays = [...state.days];
  //   const updatedDay = { ...state.days.find((day) => day.name === state.day) };

  //   const spots = countSpots(state);
  //   updatedDay.spots = spots;

  //   const updatedDayIndex = state.days.findIndex(
  //     (day) => day.name === state.day
  //   );
  //   updatedDays[updatedDayIndex] = updatedDay;

  //   updatedState.days = updatedDays;

  //   return updatedState;
  // }

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

  }, []);

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const updatedAppointments = { ...state.appointments }
      updatedAppointments[id].interview = null
      const days = updateSpots(state, updatedAppointments, id)
      console.log({ updatedAppointments })
      setState(prev => ({
        ...prev,
        appointments: updatedAppointments,
        days
      }));
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
    const days = updateSpots(state, appointments, id)
    return axios.put(`/api/appointments/${id}`, { interview })
      .then((response) => {
        setState(prev => ({
          ...prev,
          appointments,
          days
        }))
        console.log({
          ...state,
          appointments,
          days
        })
      })
    //.catch((err) => console.log(err));

  }
  const setDay = (day) => setState({ ...state, day });
  return { state, setDay, bookInterview, deleteInterview };
}