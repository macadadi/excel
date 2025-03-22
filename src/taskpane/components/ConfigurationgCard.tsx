import React from "react";
import TrashIcon from "../icons/TrashIcon";
import ArrowPathIcon from "../icons/ArrowPathIcon";
import PencilIcon from "../icons/PencilIcon";

function ConfigurationgCard({ config }) {
  return (
    <div className="flex ">
      <p>{config.tableName}</p>{" "}
      <div className="flex">
        <TrashIcon stroke="red" className="size-4" />
        <ArrowPathIcon stroke="green" className="size-4" />
        <PencilIcon stroke="gray" className="size-4" />
      </div>
    </div>
  );
}

export default ConfigurationgCard;
