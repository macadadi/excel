import * as React from "react";
import TextInsertion from "./TextInsertion";

const App = () => {
  return (
<div className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
  <p className="text-lg font-medium text-gray-700 text-center">
    Import data from APX into this spreadsheet
  </p>
    <TextInsertion />
  </div>
  );
};

export default App;
