import pdfplumber
from pathlib import Path
from typing import Union, List
import sys
import json

def extract_text_from_pdf(pdf_path: Union[str, Path]) -> List[dict]:
    pdf_path = Path(pdf_path) if isinstance(pdf_path, str) else pdf_path
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF file not found: {pdf_path}")
    if pdf_path.suffix.lower() != '.pdf':
        raise ValueError(f"File must be a PDF: {pdf_path}")

    extracted_text = []
    try:
        with pdfplumber.open(pdf_path) as pdf:
            for page_num, page in enumerate(pdf.pages, 1):
                text = page.extract_text()
                page_content = {
                    'page_number': page_num,
                    'content': text if text else ''
                }
                extracted_text.append(page_content)

        return extracted_text
    except Exception as e:
        raise Exception(f"Error processing PDF: {str(e)}")

if __name__ == "__main__":
    pdf_path = sys.argv[1]  # Get the PDF path from the command-line argument
    text_data = extract_text_from_pdf(pdf_path)
    combined_text = "\n".join([page['content'] for page in text_data if page['content']])
    print(json.dumps(combined_text))  # Output the extracted text as JSON string


