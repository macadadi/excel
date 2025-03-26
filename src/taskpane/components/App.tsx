import * as React from "react";
import TextInsertion from "./TextInsertion";
import Settings from "../features/Settings";
import Tabs from "./Tabs";
import { getUserLocale } from "../taskpane";
import { Locale, TranslationKeys } from "../types";
import { getStrings } from "../locale";
const App = () => {
  const [locale, setLocale] = React.useState<Locale>("de");

  React.useEffect(() => {
    const getLocale = async () => {
      const data = await getUserLocale();
      setLocale(data);

    }
    getLocale()

  }, []);
  const fetchUser = async()=>{
    let accessToken = await OfficeRuntime.auth.getAccessToken();
    console.log(accessToken, "accessToken  accessToken  accessToken ")
  }
  fetchUser()
  const t = (key: TranslationKeys) => {
    return getStrings(key, locale);
  };
  return (
    <div className="space-y-4 p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <Tabs
        tabs={[
          { label: t("dataImportMenuItemLabel"), content: <TextInsertion locale={locale} /> },
          {
            label: t("settingsMenuItemLabel"),
            content: <Settings setLocale={setLocale} locale={locale} />,
          },
        ]}
      />
    </div>
  );
};

export default App;
