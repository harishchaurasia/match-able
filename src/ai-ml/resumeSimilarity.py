import openai
from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv()  # Load variables from .env

openai.api_key = os.getenv("OPENAI_API_KEY")
client = OpenAI()

def resumeSimilarity(resume, jobDesc):
  response = client.chat.completions.create(
    model="gpt-3.5-turbo",
    messages=[
      {
        "role": "user",
        "content": [
          {
            "type": "text",
            "text": f"Given below is a person's resume enclosed by 3 backticks\n\n```{resume}```\n\nGiven below is a job description enclosed by 3 backticks\n\n```{jobDesc}```\n\nReturn an estimated percentage overlap between the job's demands and the jobseekers' skills and capabilities. return the output as json with key percentageOverlap"
          }
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

  generation = generation.replace("```json", "")
  generation = generation.replace("```", "")

  # Parse the JSON string
  try:
    generation_json = json.loads(generation)
    percentage_overlap = generation_json.get("percentageOverlap")
    print("percentageOverlap", percentage_overlap)

    # # Calculate intersection and union
    # intersection = person_quals.intersection(job_quals)
    # union = person_quals.union(job_quals)

    # # Calculate percentage overlap
    # percentage_overlap = (len(intersection) / len(union)) * 100

    # print("percentage overlap", percentage_overlap)
    return percentage_overlap

  except json.JSONDecodeError:
    print("Error: Could not decode JSON")
    return None, None

if __name__ == '__main__':
  resume = """[Full Name]
[City, State] • [Phone Number] • [Email Address] • [LinkedIn Profile URL]

Objective
Finance graduate with strong analytical and problem-solving skills, seeking a financial analyst or investment banking role in an inclusive, supportive environment.

Education
BBA in Finance
[University Name], [City, State]
Graduation Date: [Month, Year] | GPA: 3.6/4.0
Relevant Coursework: Financial Modeling, Corporate Finance, Investment Banking

Experience
Financial Analyst Intern
[Company Name], [City, State]
[Month, Year] – [Month, Year]

Conducted market research, analyzed financial metrics, and prepared portfolio reports.
Created valuation models and streamlined data processes, improving efficiency by 20%.
Investment Banking Intern
[Bank Name], [City, State]
[Month, Year] – [Month, Year]

Supported senior bankers with pitch books and financial analyses for M&A transactions.
Built sensitivity analyses, enhancing decision-making accuracy.
Skills
Technical: Excel (advanced), Bloomberg, Python
Analytical: Financial modeling, market research
Soft Skills: Communication, teamwork
Certifications
Bloomberg Market Concepts (BMC)
Excel for Financial Analysis
Additional Information
Disability Accommodations: Motor disability; seeking minor accommodations in a supportive workplace.
"""
  jobDesc = """**Software Engineer at Google**

As a Software Engineer at Google, you’ll be part of a collaborative team focused on developing innovative solutions that impact millions of users worldwide. In this role, you’ll design, implement, and maintain scalable software systems, with opportunities to work across various domains, including cloud computing, artificial intelligence, mobile development, and data infrastructure. You’ll work closely with product managers and cross-functional teams to ensure alignment on project objectives, integrating user-focused design principles to create exceptional user experiences.

Your daily responsibilities include coding, debugging, and deploying software solutions using Google’s extensive tech stack. You’ll participate in code reviews, contribute to design discussions, and troubleshoot complex issues that arise in production, ensuring high standards of performance, reliability, and scalability. As part of a continuous learning environment, you’ll have the chance to explore new technologies, contribute to open-source projects, and enhance your technical skills.

This position requires strong programming skills in languages such as Python, Java, or C++, and an understanding of data structures and algorithms. Google offers a culture of innovation and mentorship, encouraging you to bring fresh ideas and develop as an engineer while shaping the future of technology."""

  resumeSimilarity(resume, jobDesc)
