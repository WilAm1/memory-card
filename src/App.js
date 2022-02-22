import React from "react";
import Header from "./components/Header";
import Main from "./components/Main";
import Footer from "./components/Footer";
import sampleAPI from "./sampleAPI";
function App() {
  return (
    <section>
      <Header />
      <Main data={sampleAPI} />
      <Footer />
    </section>
  );
}

export default App;
