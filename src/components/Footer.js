import React from "react";

export default function Footer() {
  return (
    <footer>
      Copyright © {new Date().getFullYear()}
      <a className="github-link" href="#">
        WilAmI
      </a>
    </footer>
  );
}
