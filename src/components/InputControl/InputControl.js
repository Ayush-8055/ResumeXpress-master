import React from "react";

import styles from "./InputControl.module.css";

//It conditionally renders the <label> element only if label exists.
//It avoids unnecessary <label> tags with empty content.
function InputControl({ label, ...props }) {
  return (
    <div className={styles.container}>
      {label && <label>{label}</label>} 
      <input type="text" {...props} />
    </div>
  );
}

export default InputControl;
