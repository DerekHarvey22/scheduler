import {useState, useEffect} from "react";
import axios from "axios";






export default function Application() {
  
  
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

  }, [] );

  function deleteInterview(id) {
    return axios.delete(`/api/appointments/${id}`).then((response) => {
      const updatedAppointments = {...state.appointments}
      delete (updatedAppointments[id])
      setState( prev => ({
        ...prev,
        ...updatedAppointments,
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
    return axios.put(`/api/appointments/${id}`, {interview})
    .then((response) => {
      setState( prev => ({
        ...prev,
        appointments,
      }))
      console.log({
        ...state,
        appointments,})
    })
    .catch((err) => console.log(err));
  
  }
  const setDay = (day) => setState({ ...state, day });
  return { state, setDay, bookInterview, deleteInterview };
}