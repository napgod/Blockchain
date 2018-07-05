const Wallet = require('../wallet');
const Transaction = require('../wallet/transaction')
class Miner {
    constructor(blockchain, transactionPool, wallet, p2pServer) {
        this.blockchain = blockchain;
        this.transactionPool = transactionPool;
        this.wallet = wallet;
        this.p2pServer = p2pServer;
    }
    
    mine() {
        const validTransaction = this.transactionPool.validTransactions();
        // include a reward for the miner
        validTransaction.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));
        
        // create a block consisting of valid transactions
        const block = this.blockchain.addBlock(validTransaction);
        
        // synchronize the chains in the peer-to-peer server
        this.p2pServer.syncChains();
        
        // clear the transaction pool
        this.transactionPool.clear();
        
        this.p2pServer.broadcastClearTransactions();      
        // broadcast to every miner to clear their transaction Pool
        
        return block;
    }
}

module.exports = Miner;