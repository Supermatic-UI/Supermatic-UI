import React, { useState } from "react";
import { SupermaticUi } from "@supermatic-ui/react-core";
import { Registrations, createRegistrations } from "@supermatic-ui/core";
import schema from "./sandbox.json";
import { SupermaticLabel, SupermaticInput } from "../src/index";

const components = {
  label: SupermaticLabel,
  input: SupermaticInput,
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
