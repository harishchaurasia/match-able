import openai
from openai import OpenAI
from dotenv import load_dotenv
import os

load_dotenv()  # Load variables from .env

openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

def llmFeedback(jobDescription):
  client = OpenAI()

  response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": f"Analyze this job description below delemited by three backticks for accessibility and inclusion. Provide a 150-word feedback touching these metrics:\n\n        - Accomodation of Physical Requirements\n        - Accommodation Language\n        - Ableist Language\n        - Flexibility Options during job and recruitment\n\n```{jobDescription}``\n\nProvide specific, actionable feedback in no more than 150 words"          }
        ]
      }
    ],
    temperature=1,
    max_tokens=2048,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0,
    response_format={
      "type": "text"
    }
  )

  generation = response.choices[0].message.content

  print(generation)

  return generation

if __name__ == "__main__":
  jobDesc = """Name: BlackRock
              Job Title: Quantitative Analyst
              Location: NYC
              
              Job Description
              Strong proficiency in programming languages such as Python, R, or SQL.
              Solid grasp of statistical analysis and a keen understanding of financial markets.
              Familiarity with data platforms like Bloomberg Terminal and data science tools.
              Ability to work under deadlines in a fast-paced, results-oriented environment.
              Clear communication skills for sharing insights with technical and non-technical audiences.
              
              Accessibility Services
              Workspace Design: Open-plan office with flexible desk arrangements; shared and collaborative areas available.
              Remote Work Flexibility: Limited remote options based on team schedule requirements.
              Assistive Technology: Screen readers and ergonomic equipment available upon request.
              Additional Support: HR team available to discuss any specific accommodations on an as-needed basis."""

  llmFeedback(jobDesc)

