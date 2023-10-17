import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

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
import { getAccounts } from './services';
import { currencyFormat }  from './utils'

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


  const [accounts, setAccounts] = useState([]);
  const [selectedAccount, setSelectedAccount] = useState({amount: 0, name : 'name'});
  const [editACcount, setEditAccount] = useState(false);

  useEffect(() => {
      getAccounts()
      .then((response) => response.json())
      .then(json => {
          const result = json;
          setAccounts(result);
        });
  }, []);

  const handleClose = (account) => {
    
    let accountsTmp = accounts.slice();
    const selectedAccounts = accountsTmp.filter(x => x.id === account.id);
    if ( selectedAccounts.length === 1)
    {
      selectedAccounts[0].amount = account.amount;
    }
    
    setAccounts(accountsTmp);
    setEditAccount(false);
  };

  const editAccount= (account) => {
    setSelectedAccount({...account});
    setEditAccount(true);
  }

  return (
        <>
          <div className='my-accounts'>
            {accounts.map((account, index) => (
              <Card key={index} className='my-account' variant="outlined">
                <CardHeader 
                  avatar={
                    <Avatar sx={{ bgcolor: deepPurple[500] }}>
                      <AccountBalanceWalletIcon className='account-icon-card'></AccountBalanceWalletIcon>
                    </Avatar>
                  }
                  title={ account.name} subheader={currencyFormat(account.amount)}
                  action={
                        <Tooltip title="Editer le compte">
                          <IconButton aria-label="Editer le compte"
                            onClick={
                              () => editAccount(account) }
                          >
                            <ModeIcon />
                          </IconButton>
                      </Tooltip>
                  }>
                </CardHeader>
              </Card>
              
            ))}
          </div>
          <TravelingActions clicked={
                  () => setEditAccount(!editACcount)
                }></TravelingActions>
          <Operations></Operations>
        <EditAccountDialog opened={editACcount} selectedAccount={selectedAccount}  handleClose={handleClose}></EditAccountDialog>
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
root.render(<CustomThemeProvider></CustomThemeProvider>);