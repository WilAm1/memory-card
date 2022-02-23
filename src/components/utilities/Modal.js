import React from "react";

export default function Modal({ content, children, display }) {
  return (
    <div className={`${display} modal`}>
      {children}
      {content}
    </div>
  );
}
