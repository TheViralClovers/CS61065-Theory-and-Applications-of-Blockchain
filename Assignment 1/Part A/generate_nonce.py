from hashlib import sha256

def generate_nonce(Z, D, transactions):
    nonce = 0

    while True:
        hash_str = sha256(
            (transactions+str(nonce)).encode('utf-8')).hexdigest()

        if hash_str.startswith(Z*"0") and sum(ord(char) for char in hash_str) % D == 0:
            break

        nonce += 1
    
    return (nonce,hash_str)