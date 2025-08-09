This project is an **interactive website** that combines the content management capabilities of MkDocs with Material theme and the visual power of Three.js for immersive interactive experiences. The site maintains a markdown-based workflow while incorporating 3D graphics, interactive backgrounds, and dynamic visual elements.

### Vision & Architecture

The website follows a hybrid approach:

- **Content Layer**: MkDocs with Material theme handles all textual content, navigation, and site structure
- **Interactive Layer**: Three.js provides interactive 3D backgrounds, viewports, and visual experiences
- **Integration**: Custom CSS and JavaScript seamlessly blend the content over interactive canvases

Key interactive elements include:

- **Interactive Backgrounds**: Three.js dark canvases as website backgrounds instead of solid colors
- **3D Viewports**: Embedded Three.js scenes within content sections
- **Dynamic Overlays**: Website text and UI elements rendered over interactive 3D scenes
- **Responsive Design**: Interactive elements adapt to different screen sizes while maintaining readability

### Key Workflows

- **Running the development server**: To preview the site locally, run `mkdocs serve` in the .venv environment. This will start a local server with live reloading for both content and interactive elements.
- **Building the site**: To generate the static HTML files with embedded interactive elements, run `mkdocs build`. The output will be in the `site` directory (which is in the `.gitignore` file).
- **Interactive Development**: Three.js scenes and shaders can be developed separately and integrated via custom CSS/JS in the `docs/stylesheets/` and `docs/javascripts/` directories.
- **Deployment**: The site is deployed to GitHub Pages with all interactive assets included. The workflow is likely configured in the `.github/workflows` directory.

### Project Structure

- `mkdocs.yml`: The main configuration file for the MkDocs site. It defines the site structure, navigation, theme, and integration points for interactive elements.
- `docs/`: Contains all the Markdown source files and interactive assets for the website.
  - `docs/index.md`: The homepage of the site with integrated interactive elements.
  - `docs/stylesheets/extra.css`: Custom CSS for the site, including styles for Three.js integration and responsive overlays.
  - `docs/javascripts/`: Directory for Three.js scenes, shaders, and interactive components.
  - `docs/assets/`: Static assets including 3D models, textures, and other interactive media.
- `old_website/`: Contains the old Jekyll-based website. This serves as a content reference and asset source for migration.
  - `old_website/_posts`: Contains the old blog posts to be migrated with potential interactive enhancements.
  - `old_website/_tabs`: Contains the old pages, some of which may become interactive showcases.
  - `old_website/assets/`: Source for images, PDFs, and other assets to be reused in the new interactive site.

### Content Management

- **Adding/Editing Pages**: To add or edit a page, modify the corresponding Markdown file in the `docs` directory. Pages can include interactive Three.js viewports by adding custom HTML blocks or using Material theme extensions. The navigation menu is defined in the `nav` section of `mkdocs.yml`.
- **Interactive Components**: Three.js scenes are developed as separate JavaScript modules in `docs/javascripts/` and integrated into pages through custom CSS classes or HTML containers.
- **Blog Posts**: Blog posts are created as Markdown files in a `docs/posts` or `docs/blog` directory. Posts can feature interactive elements, 3D demonstrations, or embedded Three.js showcases.
- **Asset Management**: 3D models, textures, shaders, and other interactive assets are stored in `docs/assets/` and can be referenced by Three.js scenes. Assets from the old website in `old_website/assets/` are migrated and enhanced for interactive use.
- **Resume**: The resume workflow is enhanced to potentially include interactive elements. The markdown source at `docs/resume.md` can be converted to PDF using `python/convert_resume_to_pdf.py`, but may also feature interactive portfolio showcases.

### Conventions

- The project combines the content management ease of MkDocs with the visual appeal of interactive Three.js elements. New development should focus on this hybrid approach.
- When working with content migration from `old_website/`, consider how each piece can be enhanced with interactive elements while maintaining readability and accessibility.
- Interactive elements should be progressively enhanced - the site should work with JavaScript disabled, but provide enhanced experiences when enabled.
- Three.js scenes should be optimized for performance across devices, with appropriate fallbacks for lower-end hardware.
- All interactive components should respect user preferences for reduced motion and provide appropriate accessibility controls.
- The resume system supports both traditional PDF output and potentially interactive portfolio demonstrations, allowing for multiple presentation formats.
