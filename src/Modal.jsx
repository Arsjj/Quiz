import React from "react";
import { useGlobalContext } from "./context";
import { Button } from "@nextui-org/react";

const Modal = () => {
  console.log(useGlobalContext());
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content rounded-3xl">
        <h2>congrats!</h2>
        <p>
          You answered {((correct / questions.length) * 100).toFixed(0)}% of
          questions correctly
        </p>
        <Button className="w-full max-w-40 bg-amber-500/90 text-base font-semibold" onClick={closeModal}>
          Play again
        </Button>
      </div>
    </div>
  );
};

export default Modal;
