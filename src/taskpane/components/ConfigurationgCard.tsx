import React, { useState } from "react";
import TrashIcon from "../icons/TrashIcon";
import PencilIcon from "../icons/PencilIcon";
import RefreshIcon from "../icons/RefreshIcon";
import { refreshTable } from "../taskpane";
import LoadingIcon from "../icons/LoadingIcon";
import Modal from "./Modal";
import useModal from "../hooks/useModal";
import Button from "./Button";

function ConfigurationgCard({ config, handleDelete }) {
  const [isRefreShing, setIsRefreShing] = useState(false);
  const [isDeleting,setIsDeleting]=useState(false)
  const {isOpen,onOpen,onClose}= useModal()
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
    onClose()
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
          onClick={onOpen}
          className="p-2 bg-red-100 hover:bg-red-200 rounded-full transition-colors duration-200"
        >
         { isDeleting? <LoadingIcon /> : <TrashIcon stroke="currentColor" className="size-4 text-red-600" />}
        </button>
        <Modal isOpen={isOpen} onClose={onClose}
        title="Confirm deletion">
<div>
  <p>Are you sure you want to delete this data import? This action can not be undone.</p>
  <div className="flex mt-4">
            <Button
              onClick={onClose}
              disabled={isDeleting}
              defaultText="Cancel"
              className="bg-gray-400 hover:bg-gray-700 mr-4 px-4 w-[200px]"
            />
            <Button
              onClick={onDelete}
              isLoading={isDeleting}
              loadingText="Deleting.."
              className="ml-4 w-[200px] bg-red-400 hover:bg-red-300"
              defaultText="Save"
            />
          </div>
</div>
        </Modal>
      </div>
    </div>
  );
}

export default ConfigurationgCard;
