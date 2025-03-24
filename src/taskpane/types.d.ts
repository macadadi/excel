export type IconProps = React.SVGProps<SVGSVGElement>;
import React from "react";

type ModalType = "default" | "success" | "warn" | "error";

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  type?: ModalType;
  title?: string;
};