from generate_nonce import generate_nonce

Z = 3
D = 4

block_version = '02000000'
class Block:
    def __init__(self, prev_block_hash, root, transaction_data):
        self.prev_block_hash = prev_block_hash
        self.root = root
        self.transaction_data = transaction_data
        self.nonce, self.hash = generate_nonce(Z,D,block_version + prev_block_hash + root)
        
