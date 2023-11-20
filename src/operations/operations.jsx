import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { currencyFormat }  from '../utils'
import './operations.css'


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
  
export default function Operations(props) {

  const { operations } = {...props}

    return (
        <div className="my-operations">
            {operations?.map((operation, index) => (
                <Card key={index}  className='my-operation' variant="outlined">
                    <CardHeader 
                        avatar={
                            <Avatar {...stringAvatar(operation.selectedVehicle+' '+operation.category)} />
                        }
                        title={ operation.selectedVehicle } subheader={ operation.category }
                        action={
                          <div>
                            <span><strong>{currencyFormat(operation.amount)}</strong></span>
                            <br />
                            <span> 
                              { new Date(operation.date).toLocaleDateString("fr-FR", { dateStyle: 'short'})}
                            </span><br />
                            <span> 
                                {new Date(operation.date).toLocaleTimeString("fr-FR", { timeStyle: 'short'}) } 
                            </span>
                          </div> 
                        }
                    >
                    </CardHeader>
                </Card>
            ))}
        </div>);
}