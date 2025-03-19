import * as React from "react";
import { useState } from "react";
import { Button, Field, Textarea, tokens, makeStyles, Select } from "@fluentui/react-components";
import { TableProp } from "../taskpane";

interface TextInsertionProps {
  createTable: (props: TableProp)=>void
}

const useStyles = makeStyles({
  instructions: {
    fontWeight: tokens.fontWeightSemibold,
    marginTop: "20px",
    marginBottom: "10px",
  },
  textPromptAndInsertion: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  textAreaField: {
    marginLeft: "20px",
    marginTop: "30px",
    marginBottom: "20px",
    marginRight: "20px",
    maxWidth: "50%",
  },
});

const TextInsertion: React.FC<TextInsertionProps> = (props: TextInsertionProps) => {
  const [year,setYear]= useState('2024')
  const [dataType,setDataType]= useState('accounts')
  const [tableName,setTableName]=useState('')
  
    const handleCreate = async () => {
      await props.createTable({year,dataType,tableName});
    };

  const styles = useStyles();

  return (
    <div className={styles.textPromptAndInsertion}>
    <Field className={styles.instructions}>Click the button to insert text.</Field>
    <label>Enter table name</label>
    <input aria-label="Enter table name" onChange={e=>setTableName(e.target.value)}/>
    <Select onChange={e=>setYear(e.target.value)}>
      <option>2024</option>
      <option>2025</option>
    </Select>
    <Select onChange={e=>setDataType(e.target.value)}>
      <option>accounts</option>
      <option>cost-centers</option>
      <option>entries</option>
    </Select>
    <Button appearance="primary" disabled={false} size="large" onClick={handleCreate}>
      Create
    </Button>
  </div>
  );
};

export default TextInsertion;
