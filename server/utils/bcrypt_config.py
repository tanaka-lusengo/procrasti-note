from passlib.context import CryptContext

# Define the bcrypt context for hashing and verifying passwords
bcrypt_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
