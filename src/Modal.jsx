import React from "react";
import { useGlobalContext } from "./context";
import { Button } from "@nextui-org/react";

const Modal = () => {
  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (
    <div
      className={`${
        isModalOpen ? "modal-container isOpen" : "modal-container"
      }`}
    >
      <div className="modal-content rounded-3xl">
      <div className="absolute top-0 right-0 w-28 h-28">
          <img src="https://png.pngtree.com/png-vector/20230503/ourmid/pngtree-quiz-time-bubble-speech-banner-vector-design-png-image_7078139.png"></img>
        </div>
        <h2 className="mb-2 font-medium">Congrats!</h2>
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
