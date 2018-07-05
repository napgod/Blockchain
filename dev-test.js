const Wallet = require('./Wallet');
const wallet = new Wallet();

console.log(wallet.toString());


/*const Blockchain = require('./blockchain');
const bc = new Blockchain();

for(let i = 0; i <= 3; i++){
    console.log(bc.addBlock(`foo ${i}`).toString());
}*/





/*const Block = require('./block');


const fooBlock = Block.mineBlock(Block.genesis(), 'foo');
console.log(fooBlock.toString());
const block = new Block('foo', 'bar', 'zoo', 'baz');
console.log(block.toString());
console.log(Block.genesis().toString());*/

