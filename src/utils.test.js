import {currencyFormat} from './utils';

it('should display currency', () => {
    expect(currencyFormat(1)).toBe('1.00 €')
    expect(currencyFormat(153.5)).toBe('153.50 €')
    expect(currencyFormat(2153.5)).toBe('2 153.50 €')
})