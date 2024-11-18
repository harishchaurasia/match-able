from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import spacy
import json
import sys

nlp = spacy.load('en_core_web_md')

def preprocess_text(text):
    doc = nlp(text.lower())
    tokens = [token.lemma_ for token in doc if token.pos_ in ['NOUN', 'VERB', 'ADJ', 'ADV'] and not token.is_stop]
    processed_text = ' '.join(tokens)
    print(f"Processed Text: {processed_text}", file=sys.stderr)  # Debugging line to stderr
    return processed_text

def calculate_similarity_scores(seeker_needs, company_accommodations):
    vectorizer = TfidfVectorizer(stop_words='english', ngram_range=(1, 2), max_features=5000)
    processed_needs = preprocess_text(seeker_needs)
    processed_accommodations = preprocess_text(company_accommodations)
    texts = [processed_needs, processed_accommodations]
    tfidf_matrix = vectorizer.fit_transform(texts)
    tfidf_similarity = cosine_similarity(tfidf_matrix[0:1], tfidf_matrix[1:2])[0][0]
    spacy_similarity = nlp(processed_needs).similarity(nlp(processed_accommodations))
    similarity_score = (tfidf_similarity + spacy_similarity) / 2
    print(f"Similarity Score: {similarity_score}", file=sys.stderr)  # Debugging line to stderr
    return similarity_score

if __name__ == "__main__":
    try:
        input_data = json.loads(sys.argv[1])
        accessibility_needs = input_data['accessibilityNeeds']
        companies = input_data['companies']
        
        if not accessibility_needs:
            print(json.dumps({}))
            sys.exit(0)
        
        results = {}
        for company in companies:
            if company.get('accessibilityServices'):
                score = calculate_similarity_scores(
                    accessibility_needs,
                    company['accessibilityServices']
                )
                results[company['_id']] = score * 100  # Return percentage similarity
            else:
                results[company['_id']] = 0  # Default score for companies without services

        print(json.dumps(results))
    except Exception as e:
        print(json.dumps({"error": str(e)}), file=sys.stderr)
        sys.exit(1)
