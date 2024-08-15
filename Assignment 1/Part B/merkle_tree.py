from hashlib import sha256

class MerkleNode:
    def __init__(self, data, left=None, right=None):
        self.data = data
        self.right = right
        self.left = left
        self.root = sha256(data.encode('utf-8')).hexdigest()


def build_merkle_tree(transaction_list):
    if (len(transaction_list) == 1):
        return MerkleNode(transaction_list[0])

    if (len(transaction_list) % 2 != 0):
        transaction_list.append(transaction_list[-1])

    mid = len(transaction_list)//2

    left_tree = build_merkle_tree(transaction_list[:mid])
    right_tree = build_merkle_tree(transaction_list[mid:])

    combined_hash = left_tree.root + right_tree.root

    root = MerkleNode(combined_hash, left_tree, right_tree)
    return root