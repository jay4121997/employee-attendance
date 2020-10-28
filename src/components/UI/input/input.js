import React from "react";

const input = (props) => {
  return (
    <input
      type={props.type}
      value={props.value}
      onChange={props.onChange  }
      placeholder={props.placeholder}
      required={props.required}
    />
  );
};

export default input;
