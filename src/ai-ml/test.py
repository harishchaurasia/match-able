import openai
import os

openai.api_key = os.getenv("OPENAI_API_KEY")

try:
    response = openai.Model.list()
    print("Successfully connected to OpenAI API")
except openai.error.AuthenticationError:
    print("Invalid API Key")
except Exception as e:
    print(f"OpenAI API Error: {e}")