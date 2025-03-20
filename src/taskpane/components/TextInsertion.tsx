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
  
    const handleCreate = async () => {
      await props.createTable({year,dataType,tableName});
    };

  return (
    <div >
      <label>Data type</label>
      <Select onChange={e=>setDataType(e.target.value)}>
      <option>accounts</option>
      <option>cost-centers</option>
      <option>entries</option>
    </Select>
    <div>
    <label>Year</label>
    <input placeholder="eg. 2024" aria-label="year" onChange={e=>setYear(e.target.value)}/> 
    </div>
    <div>
    <label>Sheet Name</label>
    <input placeholder="eg. Accounting" aria-label="Sheet Name" onChange={e=>setTableName(e.target.value)}/> 
    </div>
    <Button appearance="primary" disabled={false} size="large" onClick={handleCreate}>
      Add data import
    </Button>
  </div>
  );
};

export default TextInsertion;
