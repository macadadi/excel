import * as React from "react";
import { useState } from "react";
import { Button, Input, Select } from "@fluentui/react-components";
import { TableProp } from "../taskpane";

interface TextInsertionProps {
  createTable: (props: TableProp)=>void
}

const TextInsertion: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  const [year,setYear]= useState('2024')
  const [dataType,setDataType]= useState('accounts')
  const [tableName,setTableName]=useState('')
  const [account,setAccount]=useState('')
  
    const handleCreate = async () => {
      await props.createTable({year,dataType,tableName,account});
    };

  return (
<div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Data type</label>
    <Select
      onChange={(e) => setDataType(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option>accounts</option>
      <option>cost-centers</option>
      <option>entries</option>
    </Select>
  </div>
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Account</label>
    <input
      placeholder="eg. Accounting"
      aria-label="Sheet Name"
      onChange={(e) => setAccount(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Year</label>
    <input
      placeholder="eg. 2024"
      aria-label="year"
      onChange={(e) => setYear(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Sheet Name</label>
    <input
      placeholder="eg. Accounting"
      aria-label="Sheet Name"
      onChange={(e) => setTableName(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    />
  </div>

  <button
    onClick={handleCreate}
    className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
  >
    Add data import
  </button>
</div>
  );
};

export default TextInsertion;
