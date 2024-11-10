from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy

def get_accessibility_match(jobSeekerNeeds, accessibilityServices):
    """
    Match job seeker accessibility needs with company accommodations.

    Args:
        seeker_needs (str): Description of job seeker's accessibility requirements
        company_accommodations (str): Description of company's available accommodations

    Returns:
        float: the similarity percentage
    """
    # Initialize the matcher
    matcher = AccessibilityMatcher()

    # Generate the similarity score
    score = matcher.calculate_similarity_scores(jobSeekerNeeds, accessibilityServices)
    score = score["combined_similarity"] * 100

    return score + 10 if score > 50 else score

class AccessibilityMatcher:
    def __init__(self):
        # Load SpaCy's English language model
        self.nlp = spacy.load('en_core_web_md')
        self.vectorizer = TfidfVectorizer(
            stop_words='english',
            ngram_range=(1, 2),
            max_features=5000
        )

    def preprocess_text(self, text):
        """
        Preprocess text by removing stopwords, lemmatizing, and keeping only relevant parts of speech
        """
        doc = self.nlp(text.lower())
        # Keep nouns, verbs, adjectives, and adverbs
        tokens = [token.lemma_ for token in doc
                  if (token.pos_ in ['NOUN', 'VERB', 'ADJ', 'ADV'])
                  and not token.is_stop]
        return ' '.join(tokens)

    def calculate_similarity_scores(self, seeker_needs, company_accommodations):
        """
        Calculate similarity scores between seeker needs and company accommodations
        Returns both TF-IDF and SpaCy similarity scores
        """
        # Preprocess texts
        processed_needs = self.preprocess_text(seeker_needs)
        processed_accommodations = self.preprocess_text(company_accommodations)

        # Calculate TF-IDF similarity
        texts = [processed_needs, processed_accommodations]
        tfidf_matrix = self.vectorizer.fit_transform(texts)
        tfidf_similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]

        # Calculate SpaCy similarity
        spacy_similarity = self.nlp(seeker_needs).similarity(self.nlp(company_accommodations))

        return {
            # 'tfidf_similarity': tfidf_similarity,
            # 'spacy_similarity': spacy_similarity,
            'combined_similarity': (tfidf_similarity + spacy_similarity) / 2
        }

    def analyze_specific_needs(self, seeker_needs, company_accommodations):
        """
        Analyze which specific needs are met and unmet
        """
        seeker_doc = self.nlp(seeker_needs)
        company_doc = self.nlp(company_accommodations)

        # Extract key phrases from seeker needs
        seeker_needs_phrases = []
        for chunk in seeker_doc.noun_chunks:
            if not all(token.is_stop for token in chunk):
                seeker_needs_phrases.append(chunk.text)

        # Check each need against company accommodations
        needs_analysis = {}
        for need in seeker_needs_phrases:
            need_doc = self.nlp(need)
            max_similarity = 0
            best_match = None

            # Find the best matching accommodation for each need
            for chunk in company_doc.noun_chunks:
                if not all(token.is_stop for token in chunk):
                    similarity = need_doc.similarity(self.nlp(chunk.text))
                    if similarity > max_similarity:
                        max_similarity = similarity
                        best_match = chunk.text

            needs_analysis[need] = {
                'match_found': max_similarity > 0.6,  # Threshold can be adjusted
                'best_match': best_match,
                'similarity_score': max_similarity
            }

        return needs_analysis

    def generate_matching_report(self, seeker_needs, company_accommodations):
        """
        Generate a comprehensive matching report
        """
        similarity_scores = self.calculate_similarity_scores(seeker_needs, company_accommodations)
        needs_analysis = self.analyze_specific_needs(seeker_needs, company_accommodations)

        report = {
            'overall_match_score': similarity_scores['combined_similarity'] * 100,
            'similarity_scores': similarity_scores,
            'needs_analysis': needs_analysis,
            'matched_needs': [need for need, analysis in needs_analysis.items()
                              if analysis['match_found']],
            'unmatched_needs': [need for need, analysis in needs_analysis.items()
                                if not analysis['match_found']]
        }

        return report


