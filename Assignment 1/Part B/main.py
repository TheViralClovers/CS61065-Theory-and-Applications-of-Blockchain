from hashlib import sha256
from merkle_tree import build_merkle_tree
from block import Block 
from rsa import * 

genesis_txn = 'coinbase'
block_version = '02000000'

genesis_root = build_merkle_tree([genesis_txn]).root
genesis_hash = sha256((block_version + genesis_root).encode('utf-8')).hexdigest()

prev_block_hash = genesis_hash
    
with open('input.txt', 'r') as file:
    block_count = int(file.readline())
    for _ in range(block_count):
        transaction_count = int(file.readline())
        transactions = []

        for _ in range(transaction_count):
            transactions.append(file.readline())
        
        merkle_root = build_merkle_tree(transactions).root
        current_block = Block(prev_block_hash, merkle_root, transactions)
        current_block_header_hash = current_block.hash.hexdigest()

        public_key = eval(file.readline())
        private_key = eval(file.readline())

        signature = sign(private_key, current_block_header_hash)
        verify_block = verify(public_key, current_block_header_hash, signature)

        if(verify_block and current_block.prev_block_hash == prev_block_hash):
            print("Valid")

        else:
            print("Invalid")

        prev_block_hash = current_block_header_hash