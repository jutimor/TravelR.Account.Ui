import  { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { getOperations } from '../services';
import { currencyFormat }  from '../utils'



  function stringToColor(string) {
    let hash = 0;
    let i;
  
    /* eslint-disable no-bitwise */
    for (i = 0; i < string.length; i += 1) {
      hash = string.charCodeAt(i) + ((hash << 5) - hash);
    }
  
    let color = '#';
  
    for (i = 0; i < 3; i += 1) {
      const value = (hash >> (i * 8)) & 0xff;
      color += `00${value.toString(16)}`.slice(-2);
    }
    /* eslint-enable no-bitwise */
  
    return color;
  }

  function stringAvatar(name) {
    return {
      sx: {
        bgcolor: stringToColor(name),
      },
      children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
    };
  }
  
export default function Operations() {

    const [operations, setOperations] = useState([]);

    useEffect(() => {
      getOperations()
        .then((response) => response.json())
        .catch(err => setOperations([]))
        .then(json => {
            const result = json;
            setOperations(result);
          });
    }, []);

    return (
        <Box>
            {operations?.map((operation, index) => (
                <Card key={index}  className='my-account' variant="outlined">
                    <CardHeader 
                        avatar={
                            <Avatar {...stringAvatar(operation.label)} />
                        }
                        title={ operation.label } subheader={ operation.category }
                        action={currencyFormat(operation.amount)}
                    ></CardHeader>
                </Card>
            ))}
        </Box>);
}