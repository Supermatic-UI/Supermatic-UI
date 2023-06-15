import React, { useState } from "react";
import { SupermaticUi } from "@supermatic-ui/react-core";
import { Registrations, createRegistrations } from "@supermatic-ui/core";
import schema from "./sandbox.json";

const components = {
  label: () => <div>Just hardcoded label</div>,
  input: () => <div>Just hardcoded input</div>,
};

const App = () => {
  const [registrations] = useState<Registrations>(createRegistrations(components));

  const onInit = (dataBinding) => {
    console.log("[sandbox] onInit", dataBinding);
  };

  return (
    <>
      <h1>Supermatic UI React Core Sandbox</h1>
      <SupermaticUi configuration={schema} registrations={registrations} onInit={(e) => onInit(e)}></SupermaticUi>
    </>
  );
};

export default App;
