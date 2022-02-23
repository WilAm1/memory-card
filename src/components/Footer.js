import React from "react";

export default function Footer() {
  return (
    <footer>
      Copyright © {new Date().getFullYear()}
      <a
        className="github-link"
        href="https://github.com/WilAm1"
        target="_blank"
        rel="noreferrer"
      >
        WilAmI
      </a>
      <a
        className="link code-link"
        target="_blank"
        rel="noreferrer"
        href="https://github.com/WilAm1/memory-card"
      >
        See the code here
      </a>
    </footer>
  );
}
