import React, { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";
import RefreshIcon from "../icons/RefreshIcon";
import { refreshTable } from "../taskpane";
import LoadingIcon from "../icons/LoadingIcon";

function ConfigurationgCard({ config, handleDelete }) {
  const [isRefreShing, setIsRefreShing] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false)
  const handleRefreshing = async () => {
    setIsRefreShing(true)
    try {
      await refreshTable(config);
    } catch (error) {
      console.error("Error refreshing table:", error);
    } finally {
      setIsRefreShing(false);
    }
  };
const onDelete=async()=>{
  setIsDeleting(true)
  try {
    await handleDelete(config)
  } catch (error) {
    console.error("Error refreshing table:", error);
  } finally {
    setIsDeleting(false);
  }

}
  return (
    <div className="flex mb-2 items-center justify-between p-4 py-2 bg-white shadow-sm rounded-lg border border-gray-200 hover:shadow-md hover:border-gray-300 hover:bg-gray-50 transition-all duration-200">
      <p className="text-lg font-semibold text-gray-800">{config.tableName}</p>
      <div className="flex items-center space-x-3">
        <button
          title="refresh"
          className="p-2 bg-green-100 hover:bg-green-200 rounded-full transition-colors duration-200"
          onClick={handleRefreshing}
        >{
          isRefreShing ? <LoadingIcon /> :  <RefreshIcon stroke="currentColor" className="size-4 text-green-600" />
        }
        
        </button>
        <button
          title="edit"
          className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors duration-200"
        >
          <PencilIcon stroke="currentColor" className="size-4 text-gray-600" />
        </button>
        <button
          title="trash"
          onClick={onDelete}
          className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-200"
        >
         { isDeleting? <LoadingIcon /> : <TrashIcon stroke="currentColor" className="size-4 text-red-600" />}
        </button>
      </div>
    </div>
  );
}

export default ConfigurationgCard;
