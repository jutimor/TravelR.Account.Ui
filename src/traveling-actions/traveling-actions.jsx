import Button from "@mui/material/Button";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EuroIcon from '@mui/icons-material/Euro';
import CardTravelIcon from '@mui/icons-material/CardTravel';
import Tooltip from '@mui/material/Tooltip';

import './traveling-actions.css';

export default function TravelingActions(props) {
    return (
        <div className="actions-zone">
            <Tooltip title="Ajouter une dépense">
                <Button className="my-button"
                    aria-label="Ajouter une dépense" 
                    color="secondary" 
                    variant="contained"
                    onClick={props.addOperationClicked}
                    startIcon={<CreditCardIcon />}
                >Ajouter une dépense
                </Button>
            </Tooltip>
            <Tooltip title="Déclarer un DOMUS">
                <Button className="my-button"
                aria-label="Déclarer un DOMUS" 
                color="primary"
                variant="contained"
                
                onClick={props.declareDomusClicked}
                startIcon={<EuroIcon />}>Déclarer un DOMUS
                </Button>
            </Tooltip>
            <Tooltip title="Déclarer un déplacement">
                <Button className="my-button"
                    aria-label="Déclarer un déplacement" 
                    color="secondary"
                    variant="contained"
                    onClick={props.declareFormClicked}
                    startIcon={<CardTravelIcon />}>Déclarer un déplacement
                </Button>
            </Tooltip>
        </div>
    )
  }
  