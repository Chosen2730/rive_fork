import React from "react";
import Modal from "react-native-modal";

const CustomModal = ({
  children,
  visibilityStatus,
}: {
  children: any;
  visibilityStatus: boolean;
}) => {
  return <Modal isVisible={visibilityStatus}>{children}</Modal>;
};

export default CustomModal;
