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

// const Transition = React.forwardRef(function Transition(props, ref) {
//   return <Slide direction="up" ref={ref} {...props} />;
// });

export default function AddOperationDialog(props) {

  const { opened,  vehicles, handleClose } = props;

  const [ form, onFormChange ] = React.useState({
    isValid : false,
    amount: 0,
    date: new Date(),
    selectedVehicle : null,
    label : '',
    valid : false
  });


  const handleCancel = () => {
    onFormChange({
      isValid : false,
      amount: 0,
      date: new Date(),
      selectedVehicle : null,
      label : '',
      valid : false
    });
    handleClose();
  };
  
  const handleSave = () => {
    handleClose(form);
  };


  const handleVehicle = (event, vehicle) => {
    onFormChange({
      selectedVehicle: vehicle,
      amount: form.amount,
      date: form.date,
      isValid: vehicle && form.amount !== 0 ? true : false
    })
  };

  const handleAmount = (amount) => { 
    const amountNumber = amount ? parseFloat(amount): 0;
    onFormChange({
      selectedVehicle: form.selectedVehicle,
      amount: amountNumber,
      date: form.date,
      isValid: form.selectedVehicle && amountNumber !== 0 ? true : false
    })
  };

  const handleDate = (date) => { 
    onFormChange({
      selectedVehicle: form.selectedVehicle,
      amount: form.amount,
      date: date.toDate(),
      isValid: form.selectedVehicle && form.amount !== 0 ? true : false
    })
  };

  

  return (
      <Dialog
        open={opened}
        // TransitionComponent={Transition}
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
                value={form.selectedVehicle}
                onChange={handleVehicle}>
                  {
                    vehicles?.map((vehicle, index) => (
                      <ToggleButton 
                        key={index} 
                        role="vehicle" 
                        variant="contained" 
                        className='my-button' 
                        value={vehicle} 
                        data-testid={vehicle+'-value'}
                        onChange={handleVehicle}><LocalTaxiIcon /> {vehicle}</ToggleButton>
                    ))
                  }
                    
              </ToggleButtonGroup>
            </div>
            <div>
              <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="fr">
                  <DatePicker 
                    label="Date de l'operation" 
                    dateFormat='DD/MM/YYYY'  
                    value={dayjs(form.date)} 
                    onChange={value => handleDate(dayjs(value))} />
              </LocalizationProvider>
            </div>
            
            <TextField
              autoFocus
              margin="dense"
              id="amount"
              inputProps={{ "data-testid": "amount-input" }}
              data-testid="amount"
              label="Montant"
              type="number"
              fullWidth
              value={form.amount}
              onChange={e => handleAmount(e.target.value)}
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
                <RadioGroup  data-testid="category-control"
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
          <Button data-testid="cancel-button" className="my-button" onClick={handleCancel} variant="outlined">Annuler</Button>
          <Button data-testid="save-button" disabled={!form.isValid} className="my-button" onClick={handleSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
  );
} 