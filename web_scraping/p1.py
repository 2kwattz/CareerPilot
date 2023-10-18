
substitution_key = {
    'A': 'Q', 'B': 'W', 'C': 'E', 'D': 'R', 'E': 'T',
    'F': 'Y', 'G': 'U', 'H': 'I', 'I': 'O', 'J': 'P',
    'K': 'A', 'L': 'S', 'M': 'D', 'N': 'F', 'O': 'G',
    'P': 'H', 'Q': 'J', 'R': 'K', 'S': 'L', 'T': 'Z',
    'U': 'X', 'V': 'C', 'W': 'V', 'X': 'B', 'Y': 'N',
    'Z': 'M'
}

def monoalphabetic_cipher_encrypt(plaintext):
    encrypted_text = ''
    for char in plaintext:

        encrypted_char = substitution_key.get(char.upper(), char)

        if char.islower():
            encrypted_text += encrypted_char.lower()
        else:
            encrypted_text += encrypted_char
    return encrypted_text

plaintext = input("Enter Plain text\n")
encrypted_text = monoalphabetic_cipher_encrypt(plaintext)
print("The encrpted text is ",encrypted_text)
