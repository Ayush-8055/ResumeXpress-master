import React, { useRef, useState } from "react";
import ReactToPrint from "react-to-print";
import { ArrowDown } from "react-feather";

import Editor from "../Editor/Editor";
import Resume from "../Resume/Resume";

import styles from "./Body.module.css";

function Body() {
  const colors = ["#239ce2", "#48bb78", "#0bc5ea", "#a0aec0", "#ed8936"];
  const sections = {
    basicInfo: "Basic Info",
    workExp: "Work Experience",
    project: "Projects",
    education: "Education",
    achievement: "Achievements",
    summary: "Summary",
    other: "Other",
  };
  const resumeRef = useRef();

  const [activeColor, setActiveColor] = useState(colors[0]);
  const [resumeInformation, setResumeInformation] = useState({
    [sections.basicInfo]: {
      id: sections.basicInfo, // Unique ID for the section
      sectionTitle: sections.basicInfo, // Display title
      detail: {}, // Holds detailed info (empty object for now)
    },
    [sections.workExp]: {
      id: sections.workExp,
      sectionTitle: sections.workExp,
      details: [],  // Work experiences stored in an array
    },
    [sections.project]: {
      id: sections.project,
      sectionTitle: sections.project,
      details: [], // Project details stored in an array
    },
    [sections.education]: {
      id: sections.education,
      sectionTitle: sections.education,
      details: [], // Education details stored in an array
    },
    [sections.achievement]: {
      id: sections.achievement,
      sectionTitle: sections.achievement,
      points: [], // Achievements stored as an array of points
    },
    [sections.summary]: {
      id: sections.summary,
      sectionTitle: sections.summary,
      detail: "",  // Summary is a single string
    },
    [sections.other]: {
      id: sections.other,
      sectionTitle: sections.other,
      detail: "",  // Other details stored as a string
    },
  });

  return (
    <div className={styles.container}>
      <p className={styles.heading}>Resume Builder (Build Resume With Ayush)</p>
      <div className={styles.toolbar}>
        <div className={styles.colors}>
          {colors.map((item) => ( //This loops through the colors array.
            <span //For each color item, a span is rendered.
              key={item} //Provides a unique key (React optimization).
              style={{ backgroundColor: item }} //Dynamically sets the background color of the span.
              className={`${styles.color} ${ //Applies the CSS class styles.color.
                activeColor === item ? styles.active : ""
              }`}
              onClick={() => setActiveColor(item)} //When a color is clicked, setActiveColor(item) updates the selected color.
            />
          ))}
        </div> 
        <ReactToPrint //ReactToPrint is a third-party library that allows printing or downloading a section of a page as a PDF.
          trigger={() => { // Triger Defines the UI for the print button.
            return ( // <button> is displayed with text "Download" and an icon <ArrowDown />
              <button> 
                Download <ArrowDown />
              </button>
            );
          }}
          content={() => resumeRef.current} // content Specifies what should be printed/downloaded.
          //resumeRef is a React ref (useRef) pointing to the resume component.
        /> 
      </div>
      <div className={styles.main}>
        <Editor
          sections={sections}
          information={resumeInformation}
          setInformation={setResumeInformation}
        />
        <Resume
          ref={resumeRef}
          sections={sections}
          information={resumeInformation}
          activeColor={activeColor}
        />
      </div>
    </div>
  );
}

export default Body;
