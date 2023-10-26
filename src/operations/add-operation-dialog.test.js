import { render, screen } from "@testing-library/react"
import AddOperationDialog from "./add-operation-dialog"
import '@testing-library/jest-dom'

describe("<AddOperationDialog />" , () => {
    test("first one", () => {
        render(<AddOperationDialog opened={true} />);
        expect(screen.getByText("Nouvelle opération")).toBeInTheDocument();
    });
})