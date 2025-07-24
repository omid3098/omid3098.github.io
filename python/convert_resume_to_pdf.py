#!/usr/bin/env python3
"""
Convert Markdown resume to PDF using md2pdf library.

This script converts the omid-saadat-resume.md file to a PDF using md2pdf 
which provides excellent styling that matches Markdown preview appearance.
md2pdf uses Weasyprint under the hood for high-quality PDF rendering.
"""

import sys
from pathlib import Path
from md2pdf.core import md2pdf

def load_css_content():
    """Load CSS content from external file."""
    css_file_path = Path(__file__).parent / "resume_style.css"
    
    if not css_file_path.exists():
        print(f"Warning: CSS file not found at {css_file_path}")
        return None
    
    try:
        with open(css_file_path, 'r', encoding='utf-8') as css_file:
            return css_file.read()
    except Exception as e:
        print(f"Error reading CSS file: {e}")
        return None

def convert_markdown_to_pdf(markdown_file_path, pdf_output_path, css_content=None):
    """
    Convert a Markdown file to PDF using md2pdf.
    
    Args:
        markdown_file_path (str): Path to the input Markdown file
        pdf_output_path (str): Path for the output PDF file
        css_content (str): Custom CSS content for styling
    """
    # Create temporary CSS file if custom CSS is provided
    css_file_path = None
    if css_content:
        css_file_path = Path(markdown_file_path).parent / "temp_resume_style.css"
        with open(css_file_path, 'w', encoding='utf-8') as css_file:
            css_file.write(css_content)
    
    try:
        md2pdf(
            pdf_file_path=pdf_output_path,
            md_file_path=markdown_file_path,
            css_file_path=str(css_file_path) if css_file_path else None,
            base_url=str(Path(markdown_file_path).parent)
        )
        print(f"PDF successfully created: {pdf_output_path}")
        success = True
            
    except Exception as e:
        print(f"Error creating PDF: {e}")
        success = False
    finally:
        # Clean up temporary CSS file
        if css_file_path and css_file_path.exists():
            css_file_path.unlink()
    
    return success

def main():
    """Main function to convert the resume."""
    # Get the script directory (now in python subdirectory)
    script_dir = Path(__file__).parent.parent
    
    # Define file paths
    markdown_file = script_dir / "_tabs" / "omid-saadat-resume.md"
    pdf_output = script_dir / "assets" / "omid-saadat-resume.pdf"
    
    # Check if input file exists
    if not markdown_file.exists():
        print(f"Error: Markdown file not found at {markdown_file}")
        sys.exit(1)
    
    # Create assets directory if it doesn't exist
    pdf_output.parent.mkdir(exist_ok=True)
    
    # Load custom CSS from external file
    custom_css = load_css_content()
    if custom_css is None:
        print("Warning: Could not load CSS file, proceeding without custom styling")
    
    # Convert the file
    print(f"Converting {markdown_file} to {pdf_output}...")
    print("Using md2pdf for high-quality PDF generation...")
    success = convert_markdown_to_pdf(str(markdown_file), str(pdf_output), custom_css)
    
    if success:
        print("Conversion completed successfully!")
        
        # Check file size for confirmation
        if pdf_output.exists():
            file_size = pdf_output.stat().st_size
            print(f"Output file size: {file_size:,} bytes")
            print(f"PDF saved to: {pdf_output}")
    else:
        print("Conversion failed!")
        sys.exit(1)

if __name__ == "__main__":
    main()
