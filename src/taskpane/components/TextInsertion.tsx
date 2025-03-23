import * as React from "react";
import { useState, useEffect } from "react";
import { createTable, getWorkBookProperties, UpdateTable } from "../taskpane";
import ConfigurationgCard from "./ConfigurationgCard";
import InputField from "./InputField";
import SelectField from "./SelectField";
import LoadingButton from "./LoadingButton";

const TextInsertion: React.FC = () => {
  const [year, setYear] = useState("2024");
  const [dataType, setDataType] = useState("accounts");
  const [tableName, setTableName] = useState("");
  const [account, setAccount] = useState("99999");
  const [configs, setConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getData = async () => {
    const data = await getWorkBookProperties();
    setConfigs(data);
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCreate = async () => {
    try {
      setIsLoading(true);
      await createTable({ year, dataType, tableName, account });
      await UpdateTable([...configs, { year, dataType, tableName, account }]);
      getData();
    } catch (error) {
      console.error("Error creating table:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (data) => {
    const updatedConfig = configs.filter((item) => item.tableName !== data.tableName);
    await UpdateTable(updatedConfig);
    getData();
  };

  return (
    <div>
      <div>
        {configs?.map((conf) => (
          <ConfigurationgCard key={conf.tableName} config={conf} handleDelete={handleDelete} />
        ))}
      </div>
      <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
        <SelectField
          label="Data type"
          value={dataType}
          options={["accounts", "cost-centers", "entries"]}
          onChange={(e) => setDataType(e.target.value)}
        />
        <InputField
          label="Account"
          placeholder="eg. Accounting"
          ariaLabel="Account"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <InputField
          label="Year"
          placeholder="eg. 2024"
          ariaLabel="Year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        />
        <InputField
          label="Sheet Name"
          placeholder="eg. Accounting"
          ariaLabel="Sheet Name"
          value={tableName}
          onChange={(e) => setTableName(e.target.value)}
        />
        <LoadingButton
          isLoading={isLoading}
          onClick={handleCreate}
          defaultText="Add data import"
        />
      </div>
    </div>
  );
};

export default TextInsertion;