import React, { useState, useEffect } from 'react';
import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import Button from "@mui/material/Button";
import Snackbar from '@mui/material/Snackbar';
import Skeleton from '@mui/material/Skeleton';

import './index.css';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';

import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import IconButton from '@mui/material/IconButton';

import ModeIcon from '@mui/icons-material/Mode';

import { ThemeProvider , createTheme } from '@mui/material/styles';
import StyledEngineProvider from "@mui/material/StyledEngineProvider";

import TravelingActions from './traveling-actions/traveling-actions';
import EditAccountDialog from './edit-account-dialog';
import Operations from './operations/operations';
import { green , deepPurple} from '@mui/material/colors';
import { getAccounts, getOperations, updateAccount, addAccount, deleteAccount } from './services';
import { currencyFormat }  from './utils'
import AddOperationDialog from './operations/add-operation-dialog';
import DeclareDomusDialog from './operations/declare-domus-dialog';
import ClearIcon from '@mui/icons-material/Clear';

const theme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
    secondary: {
      main: green[500],
    },  
  }
});

export default function RecipeReviewCard() {

  const [ accountsLoading, setAccountsLoading]= useState(true);
  const [accounts, setAccounts] = useState([]);
  const [operations, setOperations] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({amount: 0, name : ''});
  const [editACcount, setEditAccount] = useState(false);
  const [addOperation, setAddOperation] = useState(false);
  const [declareDomus, setDeclareDomus] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  
  useEffect(() => {
      getAccounts()
      
      .then((response) => response.json())
      .then(json => {
          if (json.error) {
            throw new Error("Impossible de récupérer les comptes", {cause: json.message});
          }
          setAccounts(json);
        })
        .catch(err => {
          setAccounts([]);
          setOpenSnackbar(true);
        });

      getOperations()
      .then((response) => response.json())
      .catch(err => {
        setOperations([]);
        setOpenSnackbar(true);
      })
      .then(json => {
          const result = json?.sort((a, b) => {
            if (a.date > b.date) {
              return -1;
            }
            if (a.date < b.date) {
              return 1;
            }
            return 0;
          });
          setOperations(result);
          setAccountsLoading(false);
        });
  }, []);


  const handleCloseAmount = (account) => {
    setEditAccount(false);
    setAccountsLoading(true);
    let accountsTmp = accounts.slice();
    if (!account)
    {
      setAccountsLoading(false);
      return;
    } 

    if (!account['_id']) {
      addAccount(account).then(json => {
        setAccountsLoading(false);
        account._id = json.insertedId;
        accountsTmp.push(account);
        setAccounts(accountsTmp);
      });
    } 
    else 
    {
      const selectedAccounts = accountsTmp.filter(x => x._id === account._id);
      if ( selectedAccounts.length === 1)
      {
        selectedAccounts[0].amount = account.amount;
        selectedAccounts[0].name = account.name;
        updateAccount(selectedAccounts[0])
        .then(json => {
          if (json.error) {
            throw new Error("Impossible de récupérer les comptes", {cause: json.message});
          }
          setAccounts(accountsTmp);
          setAccountsLoading(false);
        })
        .catch(err => {
          setAccountsLoading(false);
          setOpenSnackbar(true);
        });
      }
      
    }
  };

  const handleCloseDomus = (domus) => {
    setDeclareDomus(false);
  }

  const handleCloseNewOperation = (operation) => { 

    if (!operation) {
      return;
    }

    const newOperationsList = operations.slice();
    operation.date = operation.date.toJSON();
    newOperationsList.push(operation);
    newOperationsList.sort((a, b) => {
      if (a.date > b.date) {
        return -1;
      }
      if (a.date < b.date) {
        return 1;
      }
      return 0;
    });

    setOperations(newOperationsList);

  }

  const editAccount = (account) => {
    setSelectedAccount(account);
    setEditAccount(true);
  }

  const deleteAccountClicked = (account) => {
    const newAccountsList = accounts.slice();
    const indexToDelete = newAccountsList.findIndex(item => item._id === account._id);

    deleteAccount(account)
      .then(() => {
        
        if (indexToDelete !== -1)
        {
          newAccountsList.splice(indexToDelete, 1);
        }
        
        setAccounts(newAccountsList);
      })
  }

  return (
        <>
          <div className='my-accounts'>

            { 
              accounts?.map((account, index) => (
              <Card key={index} className='my-account' variant="outlined">
                <CardHeader 
                  avatar={
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      <AccountBalanceWalletIcon className='account-icon-card'></AccountBalanceWalletIcon>
                    </Avatar>
                  }
                  title={ account.name} subheader={currencyFormat(account.amount)}
                  action={<>
                            <Tooltip title="Editer le compte">
                              <IconButton aria-label="Editer le compte"
                                onClick={
                                  () => editAccount(account) }
                              >
                                <ModeIcon />
                              </IconButton>
                            </Tooltip>
                            
                            <Tooltip title="Suprimer le compte">
                              <IconButton aria-label="Suprimer le compte"
                                onClick={
                                  () => deleteAccountClicked(account) }
                              >
                                <ClearIcon />
                              </IconButton>
                            </Tooltip>
                          </>
                  }>
                </CardHeader>
              </Card>

                )) }
              {  accountsLoading ? 
                <Card  className='my-account' variant="outlined">
                  <CardHeader 
                    avatar={<Skeleton animation="wave" variant="circular" width={40} height={40} />}
                    title={ <Skeleton animation="wave"   />} 
                    subheader={ <Skeleton animation="wave"   width="80%" />}>
                    </CardHeader>
                </Card>
                : ''
              }
            <Button className="my-button"
              aria-label="Ajouter un compte" 
              color="primary"
              variant="contained"
              onClick={() => editAccount({name:'', amount: 0})}
              startIcon={<AccountBalanceWalletIcon />}>Ajouter un compte
          </Button>
          </div>
          <TravelingActions 
            addOperationClicked={
                  () => setAddOperation(true)
                }
             
            declareDomusClicked={
              () => setDeclareDomus(true)
            }
                ></TravelingActions>
          <Operations operations={operations}></Operations>
        
          <Snackbar
            open={openSnackbar}
            autoHideDuration={6000}
            onClose={() => setOpenSnackbar(false)}
            message="Erreur d'appel Back"
          />


        <EditAccountDialog 
          opened={editACcount} 
          selectedAccount={selectedAccount}  
          handleClose={handleCloseAmount}></EditAccountDialog>
        <AddOperationDialog 
          opened={addOperation}  
          vehicles={['Golf', 'Tiguan', 'Repsol']}
          handleClose={handleCloseNewOperation}></AddOperationDialog>
        <DeclareDomusDialog 
          opened={declareDomus}  
          handleClose={handleCloseDomus}></DeclareDomusDialog>
      </>
  );  
}

export function CustomThemeProvider() {
  return (
    <StyledEngineProvider injectFirst>
      
   <ThemeProvider  theme={theme}>
      <RecipeReviewCard />
      </ThemeProvider >
    </StyledEngineProvider>
   
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<StrictMode><CustomThemeProvider></CustomThemeProvider></StrictMode>);