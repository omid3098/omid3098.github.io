#!/usr/bin/env python3
"""
Convert Markdown resume to PDF using md2pdf library.

This script converts the omid-saadat-resume.md file to a PDF using md2pdf 
which provides excellent styling that matches Markdown preview appearance.
md2pdf uses Weasyprint under the hood for high-quality PDF rendering.
"""

import os
import sys
import subprocess
from pathlib import Path

def install_requirements():
    """Install required packages if not already installed."""
    # Check if we're in a virtual environment or use the .venv
    script_dir = Path(__file__).parent
    venv_path = script_dir / ".venv"
    
    if venv_path.exists():
        # Use the existing .venv
        venv_python = venv_path / "bin" / "python"
        venv_pip = venv_path / "bin" / "pip"
        
        if not venv_python.exists():
            print(f"Error: Virtual environment python not found at {venv_python}")
            return False
            
        print(f"Using virtual environment at {venv_path}")
        
        # Check if md2pdf is installed in the venv
        try:
            result = subprocess.run([str(venv_python), "-c", "import md2pdf; print('md2pdf is available')"], 
                                  capture_output=True, text=True)
            if result.returncode == 0:
                print("md2pdf is already installed in virtual environment")
                return True
        except:
            pass
        
        # Install md2pdf in the virtual environment
        print("Installing md2pdf in virtual environment...")
        try:
            subprocess.check_call([str(venv_pip), "install", "md2pdf"])
            print("md2pdf installed successfully in virtual environment!")
            return True
        except subprocess.CalledProcessError as e:
            print(f"Failed to install md2pdf in virtual environment: {e}")
            return False
    else:
        # Fallback to system installation
        try:
            import md2pdf
            print("md2pdf is already installed")
            return True
        except ImportError:
            print("No .venv found and md2pdf not installed globally.")
            print("Please create a virtual environment first:")
            print(f"cd {script_dir}")
            print("python3 -m venv .venv")
            print("source .venv/bin/activate")
            print("pip install md2pdf")
            return False

def create_custom_css():
    """Create custom CSS for professional resume styling."""
    return """
/* Professional Resume CSS Styling */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    font-size: 11pt;
    line-height: 1.5;
    color: #2c3e50;
    max-width: 210mm;
    margin: 0 auto;
    padding: 15mm;
    background: white;
}

/* Headers */
h1 {
    font-size: 24pt;
    font-weight: 700;
    color: #1a202c;
    margin: 0 0 8pt 0;
    line-height: 1.2;
    border-bottom: 2pt solid #3182ce;
    padding-bottom: 6pt;
}

h2 {
    font-size: 16pt;
    font-weight: 600;
    color: #2d3748;
    margin: 20pt 0 10pt 0;
    line-height: 1.3;
    border-bottom: 1pt solid #e2e8f0;
    padding-bottom: 4pt;
}

h3 {
    font-size: 13pt;
    font-weight: 600;
    color: #4a5568;
    margin: 16pt 0 8pt 0;
    line-height: 1.3;
}

/* Paragraphs */
p {
    margin: 0 0 8pt 0;
    text-align: justify;
}

/* Contact info styling (first paragraph) */
body > p:first-of-type {
    text-align: center;
    font-size: 10pt;
    color: #718096;
    margin-bottom: 15pt;
    border-bottom: 1pt solid #e2e8f0;
    padding-bottom: 10pt;
}

/* Links */
a {
    color: #3182ce;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

/* Lists */
ul, ol {
    margin: 8pt 0 12pt 0;
    padding-left: 18pt;
}

li {
    margin: 4pt 0;
    line-height: 1.4;
}

/* Bold text */
strong, b {
    font-weight: 600;
    color: #1a202c;
}

/* Italic text */
em, i {
    font-style: italic;
    color: #4a5568;
}

/* Code and technical terms */
code {
    font-family: 'SF Mono', Monaco, 'Cascadia Code', 'Roboto Mono', Consolas, monospace;
    font-size: 10pt;
    background-color: #f7fafc;
    color: #2d3748;
    padding: 2pt 4pt;
    border-radius: 3pt;
    border: 1pt solid #e2e8f0;
}

/* Job titles and positions */
h3 + p {
    font-style: italic;
    color: #718096;
    margin-top: -4pt;
    margin-bottom: 12pt;
}

/* Print specific styles */
@media print {
    body {
        padding: 10mm;
    }
    
    h1, h2, h3 {
        page-break-after: avoid;
    }
    
    p, li {
        page-break-inside: avoid;
        orphans: 2;
        widows: 2;
    }
}

/* Ensure proper spacing for sections */
h2 + p, h2 + ul, h2 + ol {
    margin-top: 0;
}

/* Special styling for technical skills section */
h2:contains("Technical Expertise") + p strong {
    color: #3182ce;
    font-weight: 600;
}

/* Experience section formatting */
h3[id*="experience"] {
    color: #2b6cb0;
}
"""

