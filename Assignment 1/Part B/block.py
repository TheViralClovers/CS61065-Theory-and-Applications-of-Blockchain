from hashlib import sha256

block_version = '02000000'
class Block:
    def __init__(self, prev_block_hash, root, transaction_data):
        self.prev_block_hash = prev_block_hash
        self.root = root
        self.transaction_data = transaction_data
        self.hash = sha256((block_version + prev_block_hash + root).encode('utf-8'))
