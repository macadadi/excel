import React, { useState } from "react";
import Modal from "../components/Modal";
import useModal from "../hooks/useModal";
import SelectField from "../components/SelectField";
import { updateUserLocale } from "../taskpane";
import Button from "../components/Button";
import { Locale } from "../types";

function Settings({setLocale,locale}) {
  const { isOpen, onClose, onOpen } = useModal();
  const [language, setLanguage] = useState<Locale>(locale);
  const [isLoading, setIsLoading] = useState(false);
  const setUserLocale = async () => {
    try {
      setIsLoading(true);
      await updateUserLocale(language);
      setLocale(language)
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
      onClose();
    }
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose} title="Switch language">
        <div>
          <SelectField
            label="Select language"
            value={language}
            options={[
              {
                label: "English",
                value: "en",
              },
              {
                label: "Germany",
                value: "de",
              },
            ]}
            onChange={(e) => setLanguage(e.target.value as "en" | "de")}
          />
          <div className="flex justify-end mt-4">
            <Button
              onClick={setUserLocale}
              loadingText="Submitting"
              isLoading={isLoading}
              defaultText="Confirm"
              className="bg-green-400 hover:bg-green-700"
            />
          </div>
        </div>
      </Modal>
      {!isOpen && <Button onClick={onOpen} defaultText="Settings" />}
    </div>
  );
}

export default Settings;