# def main():
#     print("started main")
#     # Initialize the matcher
#     matcher = AccessibilityMatcher()
#
#     # Test cases dictionary containing different scenarios
#     test_cases = {
#         "case1": {
#             "description": "High Match - Physical Accessibility",
#             "seeker_needs": """
#             I require a wheelchair-accessible workspace with an adjustable height desk.
#             Need accessible parking close to building entrance.
#             Require accessible bathrooms on the same floor.
#             """,
#             "company_accommodations": """
#             Our office is fully wheelchair accessible with adjustable standing desks.
#             We have designated accessible parking spots near all entrances.
#             Each floor has multiple ADA-compliant bathrooms.
#             Wide doorways and corridors throughout the building.
#             """
#         },
#
#         "case2": {
#             "description": "Mixed Match - Technology and Sensory Needs",
#             "seeker_needs": """
#             I use JAWS screen reader software and need compatible systems.
#             Require low-light environment due to light sensitivity.
#             Need noise-canceling headphones for focus.
#             """,
#             "company_accommodations": """
#             All computer systems are compatible with major screen readers.
#             We provide adjustable lighting in all workspaces.
#             Open office layout with some quiet spaces available.
#             """
#         },
#
#         "case3": {
#             "description": "Mental Health Accommodations",
#             "seeker_needs": """
#             Need flexible work hours due to anxiety management.
#             Require regular breaks throughout the day.
#             Private space for medication and stress management.
#             Remote work options during high-anxiety periods.
#             """,
#             "company_accommodations": """
#             We offer flexible scheduling for all employees.
#             Dedicated wellness rooms on each floor.
#             Hybrid work policy with work-from-home options.
#             Mental health days included in benefits package.
#             """
#         },
#
#         "case4": {
#             "description": "Low Match - Specialized Needs",
#             "seeker_needs": """
#             Require specialized ergonomic keyboard and vertical mouse.
#             Need support animal accommodation.
#             American Sign Language interpreter for meetings.
#             """,
#             "company_accommodations": """
#             Standard office equipment provided.
#             Virtual meeting capabilities with chat function.
#             Basic ergonomic assessments available.
#             """
#         }
#     }
#
#     # Process each test case and display results
#     for case_id, case_data in test_cases.items():
#         print(f"\n{'=' * 80}")
#         print(f"Testing {case_id}: {case_data['description']}")
#         print(f"{'=' * 80}")
#
#         print("\nJob Seeker Needs:")
#         print(case_data['seeker_needs'].strip())
#
#         print("\nCompany Accommodations:")
#         print(case_data['company_accommodations'].strip())
#
#         # Generate and display the matching report
#         print("\nScore:")
#         score = get_accessibility_match(case_data['seeker_needs'].strip(),
#             case_data['company_accommodations'].strip())
#         print(score)
#
#         # report = matcher.generate_matching_report(
#         #     case_data['seeker_needs'],
#         #     case_data['company_accommodations']
#         # )
#         #
#         # print("\nMatching Report:")
#         # print(f"Overall Match Score: {report['overall_match_score']:.2f}%")
#         #
#         # print("\nMatched Needs:")
#         # for need in report['matched_needs']:
#         #     match_info = report['needs_analysis'][need]
#         #     print(f"- {need}")
#         #     print(f"  Best Match: {match_info['best_match']}")
#         #     print(f"  Similarity: {match_info['similarity_score']:.2f}")
#         #
#         # print("\nUnmatched Needs:")
#         # for need in report['unmatched_needs']:
#         #     print(f"- {need}")
#         #
#         # print("\nDetailed Similarity Scores:")
#         # for score_type, score in report['similarity_scores'].items():
#         #     print(f"- {score_type}: {score:.2f}")
#
#
# if __name__ == "__main__":
#     main()