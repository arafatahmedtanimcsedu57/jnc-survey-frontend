import React from "react";
import { useAppSelector } from "../redux/hooks";

interface ModalStripProps {}

const ModalStrip: React.FC<ModalStripProps> = ({}) => {
  const { modalType, message } = useAppSelector(
    (state) => state.uielements.modalstrip,
  );

  return (
    <>
      <div
        id="modalStripSuccess"
        className={
          !modalType
            ? "modal-strip modal-top"
            : "modal-strip modal-top modal-active bg-" + modalType
        }
        style={{
          borderRadius: "10px",
          border: "solid 1px #ffffff",
          color: "#ffffff",
          left: "26%",
          padding: "17px",
          position: "fixed",
          width: "48%",
          display: "inline-block",
        }}
      >
        <div className="container">
          <div className="text-center">{message}</div>
        </div>
      </div>
    </>
  );
};

export default ModalStrip;
