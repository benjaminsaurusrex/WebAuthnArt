import * as React from "react";

interface Props {
  onClick: () => void;
}

export const Button: React.FC<Props> = props => {
  return (
    <div
      onClick={props.onClick}
      style={{
        background: "rgba(0, 0, 0, 0.375",
        color: "white",
        fontSize: "2rem",
        border: "1px solid rgba(255,255,255,0.5)",
        padding: "1rem",
        margin: "0.25rem",
        cursor: "pointer"
      }}
    >
      {props.children}
    </div>
  );
};
