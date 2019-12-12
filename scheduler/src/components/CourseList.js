import React, { useState } from 'react';
import { Button} from 'rbx';
import Course from './Course';

const useSelection = () => {
  const [selected, setSelected] = useState([]);
  const toggle = (x) => {
    setSelected(selected.includes(x) ? selected.filter(y => y !== x) : [x].concat(selected))
  };
  return [selected, toggle];
};


const terms = { F: 'Fall', W: 'Winter', S: 'Spring' };

Object.values(terms) // returns ["Fall", "Winter", "Spring"]
const TermSelector = ({ term }) => (
  <Button.Group hasAddons>
    {Object.values(terms)
      .map(value =>
        <Button key={value}
          color={buttonColor(value === term)}
        >
          {value}
        </Button>
      )
    }
  </Button.Group>
);

const buttonColor = selected => (
  selected ? 'success' : null
);
const getCourseTerm = course => (
  terms[course.id.charAt(0)]
);

const CourseList = ({ courses }) => {
  const [term, setTerm] = useState('Fall');
  const [selected, toggle] = useSelection();
  const [user, setUser] = useState(null);
  const termCourses = courses.filter(course => term === getCourseTerm(course));

  
  
  return (
    <React.Fragment>
      <TermSelector state={{ term, setTerm }} />
      <Button.Group>
        {termCourses.map(course =>
          <Course key={course.id} course={course}
            state={{ selected, toggle }}
            user={user} />)}
      </Button.Group>
    </React.Fragment>
  );
};

export default CourseList;