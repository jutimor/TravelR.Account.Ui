import '@testing-library/react';
import { getAccounts, getOperations } from './services';

describe('services', () => {
  let oFetch;
  beforeAll(() => {
    oFetch = global.fetch;
  });
  afterAll(() => {
    global.fetch = oFetch;
  });

  it('should get accounts when getAccounts method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const accounts = await getAccounts();

    expect(global.fetch).toHaveBeenCalled();
    expect(accounts).toStrictEqual([{}]);
  });

  
  
  it('should get operations when getOperations method is called', async () => {
    global.fetch = jest.fn().mockResolvedValue([{}]);
    const operations = await getOperations();

    expect(global.fetch).toHaveBeenCalled();
    expect(operations).toStrictEqual([{}]);
  });
});