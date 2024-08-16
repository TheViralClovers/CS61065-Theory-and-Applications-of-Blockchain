from generate_nonce import generate_nonce

block_count = int(input())
concat_transaction = ""
nonce = 0

for i in range(block_count):
    transaction_count = int(input())
    
    for j in range(transaction_count):
        transaction = input()
        concat_transaction += transaction

    Z,D = map(int,input().split())

    nonce,hash_str = generate_nonce(Z,D,concat_transaction)

    print(f"Valid Nonce: {nonce}")
    print(f"Hash: {hash_str}")