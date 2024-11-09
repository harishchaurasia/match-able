import unittest

from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import re
from typing import Dict, List, Optional
import openai
from enum import Enum

from starlette.testclient import TestClient


class Grade(str, Enum):
    A = "A"
    B = "B"
    C = "C"
    D = "D"
    F = "F"


class JobDescription(BaseModel):
    text: str
    company_name: Optional[str] = None


class AnalysisResult(BaseModel):
    overall_grade: Grade
    feedback: str
    metrics: Dict[str, float]
    suggestions: List[str]


class JobAnalyzer:
    def __init__(self, openai_api_key: str):
        self.openai_api_key = openai_api_key
        openai.api_key = openai_api_key

    def _check_physical_requirements(self, text: str) -> float:
        """Check for unnecessary physical requirements"""
        physical_terms = [
            r"lift\s+\d+\s*(?:pound|lb|kg)",
            r"stand for",
            r"physical(?:ly)?\s+(?:able|capable)",
            r"manual dexterity",
        ]
        score = 1.0
        for term in physical_terms:
            if re.search(term, text.lower()):
                score -= 0.25
        return max(0.0, score)

    def _check_accommodation_language(self, text: str) -> float:
        """Check for accommodation statements and inclusive language"""
        positive_terms = [
            "accommodation",
            "accessible",
            "flexible",
            "adaptive",
            "inclusion",
            "support"
        ]
        score = 0.0
        for term in positive_terms:
            if term in text.lower():
                score += 0.2
        return min(1.0, score)

    def _check_ableist_language(self, text: str) -> float:
        """Check for ableist language and metaphors"""
        ableist_terms = [
            "blind spot",
            "tone deaf",
            "stand-up meeting",
            "walk through",
            "see through",
            "cripple",
            "crazy",
            "insane"
        ]
        score = 1.0
        for term in ableist_terms:
            if term in text.lower():
                score -= 0.25
        return max(0.0, score)

    def _check_flexibility_options(self, text: str) -> float:
        """Check for workplace flexibility mentions"""
        flexibility_terms = [
            "remote",
            "hybrid",
            "flexible hours",
            "flexible schedule",
            "work from home",
            "modified schedule",
            "part-time"
        ]
        score = 0.0
        for term in flexibility_terms:
            if term in text.lower():
                score += 0.2
        return min(1.0, score)

    def _calculate_grade(self, metrics: Dict[str, float]) -> Grade:
        """Calculate overall grade based on metrics"""
        avg_score = sum(metrics.values()) / len(metrics)
        if avg_score >= 0.9:
            return Grade.A
        elif avg_score >= 0.8:
            return Grade.B
        elif avg_score >= 0.7:
            return Grade.C
        elif avg_score >= 0.6:
            return Grade.D
        else:
            return Grade.F

    def _generate_feedback(self, metrics: Dict[str, float], text: str) -> str:
        """Generate feedback using OpenAI API"""
        prompt = f"""
        Analyze this job description for accessibility and inclusion. Provide a 150-word feedback
        focusing on these metrics scores:
        Physical Requirements: {metrics['physical_requirements']}
        Accommodation Language: {metrics['accommodation_language']}
        Ableist Language: {metrics['ableist_language']}
        Flexibility Options: {metrics['flexibility_options']}

        Job Description:
        {text}

        Provide specific, actionable feedback in 150 words.
        """

        response = openai.chat.completions.create(
            model="gpt-4",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=200,
            temperature=0.7
        )

        return response.choices[0].message.content

    def _generate_suggestions(self, metrics: Dict[str, float]) -> List[str]:
        """Generate specific suggestions based on metric scores"""
        suggestions = []

        if metrics['physical_requirements'] < 0.8:
            suggestions.append("Review and remove unnecessary physical requirements. Focus on essential job functions.")

        if metrics['accommodation_language'] < 0.6:
            suggestions.append("Add clear statements about accommodation processes and commitment to accessibility.")

        if metrics['ableist_language'] < 0.8:
            suggestions.append("Replace ableist language and metaphors with more inclusive alternatives.")

        if metrics['flexibility_options'] < 0.6:
            suggestions.append("Consider adding information about flexible work arrangements and remote options.")

        return suggestions

    def analyze(self, job_description: JobDescription) -> AnalysisResult:
        """Analyze job description and return comprehensive results"""
        metrics = {
            "physical_requirements": self._check_physical_requirements(job_description.text),
            "accommodation_language": self._check_accommodation_language(job_description.text),
            "ableist_language": self._check_ableist_language(job_description.text),
            "flexibility_options": self._check_flexibility_options(job_description.text)
        }

        grade = self._calculate_grade(metrics)
        feedback = self._generate_feedback(metrics, job_description.text)
        suggestions = self._generate_suggestions(metrics)

        return AnalysisResult(
            overall_grade=grade,
            feedback=feedback,
            metrics=metrics,
            suggestions=suggestions
        )


