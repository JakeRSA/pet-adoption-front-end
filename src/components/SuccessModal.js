import React from "react";
import Modal from "react-modal";
import "../styles/SuccessModal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons";

function SuccessModal(props) {
  return (
    <div>
      <Modal className="modal success-modal" isOpen={props.isOpen}>
        <span>
          <FontAwesomeIcon icon={faCheckCircle} />
          <h4>{props.text}</h4>
        </span>
      </Modal>
    </div>
  );
}

export default SuccessModal;
