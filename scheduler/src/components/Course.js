import React, { useState } from 'react';
import { Button } from 'rbx';
import db from '../firebase';

const Course = ({ course, state }) => {
  const [user, setUser] = useState(null);
  return (
  <Button color={buttonColor(state.selected.includes(course))}
    onClick={() => state.toggle(course)}
    onDoubleClick={user ? () => moveCourse(course) : null}
    disabled={hasConflict(course, state.selected)}
  >
    {getCourseTerm(course)} CS {getCourseNumber(course)}: {course.title}
  </Button>
  );
};


const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const hasConflict = (course, selected) => (
  selected.some(selection => courseConflict(course, selection))
);

const days = ['M', 'Tu', 'W', 'Th', 'F'];
const daysOverlap = (days1, days2) => (
  days.some(day => days1.includes(day) && days2.includes(day))
);

const hoursOverlap = (hours1, hours2) => (
  Math.max(hours1.start, hours2.start) < Math.min(hours1.end, hours2.end)
);

const timeConflict = (course1, course2) => (
  daysOverlap(course1.days, course2.days) && hoursOverlap(course1.hours, course2.hours)
);

const courseConflict = (course1, course2) => (
  course1 !== course2
  && getCourseTerm(course1) === getCourseTerm(course2)
  && timeConflict(course1, course2)
);

const getCourseNumber = course => (
  course.id.slice(1, 4)
)
const saveCourse = (course, meets) => {
  db.child('courses').child(course.id).update({ meets })
    .catch(error => alert(error));
};

const moveCourse = course => {
  const meets = prompt('Enter new meeting data, in this format:', course.meets);
  if (!meets) return;
  const { days } = timeParts(meets);
  if (days) saveCourse(course, meets);
  else moveCourse(course);
};



const meetsPat = /^ *((?:M|Tu|W|Th|F)+) +(\d\d?):(\d\d) *[ -] *(\d\d?):(\d\d) *$/;



const timeParts = meets => {
  const [match, days, hh1, mm1, hh2, mm2] = meetsPat.exec(meets) || [];
  return !match ? {} : {
    days,
    hours: {
      start: hh1 * 60 + mm1 * 1,
      end: hh2 * 60 + mm2 * 1
    }
  };
};


const buttonColor = selected => (
  selected ? 'success' : null
);

export default Course;
