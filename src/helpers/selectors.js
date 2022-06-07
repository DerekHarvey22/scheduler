export function getAppointmentsForDay(state, day) {
  console.log(state)
  let dayObject = state.days.find((item) => item.name === day);

  if (!dayObject) {
    return [];
  }
  const results = dayObject.appointments.map(
    (appointment) => state.appointments[appointment]
  );

  return results;
}
export function getInterviewForDay(state, interview) {
  if (!interview) {
    return null;
  }
  let result = {};
  result["student"] = interview.student;
  result["interviewer"] = state.interviewers[interview.interviewer];

  return result;
}

export function getInterviewersForDay(state, day) {

  let d = state.days.find((item) => item.name === day);

  if (!d) {
    return [];
  }
  const results = d.interviewers.map(
    (interviewerID) => state.interviewers[interviewerID]
  );

  return results;
}

