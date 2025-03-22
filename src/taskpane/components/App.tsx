import * as React from "react";
import TextInsertion from "./TextInsertion";
import { makeStyles } from "@fluentui/react-components";
import { createTable } from "../taskpane";

interface AppProps {
  title: string;
}

const useStyles = makeStyles({
  root: {
    minHeight: "100vh",
  },
});

const App = () => {
  const styles = useStyles();
  return (
<div className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
  <p className="text-lg font-medium text-gray-700 text-center">
    Import data from APX into this spreadsheet
  </p>
    <TextInsertion createTable={createTable} />
  </div>
  );
};

export default App;
