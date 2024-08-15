import random
from sympy import isprime, mod_inverse
import hashlib

def generate_prime_candidate(length):
    p = random.getrandbits(length)
    p |= (1 << length - 1) | 1
    return p

def generate_prime_number(length):
    p = 4
    while not isprime(p):
        p = generate_prime_candidate(length)
    return p


def generate_keys(length=1024):
    p = generate_prime_number(length // 2)
    q = generate_prime_number(length // 2)
    n = p * q
    phi_n = (p - 1) * (q - 1)
    e = 65537  
    d = mod_inverse(e, phi_n)
    return (e, n), (d, n)

def encrypt(public_key, plaintext):
    e, n = public_key
    m = int.from_bytes(plaintext.encode(), 'big')
    c = pow(m, e, n)
    return c

def decrypt(private_key, ciphertext):
    d, n = private_key
    m = pow(ciphertext, d, n)
    plaintext = m.to_bytes((m.bit_length() + 7) // 8, 'big').decode()
    return plaintext


def sign(private_key, message):
    d, n = private_key
    message_hash = int.from_bytes(
        hashlib.sha256(message.encode()).digest(), 'big')
    signature = pow(message_hash, d, n)
    return signature


def verify(public_key, message, signature):
    e, n = public_key
    message_hash = int.from_bytes(
        hashlib.sha256(message.encode()).digest(), 'big')
    decrypted_hash = pow(signature, e, n)
    return decrypted_hash == message_hash