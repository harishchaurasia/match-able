from openai import OpenAI
client = OpenAI()

response = client.chat.completions.create(
  model="gpt-4o",
  messages=[
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Analyze this job description below delemited by three backticks for accessibility and inclusion. Provide a 150-word feedback focusing on these metrics scores:\n\n        - Accomodation of Physical Requirements\n        - Accommodation Language\n        - Ableist Language\n        - Flexibility Options during job and recruitment\n\nJob Description:\nTechnical Requirements\n- Proficiency in programming languages such as Python, R, or SQL.\n- Strong knowledge of statistical analysis, financial markets, and investment principles.\n- Experience with large data sets, data mining techniques, and machine learning models.\n- Ability to communicate complex analyses effectively to both technical and non-technical audiences.\n\nAccessibility Accommodations\nPhysical Workspace: Ergonomically designed workstations, with height-adjustable desks and equipment adaptable for various physical needs.\nFlexible Work Arrangements: Options for remote or hybrid work, as well as customizable work hours based on individual needs.\nAssistive Technologies: Access to screen readers, voice-to-text software, and specialized keyboards and mice.\nOn-site Accessibility: Ramps, elevators, and accessible restrooms throughout the office building; service animal-friendly spaces.\nSupport Resources: Dedicated in-house accessibility team to address specific accommodations on an ongoing basis.\nNeurodiversity Considerations: Quiet workspaces, noise-canceling headphones, and sensory-friendly rooms are available upon request.\nAdditional Support: Personalized onboarding process to discuss accommodation needs and create a tailored work environment plan\n\n\nProvide specific, actionable feedback in 150 words"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "The job description scores highly on several accessibility and inclusion metrics. \n\n**Accommodation of Physical Requirements** is well-addressed with ergonomic workstations, adjustable equipment, and accessible facilities, offering a robust framework for various physical needs.\n\n**Accommodation Language** is clear and positive, detailing specific available resources and processes, which conveys an inclusive and supportive work culture. However, specifying a direct contact for accommodation inquiries would further enhance clarity and accessibility.\n\n**Ableist Language** appears to be absent, indicating an inclusive approach by focusing on capabilities and offering support for diverse needs.\n\n**Flexibility Options during job and recruitment** are strong, with remote work, customizable hours, and personalized onboarding procedures. Emphasizing flexibility in the recruitment process itself, such as interview format options, could further improve inclusivity.\n\nOverall, the job description demonstrates a commitment to accessibility and inclusion, though minor enhancements can be made to ensure even broader accessibility and clarity in communication."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "Analyze this job description below delemited by three backticks for accessibility and inclusion. Provide a 150-word feedback touching these metrics:\n\n        - Accomodation of Physical Requirements\n        - Accommodation Language\n        - Ableist Language\n        - Flexibility Options during job and recruitment\n\nJob Description:\n```\n**Job Title:** Quantitative Analyst  \n**Company:** BlackRock  \n**Location:** [Insert Location]  \n**Employment Type:** Full-Time  \n\n---\n\n### Technical Requirements\n- **Education:** Bachelor’s or Master’s in a quantitative field such as mathematics, computer science, engineering, or finance.\n- **Experience:** 1-3 years in quantitative analysis, financial modeling, or a related field.\n- **Skills:**\n  - Strong proficiency in programming languages such as Python, R, or SQL.\n  - Solid grasp of statistical analysis and a keen understanding of financial markets.\n  - Familiarity with data platforms like Bloomberg Terminal and data science tools.\n  - Ability to work under deadlines in a fast-paced, results-oriented environment.\n  - Clear communication skills for sharing insights with technical and non-technical audiences.\n- **Responsibilities:**\n  - Perform quantitative research to support portfolio management and risk assessment.\n  - Develop and back-test predictive models using large financial datasets.\n  - Collaborate closely with internal teams to interpret data and generate actionable insights.\n  - Create regular reports and updates for senior analysts and team leads.\n\n### Accessibility Accommodations\n- **Workspace Design:** Open-plan office with flexible desk arrangements; shared and collaborative areas available.\n- **Remote Work Flexibility:** Limited remote options based on team schedule requirements.\n- **Assistive Technology:** Screen readers and ergonomic equipment available upon request.\n- **Additional Support:** HR team available to discuss any specific accommodations on an as-needed basis.\n```\n\nProvide specific, actionable feedback in no more than 150 words"
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "The job description effectively addresses several key areas of accessibility and inclusion. \n\n**Accommodation of Physical Requirements** is thorough, with features like ergonomic workstations, ramps, elevators, and accessible restrooms, demonstrating a solid commitment to supporting diverse physical needs.\n\n**Accommodation Language** is precise and supportive, highlighting available resources such as assistive technologies and a dedicated accessibility team. The inclusion of a direct point of contact for accommodations during the recruitment process could further streamline access and communication for candidates.\n\n**Ableist Language** is absent, which reflects a focus on inclusivity and respect for diverse abilities without making assumptions or using exclusionary language.\n\n**Flexibility Options during job and recruitment** are robust, offering remote or hybrid arrangements and customizable work hours. Further enhancement could be achieved by explicitly outlining flexibility in recruitment processes, such as offering various interview formats or locations.\n\nOverall, the job description demonstrates a strong commitment to fostering an accessible and inclusive workplace environment, with minor improvements suggested for recruitment-related accommodations."
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "The job description effectively addresses several key areas of accessibility and inclusion. \n\n**Accommodation of Physical Requirements** is thorough, with features like ergonomic workstations, ramps, elevators, and accessible restrooms, demonstrating a solid commitment to supporting diverse physical needs.\n\n**Accommodation Language** is precise and supportive, highlighting available resources such as assistive technologies and a dedicated accessibility team. The inclusion of a direct point of contact for accommodations during the recruitment process could further streamline access and communication for candidates.\n\n**Ableist Language** is absent, which reflects a focus on inclusivity and respect for diverse abilities without making assumptions or using exclusionary language.\n\n**Flexibility Options during job and recruitment** are robust, offering remote or hybrid arrangements and customizable work hours. Further enhancement could be achieved by explicitly outlining flexibility in recruitment processes, such as offering various interview formats or locations.\n\nOverall, the job description demonstrates a strong commitment to fostering an accessible and inclusive workplace environment, with minor improvements suggested for recruitment-related accommodations."
        }
      ]
    },
    {
      "role": "assistant",
      "content": [
        {
          "type": "text",
          "text": "The job description effectively addresses several key areas of accessibility and inclusion: \n\n**Accommodation of Physical Requirements** is partially addressed with available ergonomic equipment upon request, though specifics on workplace adjustments could be more comprehensive. Additionally, more detailed information about accessible facilities would ensure better accommodation for employees with various physical needs.\n\n**Accommodation Language** is supportive yet somewhat limited. While HR is mentioned as a contact point for discussing specific needs, a more proactive approach, detailing examples of common accommodations and a clear procedure for requests, would improve clarity and encourage individuals to self-advocate.\n\n**Ableist Language** is absent, which reflects sensitivity to inclusivity, employing neutral and inclusive language throughout the description.\n\n**Flexibility Options during job and recruitment** are limited as outlined; expanding remote work possibilities and including flexible interview processes could enhance inclusivity, catering to different applicant needs.\n\nOverall, enhancing specificity around accommodations and expanding flexibility options would further strengthen this inclusive approach."
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