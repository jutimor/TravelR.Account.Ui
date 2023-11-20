import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import InputAdornment from '@mui/material/InputAdornment';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
import EuroIcon from '@mui/icons-material/Euro'; 

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditAccountDialog(props) {
  const { opened, selectedAccount, handleClose } = props;

  const [internalAccount, setInternalAccount] = React.useState(selectedAccount); 

  React.useEffect(() => {
    if (opened) {
      setInternalAccount(selectedAccount);
    }
  }, [selectedAccount, opened]);
  
  const changeName = (newValue) =>
  {
    setInternalAccount({
      _id: internalAccount._id,
      name: newValue,
      amount: internalAccount.amount
    })
  }

  const changeAmount = (newValue) =>
  {
    setInternalAccount({
      _id: internalAccount._id,
      name: internalAccount.name,
      amount: newValue
    })
  }

  const handleCancel = () => {
    handleClose();
  };

  const handleSave = () => {
    handleClose(internalAccount);
  };

  return (
      <Dialog
        open={opened}
        TransitionComponent={Transition}
        keepMounted
        onClose={() => handleClose(null)}
        aria-describedby="Modification du compte"
      >
        <DialogTitle>Compte</DialogTitle>
        <DialogContent>
          
          <TextField
            margin="dense"
            id="name"
            inputProps={{ "data-testid": "name-input" }}
            data-testid="name"
            label="Nom"
            type="text"
            fullWidth
            value={internalAccount.name}
            onChange={e => changeName(e.target.value)}
            variant="standard"
          />

          <TextField
          
            autoFocus
            margin="dense"
            id="amount"
            label="Montant"
            type="number"
            fullWidth
            value={internalAccount.amount}
            onChange={e => changeAmount(e.target.value)}
            variant="standard"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <EuroIcon />
                </InputAdornment>
              ),
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button className="my-button" onClick={handleCancel} variant="outlined">Annuler</Button>
          <Button className="my-button" onClick={handleSave} variant="contained">Enregistrer</Button>
        </DialogActions>
      </Dialog>
  );
}