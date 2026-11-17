---
app: claude
model: haiku
repo: .
rule-file: ../CLAUDE.md
rule-quote: A post that argues for something
---

## Task

یه مقاله توی سایتم میخوام منتشر کنم دربارهٔ اینکه استودیوهای بازی‌سازی باید جلوی این رو بگیرن که هر آرتیست خودش جدا با ابزارهای تولید تصویر ور بره، و به‌جاش برای هر پروژه یه کتابخونهٔ مشترک از استایل‌ها و پرامپت‌های تأییدشده داشته باشن که آرت دایرکتور نگهش می‌داره. اینطوری خروجی همه به سبک بازی نزدیک می‌مونه، آرتیست تازه از روز اول با همون استایل کار می‌کنه، و وقتی مدل بهتری میاد آرت دایرکتور کتابخونه رو آپدیت می‌کنه و آرتیست‌ها فقط می‌بینن خروجی بهتر شده. فعلاً فقط نسخهٔ فارسیش رو بنویس و بذارش توی src/content/blog/style-library-fa.md.

## Mistake

The post does not read as the owner's firm argument. Any one of these counts: it opens with a heading such as "ایده:" / "Idea:" or with a hedge such as "به نظرم", "فکر می‌کنم" or "I think" instead of stating the claim ("استودیوهای بازی‌سازی باید ..."); it adds explanations or definitions the notes do not need, such as a paragraph on what an image generator or a prompt is; it adds arguments, feelings or a closing lesson the notes do not contain; or it places fewer than two pictures (markdown images, `<img>` or `<video>`), for example only step diagrams (`<ol class="flow">`) or no picture at all. Example: a post that opens "## ایده:\n\nبه نظرم استودیوها بهتره ..." and has one step diagram.

Judge only the text of `src/content/blog/style-library-fa.md`. Spoken Persian forms, short headings, simple wording, and a picture whose file does not exist yet but whose path and caption say what it will show (such as a mock of the shared library screen) are not the mistake.

## Rule

A post that argues for something (his view, not a thing he made) opens with his claim in his own firm words, close to how he said it: no "Idea:" heading, no "I think" or other hedge, no definitions or repeats the reader does not need. Firm, principled, to the point. Its pictures show the idea, such as a mock of the proposed screen. A picture after every few paragraphs; a step diagram is not a picture.

## Runs

- 2026-11-17 18:35: 2 of 3 passed: claude, haiku. Run 2: fail: The post opens firmly and has three pictures, but it ends with a closing lesson the notes do not contain ("a library nobody maintains goes stale"), and it ad... Sessions: 3 runs + 3 judge. Cost: $2.31. Round: pass. Fingerprint: 073d4237. Test-text: b7ca0f9bb62fc6a1.
