import pdfplumber
from pathlib import Path
from typing import Union, List


def extract_text_from_pdf(pdf_path: Union[str, Path]) -> List[dict]:
    """
    Extract text from a PDF file, maintaining page-level separation.

    Args:
        pdf_path: Path to the PDF file (string or Path object)

    Returns:
        List of dictionaries containing page number and text content

    Raises:
        FileNotFoundError: If PDF file doesn't exist
        Exception: For other PDF processing errors
    """
    # Convert string path to Path object if necessary
    pdf_path = Path(pdf_path) if isinstance(pdf_path, str) else pdf_path

    # Verify file exists
    if not pdf_path.exists():
        raise FileNotFoundError(f"PDF file not found: {pdf_path}")

    # Verify file is a PDF
    if pdf_path.suffix.lower() != '.pdf':
        raise ValueError(f"File must be a PDF: {pdf_path}")

    extracted_text = []

    try:
        # Open the PDF file
        with pdfplumber.open(pdf_path) as pdf:
            # Process each page
            for page_num, page in enumerate(pdf.pages, 1):
                # Extract text from the page
                text = page.extract_text()

                # Store page number and content
                page_content = {
                    'page_number': page_num,
                    'content': text if text else ''
                }

                extracted_text.append(page_content)

        return extracted_text

    except Exception as e:
        raise Exception(f"Error processing PDF: {str(e)}")


def save_extracted_text(extracted_text: List[dict], output_path: Union[str, Path]):
    """
    Save extracted text to a text file.

    Args:
        extracted_text: List of dictionaries containing page number and text content
        output_path: Path where to save the text file
    """
    output_path = Path(output_path)

    with output_path.open('w', encoding='utf-8') as f:
        for page in extracted_text:
            f.write(f"\n{'=' * 50}\n")
            f.write(f"Page {page['page_number']}\n")
            f.write(f"{'=' * 50}\n\n")
            f.write(page['content'])
            f.write('\n')


# Example usage
if __name__ == "__main__":
    try:
        # Extract text from PDF
        pdf_path = "example.pdf"
        text_data = extract_text_from_pdf(pdf_path)

        # Save to text file
        save_extracted_text(text_data, "output.txt")

        # Print summary
        print(f"Successfully processed {len(text_data)} pages")

        # Print first few characters of each page
        for page in text_data:
            preview = page['content'][:100] + '...' if len(page['content']) > 100 else page['content']
            print(f"\nPage {page['page_number']} preview:")
            print(preview)

    except Exception as e:
        print(f"Error: {str(e)}")