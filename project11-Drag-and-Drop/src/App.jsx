import React from 'react'
import DragAndDrop from './DragAndDrop';

const App = () => {

  const TaskData = {
    Office_Task: [
      { id: "off_01", title: "Go to Office"},
      { id: "off_02", title: "Have Breakfast At Office"},
      { id: "off_03", title: "Work At Office"},
      { id: "off_04", title: "Go to Home"},
    ],
    Home_Task: [
      { id: "home_01", title: "Go to Home"},
      { id: "home_02", title: "Have Dinner"},
      { id: "home_03", title: "Go to Sleep"},
      { id: "home_04", title: "Watch TV"},
    ],
    Sunday_Task: [
      { id: "sun_01", title: "Sleep Till Late"},
      { id: "sun_02", title: "Have BreakFast"},
      { id: "sun_03", title: "Go to Gym"},
      { id: "sun_04", title: "Go Out"},
    ],
  };
  return <DragAndDrop data = {TaskData} />;
}

export default App
