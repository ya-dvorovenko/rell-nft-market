import React from "react";

import { CreateTokenModal, CreateUserModal } from ".";
import { MODALS } from "../../constants";

import "./Modals.css"

export const ModalContainer = ({ showModal, closeModal }) => (
  <div className={showModal ? "modalContainer activeModal" : ""}>
    {console.log(showModal)}
    {showModal === MODALS.CREATE_TOKEN && <CreateTokenModal closeModal={closeModal} />}
    {showModal === MODALS.CREATE_USER && <CreateUserModal closeModal={closeModal} />}
  </div>
);
