import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';


import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddOperationDialog(props) {

  const { opened, handleClose } = props;

  const [newOperation, setNewOperation] = React.useState({
    label: '',
    date: null,
    amount: 100
  });

  const setLabel = (label) => {
    setNewOperation(
      {
        label,
        date: newOperation.date,
        amount: newOperation.amount
      }
    )
  }

  const setAmount = (amount) => {
    setNewOperation(
      {
        label: newOperation.label,
        date: newOperation.date,
        amount: amount
      }
    )
  }

  const handleCancel = () => {
    // handleClose();
  };
  
  const handleSave = () => {
    // handleClose({
    //   label: '',
    //   date: null,
    //   amount: 0
    // });
  };

  const [vehicule, setVehicule] = React.useState('Golf');

  const handleVehicule = (event, vehicule) => {
    setVehicule(vehicule);
  };

  return (
      <Dialog
        open={opened}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Ajout d'une opération"
      >
        <DialogTitle>{ "Nouvelle opération" }</DialogTitle>
        <DialogContent className='field-container'>

      <div >
        <ToggleButtonGroup 
          exclusive= {true}
          value={vehicule}
          onChange={handleVehicule}
          variant="contained" aria-label="outlined primary button group">
          <ToggleButton variant="outlined" className='my-button' value="Golf" ><LocalTaxiIcon /> Golf</ToggleButton>
          <ToggleButton className='my-button' value="Tiguan"><LocalTaxiIcon /> Tiguan</ToggleButton>
        </ToggleButtonGroup>
        </div>
      <div>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
          {/* <DemoContainer components={['DatePicker']}> */}
            <DatePicker label="Date de l'operation" />
          {/* </DemoContainer> */}
        </LocalizationProvider>
        </div>
          <TextField
            autoFocus
            margin="dense"
            id="label"
            label="Nom de l'operation"
            type="text"
            fullWidth
            value={newOperation.label}
            onChange={e => setLabel(e.target.value)}
            variant="standard"
          />
          <TextField
          
            autoFocus
            margin="dense"
            id="amount"
            label="Montant"
            type="number"
            fullWidth
            // defaultValue={selectedAccount.name}
            value={newOperation.amount}
            onChange={e => setAmount(e.target.value)}
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button className="my-button" onClick={handleCancel} variant="outlined">Annuler</Button>
          <Button className="my-button" onClick={handleSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
  );
}