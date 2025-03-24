import * as React from "react";
import { useState, useEffect } from "react";
import { createTable, getWorkBookProperties, UpdateWorkBookProperties } from "../taskpane";
import ConfigurationgCard from "./ConfigurationgCard";
import InputField from "./InputField";
import SelectField from "./SelectField";
import Button from "./Button";

const TextInsertion: React.FC = () => {
  const [year, setYear] = useState("2024");
  const [dataType, setDataType] = useState("accounts");
  const [tableName, setTableName] = useState("");
  const [account, setAccount] = useState("99999");
  const [configs, setConfigs] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [importData, setImportData] = useState(false);

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
      await UpdateWorkBookProperties([...configs, { year, dataType, tableName, account }]);
      getData();
    } catch (error) {
      console.error("Error creating table:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (data) => {
    const updatedConfig = configs.filter((item) => item.tableName !== data.tableName);
    await UpdateWorkBookProperties(updatedConfig);
    getData();
  };

  return (
    <div>
      <p className="text-lg font-medium text-gray-700 text-center">
        Import data from APX into this spreadsheet
      </p>
      <div>
        {configs?.map((conf) => (
          <ConfigurationgCard key={conf.tableName} config={conf} handleDelete={handleDelete} />
        ))}
      </div>
      {importData ? (
        <div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
          <SelectField
            label="Data type"
            value={dataType}
            options={[
              { label: "accounts", value: "accounts" },
              { label: "cost-centers", value: "cost-centers" },
              { label: "entries", value: "entries" },
            ]}
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
          <div className="flex">
            <Button
              disabled={isLoading}
              onClick={() => setImportData(false)}
              defaultText="Cancel"
              className="bg-gray-400 hover:bg-gray-700 mr-4 px-4 w-[200px]"
            />
            <Button
              isLoading={isLoading}
              onClick={handleCreate}
              className="ml-4 w-[200px]"
              defaultText="Save"
            />
          </div>
        </div>
      ) : (
        <Button
          isLoading={isLoading}
          onClick={() => setImportData(true)}
          className="w-full bg-green-400 hover:bg-green-700"
          defaultText="Import data"
        />
      )}
    </div>
  );
};

export default TextInsertion;
