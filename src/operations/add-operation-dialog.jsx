import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import dayjs from 'dayjs';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import LocalTaxiIcon from '@mui/icons-material/LocalTaxi';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import EuroIcon from '@mui/icons-material/Euro'; 
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import InputAdornment from '@mui/material/InputAdornment';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

import 'dayjs/locale/fr';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddOperationDialog(props) {

  const { opened, handleClose } = props;

  const [ operationDate, setOperationDate ] = React.useState(new Date())

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
          <div>
            <div>
              <ToggleButtonGroup 
                exclusive= {true}
                value={vehicule}
                onChange={handleVehicule}
                aria-label="outlined primary button group">
                <ToggleButton variant="contained" className='my-button' value="Golf" ><LocalTaxiIcon /> Golf</ToggleButton>
                <ToggleButton className='my-button' value="Tiguan"><LocalTaxiIcon /> Tiguan</ToggleButton>
              </ToggleButtonGroup>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                  <DatePicker label="Date de l'operation" dateFormat='DD/MM/YYYY'  value={dayjs(operationDate)} />
              </LocalizationProvider>
            </div>

            
            
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
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <EuroIcon />
                  </InputAdornment>
                ),
              }}
            />
            </div>
            <div>
              <FormControl>
                <FormLabel id="operation-Category-control">Catégorie</FormLabel>
                <RadioGroup 
                  aria-labelledby="operation-Category-label"
                  defaultValue="carburant"
                  name="radio-buttons-group"
                >
                  <FormControlLabel color="primary" value="carburant" control={<Radio />} label="Carburant" />
                  <FormControlLabel color="primary" value="pneux" control={<Radio />} label="Pneux" />
                  <FormControlLabel color="secondary" value="entretien" control={<Radio />} label="Entretien" />
                  <FormControlLabel color="secondary" value="assurance" control={<Radio />} label="Assurance" />
                  <FormControlLabel color="secondary" value="autre" control={<Radio />} label="Autre" />
                </RadioGroup>
              </FormControl>
            </div>
        </DialogContent>
        <DialogActions>
          <Button className="my-button" onClick={handleCancel} variant="outlined">Annuler</Button>
          <Button className="my-button" onClick={handleSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
  );
}