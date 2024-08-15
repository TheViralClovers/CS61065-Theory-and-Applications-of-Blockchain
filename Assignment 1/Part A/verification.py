from hashlib import sha256

block_count = int(input())
concat_transaction = ""
nonce = 0

for i in range(block_count):
    transaction_count = int(input())
    
    for j in range(transaction_count):
        transaction = input()
        concat_transaction += transaction

    Z,D = map(int,input().split())

    while True:
        hash_str = sha256((concat_transaction+str(nonce)).encode('utf-8')).hexdigest()

        if hash_str.startswith(Z*"0") and sum(ord(char) for char in hash_str) % D == 0:
            break

        nonce += 1

    print(f"Valid Nonce: {nonce}")
    print(f"Hash: {hash_str}")