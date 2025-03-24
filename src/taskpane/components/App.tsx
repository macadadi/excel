import * as React from "react";
import TextInsertion from "./TextInsertion";
import Settings from "../features/Settings";
import Tabs from "./Tabs";
import { getUserLocale } from "../taskpane";
const App = () => {
  const [locale,setLocale]= React.useState()

  React.useEffect(()=>{
  const getLocale = async () => {
    return await getUserLocale()
  };
  const locale = getLocale()
  console.log(locale, "current test locale");
  },[])
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <Tabs
        tabs={[
          { label: "Data Import", content: <TextInsertion /> },
          { label: "Settings", content: <Settings /> },
        ]}
      />
    </div>
  );
};

export default App;
