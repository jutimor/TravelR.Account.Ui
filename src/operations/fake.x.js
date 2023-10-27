// import * as React from 'react';
// import { render, fireEvent } from '@testing-library/react';
// import TextField from '@mui/material/TextField';

// const inputMock = jest.fn();

// const Test = () => (
//   <TextField
//     data-testid="name"
//     variant="outlined"
//     error={false}
//     required
//     onChange={inputMock}
//     name={name}
//     label={'label'}
//     defaultValue={'4711'}
//     placeholder={'Enter Number'}
//     fullWidth
//   />
// );

// test('Input', () => {
//   const container = render(<Test />);

//   const input = container.getByDisplayValue('4711') ;

//   fireEvent.change(input, { target: { value: '42' } });
//   expect(input.value).toBe('42');
//   expect(inputMock.mock.calls).toHaveLength(1);
// });