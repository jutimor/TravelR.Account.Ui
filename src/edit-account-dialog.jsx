import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import TextField from '@mui/material/TextField';
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditAccountDialog(props) {

  const { opened, selectedAccount , handleClose } = props;
  const [controlAmount, setcontrolAmount] = React.useState(selectedAccount.amount); 

  React.useEffect(() => {
    if (opened) {
      setcontrolAmount(selectedAccount.amount);
    }
  }, [selectedAccount, opened]);

  const handleCancel = () => {
    setcontrolAmount(selectedAccount.amount);
    handleClose();
  };
  
  const handleSave = () => {
    handleClose({
      id: selectedAccount.id,
      name: selectedAccount.name,
      amount: controlAmount
    });
  };

  return (
      <Dialog
        open={opened}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="Modification du compte"
      >
        <DialogTitle>{ selectedAccount?.name }</DialogTitle>
        <DialogContent>
          
          <TextField
          
            autoFocus
            margin="dense"
            id="amount"
            label="Montant"
            type="number"
            fullWidth
            // defaultValue={selectedAccount.name}
            value={controlAmount}
            onChange={e => setcontrolAmount(e.target.value)}
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