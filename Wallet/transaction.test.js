const Transaction = require('./transaction');
const Wallet = require('./index');
const {MINE_REWARD} = require('../config');

describe('transaction', () => {
    let transaction, wallet, recipient, amount;
    
    beforeEach(() => {
        wallet = new Wallet();
        amount = 50;
        recipient = 'r3c1p13nt';
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });
    
    it('ouputs the `amount` subtracted from the wallet balance', () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });
    
    it('outputs the `amount` added to the recipient', () => {
        expect(transaction.outputs.find(output => output.address === recipient).amount).toEqual(amount);
    });
    
    it('inputs the `amount` added to the recipient', () => {
       expect(transaction.input.amount).toEqual(wallet.balance); 
    });
    
    it('validates a valid transaction', () => {
       expect(Transaction.verifyTransactions(transaction)).toBe(true); 
    });
    
    it('invalidate an invalid transaction', () => {
       transaction.outputs[0] = 5000;
       expect(Transaction.verifyTransactions(transaction)).toBe(false);
    });
    
describe('transacting with an amount that exceeds the balance', () => {
    
    beforeEach(() => {
        amount = 5000;
        transaction =Transaction.newTransaction(wallet, recipient, amount);
        });
    
    it('expects not to create the transaction', () => {
        expect(transaction).toEqual(undefined);
        });
    });
    
describe('and updating a transaction', () => {
    let nextAmount, nextRecipient;
    
    beforeEach(() => {
        nextAmount = 20;
        nextRecipient = 'n3xt-4ddr355';
        transaction = transaction.update(wallet, nextRecipient, nextAmount);        
        });
    
    it(`subtracts the exact amount from the sender's output`, () => {
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance -  amount - nextAmount);      });
    it('outputs an amount for the next recipient', () => {
        expect(transaction.outputs.find(output => output.address === nextRecipient).amount).toEqual(nextAmount);
        });
    });     
describe('creating a reward transaction', () => {
  beforeEach(() => {
      transaction = Transaction.rewardTransaction(wallet, Wallet.blockchainWallet());
    });  
    it(`rewards the miner's wallet`, () => {
       expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(MINE_REWARD); 
    });
  });
});