app = FastAPI()
analyzer = None
# Sample job descriptions with varying levels of inclusivity
SAMPLE_JOB_DESCRIPTIONS: Dict[str, str] = {
    "inclusive": """
    Senior Financial Analyst (Remote-Friendly)

    We're seeking a talented Financial Analyst to join our diverse team. This role offers flexible working arrangements including remote and hybrid options.

    Key Responsibilities:
    - Analyze financial data and prepare reports
    - Collaborate with cross-functional teams using accessible communication tools
    - Develop financial models and forecasts

    We provide:
    - Flexible working hours
    - Ergonomic equipment and adaptive technology support
    - Comprehensive healthcare including mental health support
    - Clear accommodation process for all employees

    We're committed to creating an inclusive workplace and welcome candidates of all abilities.
    """,

    "partially_inclusive": """
    Financial Analyst Position

    Looking for a sharp-eyed analyst to join our fast-paced team.

    Requirements:
    - Stand-up meetings twice daily
    - Quick on your feet with numbers
    - Ability to handle multiple projects
    - Must be able to work in office 3 days/week

    Benefits:
    - Flexible hours available
    - Health insurance
    - Modern office space
    """,

    "non_inclusive": """
    Senior Financial Analyst - Fast-Paced Environment

    Looking for a high-energy analyst to join our crazy-busy team! Must be able to:
    - Stand for long periods
    - Lift up to 25 pounds
    - Handle insane deadline pressure
    - Be physically present in office 5 days/week
    - Have eagle-eye attention to detail

    Must be able to walk between multiple office locations during the day.
    """
}


def main():
    """Main function to demonstrate the job description analyzer"""
    # Initialize the analyzer with your API key
    analyzer = JobAnalyzer("your-openai-api-key")

    # Create test client
    client = TestClient(app)

    print("Job Description Analysis Demo")
    print("=" * 50)

    # Analyze each sample job description
    for desc_type, description in SAMPLE_JOB_DESCRIPTIONS.items():
        print(f"\nAnalyzing {desc_type} job description:")
        print("-" * 30)

        # Make API request
        response = client.post(
            "/analyze",
            json={"text": description, "company_name": f"Test Company ({desc_type})"}
        )

        if response.status_code == 200:
            result = response.json()

            # Print results
            print(f"Overall Grade: {result['overall_grade']}")
            print("\nMetric Scores:")
            for metric, score in result['metrics'].items():
                print(f"- {metric}: {score:.2f}")

            print("\nFeedback:")
            print(result['feedback'])

            print("\nSuggestions:")
            for suggestion in result['suggestions']:
                print(f"- {suggestion}")
        else:
            print(f"Error: {response.status_code}")
            print(response.json())

        print("\n" + "=" * 50)


class TestJobAnalyzer(unittest.TestCase):
    """Test cases for the Job Description Analyzer"""

    def setUp(self):
        self.client = TestClient(app)

    def test_inclusive_description(self):
        """Test analysis of inclusive job description"""
        response = self.client.post(
            "/analyze",
            json={"text": SAMPLE_JOB_DESCRIPTIONS["inclusive"]}
        )
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertEqual(result['overall_grade'], 'A')

    def test_non_inclusive_description(self):
        """Test analysis of non-inclusive job description"""
        response = self.client.post(
            "/analyze",
            json={"text": SAMPLE_JOB_DESCRIPTIONS["non_inclusive"]}
        )
        self.assertEqual(response.status_code, 200)
        result = response.json()
        self.assertEqual(result['overall_grade'], 'F')

    def test_empty_description(self):
        """Test handling of empty job description"""
        response = self.client.post(
            "/analyze",
            json={"text": ""}
        )
        self.assertEqual(response.status_code, 400)

    def test_metrics_range(self):
        """Test that metric scores are within valid range"""
        response = self.client.post(
            "/analyze",
            json={"text": SAMPLE_JOB_DESCRIPTIONS["partially_inclusive"]}
        )
        result = response.json()
        for metric_score in result['metrics'].values():
            self.assertGreaterEqual(metric_score, 0.0)
            self.assertLessEqual(metric_score, 1.0)


if __name__ == "__main__":
    print("Running Job Description Analyzer Demo...")
    print("\nStarting with main demo:")
    main()

    print("\nRunning unit tests:")
    unittest.main(argv=[''], exit=False)