---
# the default layout is 'page'
# best icon for resume is fas fa-file-alt
icon: fas fa-file-alt
order: 2
---

<!-- Declare a variable for the resume file -->
{% assign resume_file = "/assets/omid-saadat-resume.pdf" %}



<!-- A button to download resume -->
<a href="{{ resume_file }}" class="btn btn-outline-secondary" role="button">
  <i class="fas fa-download"></i> Download
</a>

{% include_relative omid-saadat-resume.md %}

{% pdf {{ resume_file }} no_link width=100% height=900px %}
