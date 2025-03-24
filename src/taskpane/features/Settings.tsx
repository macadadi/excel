import React, { useState } from "react";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import { Button } from "@fluentui/react-components";
import SelectField from "../components/SelectField";

function Settings() {
  const { isOpen, onClose, onOpen } = useModal();
  const [language, setLanguage] = useState("en");
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <div>
          <SelectField
            label="Select language"
            value={language}
            options={["English", "Germany"]}
            onChange={(e) => setLanguage(e.target.value)}
          />
        </div>
      </Modal>
      <Button onClick={onOpen}>Settings</Button>
    </div>
  );
}

export default Settings;
