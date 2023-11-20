import { render, screen, fireEvent } from "@testing-library/react"
import AddOperationDialog from "./add-operation-dialog"
import '@testing-library/jest-dom'
import userEvent from '@testing-library/user-event'
import { act } from "react-dom/test-utils";

const user = userEvent.setup()

describe("<AddOperationDialog />" , () => {
    test("Basic", () => {

        const inputs = {
            opened:true,
            vehicles:['Golf', 'Tiguan', 'Repsol']
        };

        act(() => {
            render(<AddOperationDialog 
                opened={inputs.opened} 
                vehicles={inputs.vehicles}/>);
            });

        expect(screen.getByText("Nouvelle opération")).toBeInTheDocument();

        const vehicle = screen.getAllByRole("vehicle");
        expect(vehicle.length).toBe(inputs.vehicles.length);

        const saveButton = screen.getByTestId('save-button'); 
        expect(saveButton).toBeTruthy();
        expect(saveButton).toBeDisabled();
    });

    test("Correctly filled", () => {
        const inputs = {
            opened:true,
            selectedVehicle:'Golf',
            vehicles:['Golf', 'Tiguan', 'Repsol'],
            amount: '50',
            handleClose: jest.fn()
        };

        const result  = render(<AddOperationDialog 
                opened={inputs.opened} 
                vehicles={inputs.vehicles}
                handleClose={inputs.handleClose}
                />); 

        const saveButton = result.getByTestId('save-button'); 
        expect(saveButton).toBeTruthy();
        expect(saveButton).toBeDisabled();

        const amountText = screen.getByTestId('amount-input');  

        fireEvent.change(amountText, { target: { value: inputs.amount } });
        expect(amountText.value).toBe(inputs.amount);

        const GolfVehicle = screen.getByTestId(inputs.selectedVehicle + '-value');  

        fireEvent.click(GolfVehicle);
        expect(saveButton).toBeEnabled();

        fireEvent.click(saveButton);
        
        expect(inputs.handleClose.mock.calls).toHaveLength(1);

        expect(inputs.handleClose.mock.calls[0][0].amount).toBe(parseFloat(inputs.amount));
        expect(inputs.handleClose.mock.calls[0][0].isValid).toBeTruthy();
        expect(inputs.handleClose.mock.calls[0][0].selectedVehicle).toBe(inputs.selectedVehicle);
        
    });
})