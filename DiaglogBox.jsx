

import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import './DiaglogBox.css'; // import the CSS file

function DialogBox({ onDelete }) {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleDelete = () => {
    onDelete();
    handleClose();
  };

  return (
    <>
      <Button
        variant="contained"
        color="secondary"
        onClick={handleOpen}
        startIcon={<DeleteIcon />}
      >
        Delete
      </Button>
      <div className='dialog'
        open={open}
        onClose={handleClose}

      >
        <div className="content">
          <div className="header">
            <h2>Delete Model</h2>
            <p>This action is irreversible. Are you sure you want to delete this model?</p>
          </div>
          <div>
            <Button className="'CancelButton" onClick={handleClose}>
              Cancel
            </Button>
            <Button className="deleteButton" onClick={handleDelete}>
              Delete
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default DialogBox;