def convert_markdown_to_pdf(markdown_file_path, pdf_output_path, css_content=None):
    """
    Convert a Markdown file to PDF using md2pdf.
    
    Args:
        markdown_file_path (str): Path to the input Markdown file
        pdf_output_path (str): Path for the output PDF file
        css_content (str): Custom CSS content for styling
    """
    script_dir = Path(__file__).parent
    venv_path = script_dir / ".venv"
    
    # Create temporary CSS file if custom CSS is provided
    css_file_path = None
    if css_content:
        css_file_path = Path(markdown_file_path).parent / "temp_resume_style.css"
        with open(css_file_path, 'w', encoding='utf-8') as css_file:
            css_file.write(css_content)
    
    try:
        if venv_path.exists():
            # Use virtual environment python to run md2pdf
            venv_python = venv_path / "bin" / "python"
            
            # Create a temporary Python script to run md2pdf
            temp_script = script_dir / "temp_md2pdf_runner.py"
            script_content = f'''
import sys
from pathlib import Path
from md2pdf.core import md2pdf

markdown_file = r"{markdown_file_path}"
pdf_file = r"{pdf_output_path}"
css_file = r"{css_file_path}" if {css_file_path is not None} else None
base_url = r"{Path(markdown_file_path).parent}"

try:
    md2pdf(
        pdf_file_path=pdf_file,
        md_file_path=markdown_file,
        css_file_path=css_file,
        base_url=base_url
    )
    print("PDF successfully created")
except Exception as e:
    print(f"Error: {{e}}")
    sys.exit(1)
'''
            
            with open(temp_script, 'w', encoding='utf-8') as f:
                f.write(script_content)
            
            # Run the script with virtual environment python
            result = subprocess.run([str(venv_python), str(temp_script)], 
                                  capture_output=True, text=True)
            
            # Clean up temporary script
            temp_script.unlink()
            
            if result.returncode == 0:
                print(f"PDF successfully created: {pdf_output_path}")
                success = True
            else:
                print(f"Error creating PDF:")
                print(f"STDOUT: {result.stdout}")
                print(f"STDERR: {result.stderr}")
                success = False
                
        else:
            # Fallback to direct import (if md2pdf is available globally)
            from md2pdf.core import md2pdf
            
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
    # Install requirements if needed
    if not install_requirements():
        print("Failed to install required dependencies. Exiting.")
        sys.exit(1)
    
    # Get the current script directory
    script_dir = Path(__file__).parent
    
    # Define file paths
    markdown_file = script_dir / "_tabs" / "omid-saadat-resume.md"
    pdf_output = script_dir / "assets" / "omid-saadat-resume.pdf"
    
    # Check if input file exists
    if not markdown_file.exists():
        print(f"Error: Markdown file not found at {markdown_file}")
        sys.exit(1)
    
    # Create assets directory if it doesn't exist
    pdf_output.parent.mkdir(exist_ok=True)
    
    # Create custom CSS for professional styling
    custom_css = create_custom_css()
    
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
        print("Make sure Weasyprint dependencies are installed properly.")
        print("See: https://doc.courtbouillon.org/weasyprint/stable/first_steps.html#installation")
        sys.exit(1)

if __name__ == "__main__":
    main()
