export function getAppointmentsForDay(state, day) {

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
