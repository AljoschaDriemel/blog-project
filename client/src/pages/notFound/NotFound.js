import * as React from 'react';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { flexbox } from '@mui/system';
import DoubleArrowIcon from '@mui/icons-material/DoubleArrow';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 600,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal() {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2" component="h1">
          404 - Not Found!
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <DoubleArrowIcon />
          <Link to="/">BACK TO DASHBOARD</Link> 
    </Typography>
          
        </Box>
      </Modal>
    </div>
  );
}



