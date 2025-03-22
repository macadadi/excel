import * as React from "react";
import { useState } from "react";
import { createTable, getWorkBookProperties, UpdateTable } from "../taskpane";
import ConfigurationgCard from "./ConfigurationgCard";


const TextInsertion: React.FC = () => {
  const [year,setYear]= useState('2024')
  const [dataType,setDataType]= useState('accounts')
  const [tableName,setTableName]=useState('')
  const [account,setAccount]=useState('99999')
  const [configs,setConfigs]= useState([])
  const [isLoading,setIsLoading]=useState(false)
  
  const getData =async()=>{
   const  data = await getWorkBookProperties()
    setConfigs(data)
   }
React.useEffect(()=>{
  getData()
},[])
  
    const handleCreate = async () => {
  try{
    setIsLoading(true)
    await createTable({year,dataType,tableName,account});
    await UpdateTable([...configs,{year,dataType,tableName,account}])
    getData()
    setIsLoading(false)
  }catch(error){
    console.log(error)
    setIsLoading(false)
  } 
    };
  return (
<div>
  <div>
  {configs?.map(conf=><ConfigurationgCard config={conf}/> )}
  </div>
<div className="space-y-6 max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">Data type</label>
    <select
    title="select"
      onChange={(e) => setDataType(e.target.value)}
      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    >
      <option>accounts</option>
      <option>cost-centers</option>
      <option>entries</option>
    </select>
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
  disabled={isLoading}
  className="w-full px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-75 disabled:cursor-not-allowed"
>
  {isLoading ? (
    <div className="flex items-center justify-center space-x-2">
      <svg
        className="animate-spin h-5 w-5 text-white"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span>Loading...</span>
    </div>
  ) : (
    "Add data import"
  )}
</button>
</div>
</div>
  );
};

export default TextInsertion;
