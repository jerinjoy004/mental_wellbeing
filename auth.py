import os
from supabase import create_client, Client
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

# Initialize Supabase client
supabase_url: str = os.getenv("SUPABASE_URL")
supabase_key: str = os.getenv("SUPABASE_ANON_KEY")
supabase: Client = create_client(supabase_url, supabase_key)

# Function to sign up a new user
def sign_up(email: str, password: str):
    try:
        response = supabase.auth.sign_up({"email": email, "password": password})
        print("Sign-up successful:", response)
    except Exception as e:
        print("Error during sign-up:", e)

# Function to sign in an existing user
def sign_in(email: str, password: str):
    try:
        response = supabase.auth.sign_in_with_password({"email": email, "password": password})
        print("Sign-in successful:", response)
    except Exception as e:
        print("Error during sign-in:", e)

# Function to sign out the current user
def sign_out():
    try:
        supabase.auth.sign_out()
        print("Sign-out successful")
    except Exception as e:
        print("Error during sign-out:", e)

# Function to get the current user
def get_current_user():
    try:
        user = supabase.auth.get_user()
        print("Current user:", user)
    except Exception as e:
        print("Error fetching current user:", e)

# Example usage
if __name__ == "__main__":
    # Sign up a new user
    #sign_up("jerinkuttan412@gmail.com", "password123")

    # Sign in the user
    sign_in("jerinkuttan412@gmail.com", "password123")

    # Get the current user
    get_current_user()

    # Sign out the user
    sign_out()
