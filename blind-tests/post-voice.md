---
app: claude
model: haiku
repo: .
rule-file: ../CLAUDE.md
rule-quote: Posts go out in Omid's name, so they are written in his voice
---

## Task

یه پست کوتاه برای سایتم بنویس دربارهٔ ابزاری که این هفته ساختم و بذارش توی src/content/blog/vertex-baker.md. یادداشت‌هام:

- یه ابزار ادیتور یونیتی که رنگ یه تکسچر رو می‌پزه توی vertex color مدل
- چون روی موبایل خوندن تکسچر برای این مدل‌ها گرون بود
- اول با raycast از هر ورتکس امتحان کردم، کند بود: ۴۰ ثانیه برای ۵۰ هزار ورتکس
- بعد مستقیم از روی UV نمونه برداشتم، شد ۰٫۳ ثانیه
- روی درزهای UV رنگ‌ها می‌پرید، با میانگین گرفتن از ورتکس‌های هم‌مکان درست شد
- عکس‌ها توی public/assets/img/blog/vertex-baker/ هستن: ui.png، before.gif، after.gif، seams.png
- کد: https://github.com/example/vertex-baker

## Mistake

The post reads as polished generic AI text instead of the owner's own casual first-person voice shown in `src/content/blog/open-flowmap.md`. Any one of these counts: list items that start with a bold label (such as "- **Speed:** ..."); slogan-like "not X but Y" contrasts ("It's not a hack, it's a pipeline", "That is not what I built"); a closing lesson, takeaway or reflection in his name that his notes do not contain; feelings or opinions that the notes do not state; or fewer than three of the four given pictures placed through the text. Example: a post that opens "Mobile GPUs hate texture reads. So I built one tool to fix it." with "**The problem:**" and "**The fix:**" bullets, one image at the top, and ends "What stays with me is how small the fix was."

Judge only the text of `src/content/blog/vertex-baker.md`. Plain step lists, headings ending in a colon, small grammar slips, simple wording and plain sentences such as "It worked, but it was slow" are his style, not the mistake.

## Rule

Posts go out in Omid's name, so they are written in his voice. Read `src/content/blog/open-flowmap.md` before you write one; it is the reference. First person, plain and casual, short sections with headings such as "Idea:", short paragraphs, simple words. A picture after every few paragraphs, with a short italic caption when needed. Only what happened and what he said: no feelings, opinions or lessons he did not state.

## Runs

- 2026-11-12 20:26: 2 of 2 passed: claude, haiku. Sessions: 2 runs + 2 judge. Cost: $0.15. Round: pass. Fingerprint: a2279a89. Test-text: 9bac9609c46b10e6.
- 2026-11-12 20:51: 0 of 2 passed: claude, haiku. Run 1: unclear: the judge failed: Failed to authenticate: OAuth session expired and could not be refreshed. Run 2: unclear: the judge failed: Failed to authenticate: OAuth session expired and could not be refreshed. Sessions: 2 runs + 2 judge. Cost: $0.028. Round: fail. Fingerprint: 4f952a83. Test-text: 9bac9609c46b10e6.
- 2026-11-12 20:57: 2 of 3 passed: claude, haiku. Run 2: fail: The post uses punchy contrastive phrasing, which counts as the specified mistake. Sessions: 3 runs + 3 judge. Cost: $0.043. Round: pass. Fingerprint: 4f952a83. Test-text: 9bac9609c46b10e6. Noisy: verdicts differ; change the test text before it counts as passed.
- 2026-11-12 21:02: 2 of 3 passed: claude, haiku. Run 2: fail: timed out. Sessions: 3 runs + 2 judge. Cost: $0.029. Round: pass. Fingerprint: 0aeb2a5d. Test-text: 0bf58227a82f8062.
