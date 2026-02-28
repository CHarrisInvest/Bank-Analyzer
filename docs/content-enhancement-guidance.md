# Claude Code Content Enhancement Guidance
## Systematic Improvement of Metric, Valuation Method, and FAQ Pages

---

## How to Use This Document

**Read this document completely before processing any page.** Do not skim — the guidance is cumulative and interconnected. Sections build on each other, and skipping ahead will result in missed requirements.

This document is provided at the start of each automated processing prompt. Each prompt targets a single page. Treat every page as an independent task guided by this document.

When processing each page, actively reference the relevant sections:

- **Section 5** (Content Assessment First + page-specific guidelines) should be your starting point for every page
- **Section 4** (AI Content Detection Avoidance) should be checked against your output before finalizing — scan for prohibited phrases and structural patterns
- **Section 6** (Content Quality Standards) governs the substance of what you write
- **Section 10** (Quality Self-Check) is your final verification before marking a page complete

Do not carry over assumptions, structural choices, or phrasing patterns from any previously processed page. Each page should feel independently crafted based on its own topic and content needs.

### Scope Guard — Critical

Each prompt specifies a **source file** and a **slug**. You must **only modify the single entry matching that slug** in the specified file. Do not modify, reformat, reorder, or otherwise touch any other entries in the file. Do not modify any code outside the target entry's object — no changes to imports, exports, array structure, comments, or adjacent entries. If you are uncertain whether a change falls within the target entry's boundaries, do not make it. Verify you are editing the correct entry by confirming the `slug` field matches before making any changes.

---

## 1. Project Overview and Objective

You are tasked with systematically improving the content across three categories of pages on a bank investing educational website: **metric pages**, **valuation method pages**, and **FAQ pages**. The website serves as an educational resource for people interested in banks, bank stocks, and bank investing.

The primary goals of this project are:

- Enhance and expand existing content to be more engaging, informative, and useful to readers
- Ensure content addresses search intent quickly and thoroughly
- Improve content structure and visual presentation for readability
- Make content feel naturally written rather than AI-generated
- Assess and improve internal linking across all pages
- Fill in missing information in related/linked sections that connect pages to one another
- Increase time on page and user satisfaction through genuinely valuable, well-structured content

**Critical constraint: Word count on every page must only increase, never decrease. Before removing content, assess if it should be refreshed or enhanced instead.**

---

## 2. Target Audience

The audience is anyone interested in banks, bank stocks, and bank investing. Their experience levels vary widely, from complete beginners to experienced bank investors. Content strategy must account for this range:

- **Basic topics** (e.g., EPS, P/E ratio, ROE): Assume the reader knows nothing. Start from first principles. Define every term. Use plain, accessible language throughout.
- **Intermediate topics**: Assume the reader understands basic metrics but may not know how they apply specifically to banks or how they interconnect. Provide context and bridge explanations.
- **Advanced topics**: Do not assume the reader knows anything beyond basic metrics (ROE, EPS, P/E, etc.) even for advanced material. The initial sections should still be accessible and written in plain language. Complexity and technical depth should increase as the reader progresses down the page.

For all topic levels, the opening of each page must address the likely search query in plain, direct language before introducing any complexity.

---

## 3. Content Voice and Tone

### General Approach

This is an educational resource. The voice should be that of a knowledgeable guide explaining concepts in detail while providing objective information and insight. The tone should be:

- Approachable and clear for basic and intermediate topics
- More precise and technical for advanced topics, while still remaining accessible
- Confident without being opinionated or preachy
- Informative without being dry or textbook-like
- Conversational enough to feel like a human wrote it, but professional enough to be taken seriously as a financial resource

### Voice Reference

The first few sections of the existing metric pages best represent the target tone and voice. Use these as a baseline reference when establishing the voice for all content. That said, the voice can and should evolve toward being more informative while retaining a human quality — the kind of explanation you'd get from a knowledgeable colleague who genuinely wants you to understand the material.

### What the Voice Is NOT

- It is not a sales pitch
- It is not academic or textbook prose
- It is not a blog post with forced personality or humor
- It is not a listicle or clickbait content
- It is not a lecture or condescending explainer

---

## 4. AI Content Detection Avoidance

This is a critical priority. Many existing pages read in a way that is recognizably AI-generated. The revised content must not exhibit common AI writing patterns. Below is a detailed list of patterns to identify and eliminate:

### Phrases and Constructions to Avoid Entirely

- "In today's [landscape/environment/world]"
- "It's important to note that..."
- "It's worth noting that..."
- "Whether you're a seasoned investor or just getting started..."
- "Let's dive in" / "Let's explore" / "Let's take a closer look"
- "In the world of [banking/finance/investing]..."
- "When it comes to..."
- "At its core..."
- "This is where [X] comes into play"
- "Think of it as..."  (when used as a crutch, occasional genuine analogies are fine)
- "At the end of the day..."
- "It goes without saying..."
- "This begs the question..."
- "In conclusion..." / "To sum up..." / "In summary..."
- "Navigating the [landscape/world/complexities] of..."
- "Plays a crucial role" / "plays a vital role" / "plays a key role"
- "Serves as a [powerful/valuable/essential] tool"
- "Provides valuable insights into..."
- "Is a testament to..."
- "Offers a comprehensive [overview/look/understanding]"
- "Stands as a [cornerstone/pillar/beacon]"
- "Understanding [X] is crucial for..."
- "Shed light on"
- "Pave the way"
- "A nuanced understanding"
- "Delve into" / "delve deeper"
- "Holistic approach"
- "Landscape" (when used metaphorically)
- "Myriad" / "plethora" / "multifaceted"
- "Leverage" (as a verb meaning "use," unless discussing actual financial leverage)
- "Robust" (unless describing statistical methodology)
- "Empower" / "empowering"
- "Unlock" / "unlocking" (when used metaphorically)
- "Realm" / "arena"
- "Embark on"
- "Elevate"
- "Harness"
- "Foster"
- "Arguably"
- "It's no secret that..."
- "The reality is..."
- "Make informed decisions"
- "Take into account"
- "A wide range of"

### Structural Patterns to Avoid

- **Parallel trio openings**: Three consecutive paragraphs or sections that begin with the same grammatical structure (e.g., "First... Second... Third..." or "One key aspect... Another important factor... A final consideration...")
- **The AI sandwich**: Opening with a broad philosophical statement, filling with generic content, closing with a restated version of the opening
- **Excessive hedging clusters**: "While it's true that X, it's also important to consider Y, and one should also keep in mind Z" — pick a position or state the facts directly
- **Robotic transitions**: "Now that we've covered X, let's turn our attention to Y" — transitions should be natural or unnecessary if the structure is logical
- **Formulaic section endings**: Every section ending with a sentence that summarizes and bridges to the next section in an identical pattern
- **Overuse of "This means that..."** as a sentence starter after stating a fact
- **Lists that all have exactly three items** — vary list lengths naturally
- **Every paragraph being exactly the same length** — vary paragraph length for rhythm
- **Rhetorical questions used as section headers or openers** in a repetitive pattern

### Positive Writing Characteristics to Cultivate

- Vary sentence length naturally — mix short, punchy sentences with longer explanatory ones
- Use specific examples and concrete scenarios rather than abstract generalizations
- Allow some sections to be more conversational and others more technical based on the content
- Let paragraphs have different lengths — some can be 2 sentences, others 6-7
- Use occasional parenthetical asides the way a human writer would (like this)
- Don't over-explain obvious points; trust the reader's intelligence on simple concepts
- Use active voice predominantly but don't force it where passive reads more naturally
- When making a point, make it once clearly rather than restating it three different ways
- Ground explanations in how things actually work in practice, not just theory

---

## 5. Page-Specific Content Structure Guidelines

### Content Assessment First

Before determining structure or making changes to any page, the first step is to assess what the page should provide. Ask: what educational, informative, insightful, contextual, factual, and helpful information should a user receive when they land on this page? Consider the current content, what's missing, what could be expanded, what structural approach best serves the topic, and any other meaningful or relevant considerations for this particular subject.

This assessment should drive all downstream decisions. For FAQ pages, it dictates the appropriate answer structure. For metric and valuation method pages, it identifies where the existing structure could be enriched with additional depth. For all page types, it ensures the user's intent is addressed first and foremost, followed by the meaningful context and insight that turns a basic answer into a genuinely valuable resource. Structure follows substance — figure out what the reader needs, then determine how best to deliver it.

### 5A. Metric Pages

Metric pages currently have an established structure. **Retain the existing page structure** for all metric pages. Enhancement should happen within that structure, not by reorganizing it.

#### Enhancement Priorities for Metric Pages

- **Opening section**: Must immediately address what someone searching for this metric would want to know. Plain language. No preamble. Get to the definition and relevance fast.
- **Explanation depth**: For basic metrics, build understanding from zero. For advanced metrics, start accessible and layer in complexity as the page progresses.
- **Practical application**: Every metric page should help the reader understand not just what the metric is, but how it's actually used when evaluating banks. Use generic or historical examples to illustrate — do not pull data from the website's own financial data.
- **Lists**: Use bullet points for any enumeration of 3 or more items. This includes things like: factors that affect a metric, reasons a metric matters, steps in a calculation, common pitfalls, etc.
- **Visual hierarchy**: Break up dense paragraphs. Use the existing heading structure but ensure content under each heading is scannable and digestible.
- **Comparative context**: Where appropriate, explain how this metric relates to or differs from similar metrics — this is a natural opportunity for internal linking.
- **Additional context and insight**: Where appropriate, add freeform content before the page's Related sections that provides deeper context, practical insight, or additional considerations that don't fit neatly into the structured portions of the page. This might include common misconceptions about the metric, cause-and-effect explanations of what happens when the metric moves, scenarios illustrating how the metric behaves differently across bank types, edge cases or exceptions to general rules, or practical application context that bridges theory to real-world evaluation. This section should feel like the added value that distinguishes the page from a textbook definition.
- **Formulas**: Metric pages already have an established way of presenting formulas just under the brief description of the metric. Retain this existing format.

### 5B. Valuation Method Pages

Valuation method pages also currently have an established structure. **Retain the existing page structure** for all valuation method pages.

#### Enhancement Priorities for Valuation Method Pages

- **Opening section**: Address the likely search intent directly. Someone searching for a bank valuation method wants to understand what it is and when to use it.
- **Process explanation**: Walk through how the method works in a logical, step-by-step manner. If there's a calculation involved, make the steps clear without being overly academic.
- **Strengths and limitations**: Be balanced and specific. Avoid generic statements like "no single method should be used in isolation." Instead, explain the specific situations where this method is most and least useful for bank valuation.
- **Bank-specific context**: Explain what makes this valuation method particularly relevant or different when applied to banks versus other industries.
- **Examples**: Include illustrative examples using generic or historical data. These help enormously with comprehension. Do not use the website's own data.
- **Additional context and insight**: Where appropriate, add freeform content before the page's Related sections that goes beyond the structured method explanation. This might include practical considerations when applying the method to different types of banks, common mistakes analysts make with this method, how market conditions or regulatory changes can affect the method's reliability, or scenario-based illustrations showing how the method leads to different conclusions under different circumstances. This additional depth should feel like the expert perspective that readers can't easily find elsewhere.
- **Formulas**: Valuation method pages already have an established way of presenting formulas just under the brief description of the method. Retain this existing format.

### 5C. FAQ Pages

FAQ pages are the most flexible category and should **not follow a rigid, consistent structure** across all pages. Each FAQ page should feel like a genuine, thoughtful answer to a specific question rather than a procedurally generated response following a template.

#### Core Structure Requirement for All FAQ Pages

Every FAQ page must follow this pattern at the top:

1. **Immediate quick answer**: Within the first 1-3 sentences, directly answer the question. A reader who just wants the short answer should find it instantly without scrolling. This is non-negotiable for search intent satisfaction.
2. **Detailed expansion below**: After the quick answer, provide thorough, well-organized detail that adds real value.

#### What "Not Procedurally Generated" Means

The detailed sections below the quick answer should NOT follow a cookie-cutter format like:

```
Quick answer
## Why This Matters
[generic paragraph]
## Key Factors to Consider
[bulleted list]
## Example
[generic example]
## Related Concepts
[links]
```

Instead, let the content structure emerge from what the question actually demands. Some FAQ pages might benefit from:

- A quick answer followed by a detailed walkthrough with a running example
- A quick answer followed by a "common misconceptions" section that addresses what people often get wrong
- A quick answer followed by a comparison table, then nuanced discussion
- A quick answer followed by scenario-based explanations ("If you're looking at X, here's how this works...")
- A quick answer with an immediate follow-up paragraph expanding on the nuance, then a deeper section addressing edge cases

The point is: **each FAQ page should feel like it was written specifically to be the best possible answer to that particular question**, not like it was generated by running every question through the same template.

#### Enhancement Priorities for FAQ Pages

- **Expand paragraphs to be more informative**: Current FAQ pages may be too thin. Add depth, context, and practical insight that keeps readers engaged and satisfied.
- **Allow unique content structures**: Different questions warrant different answer structures. A "How to calculate X" FAQ can be more procedural. A "Why does X matter for banks" FAQ should be more exploratory and contextual. A "What is the difference between X and Y" FAQ should lead with a direct comparison.
- **Increase engagement and time on page**: Add relevant detail, practical examples, and connecting context that makes the reader feel they found exactly what they were looking for — and learned something they didn't expect to find.
- **Additional considerations**: Where appropriate, FAQ pages can include unique additional content near the end of the page — related considerations, tangential but valuable context, or practical tips that someone asking this question would likely also want to know. This is where each FAQ page can differentiate itself.
- **Key points with paragraph expansion**: Where a topic has several important components or takeaways, consider presenting them first as a bulleted list of key points, then following with individual paragraphs that address each point in more depth. This gives the reader a quick overview they can scan, then the detail they need — a natural way to structure an answer that respects both skimmers and deep readers.
- **Human quality**: After the quick answer, the detailed content should read like an expert explaining something to a colleague — organized but natural, thorough but not padded.
- **Tone consistency**: The quick answer and the detailed expansion below it should feel like they were written by the same person. The quick answer is compressed, not a different voice. Avoid a pattern where the quick answer reads like a dictionary snippet and the detail reads like a blog post — both should share the same approachable, knowledgeable tone established in the voice guidelines.

#### FAQ Content Techniques Toolkit

FAQ pages should draw from a mix of the following techniques based on what each specific question calls for. The goal is to select 2-3 techniques per page that fit naturally, not to apply the same combination everywhere. Structural variety across FAQ pages is a sign of thoughtful content, not inconsistency.

**Answer Layering Techniques**

- **Scenario branching**: Tailor the answer to different reader situations. "If you're evaluating a community bank, this works differently than for a large regional bank..." This adds depth and makes the page feel more personally useful to a wider range of readers.
- **Common mistakes or misconceptions**: Address what people frequently get wrong about the topic. This is high-value content that feels distinctly human and gives readers something they didn't know they needed.
- **"Why this is different for banks"**: Explain what makes this concept unique in banking versus other industries. Many readers are landing from searches where they've already seen generic finance answers elsewhere — this is what differentiates the content.
- **Anticipating follow-up questions**: Address the natural "okay, but what about..." a reader would have after getting the initial answer. This keeps them on the page and builds satisfaction that the resource is thorough.

**Structural Variety Techniques**

- **Running example**: Thread a single hypothetical bank through an entire page to connect concepts. Instead of isolated examples per section, one consistent scenario builds cumulative understanding.
- **Comparison tables**: Especially effective for "vs" or "difference between" FAQs. A quick table followed by prose expanding on the nuances. Tables are scannable and feel like high-effort content.
- **Cause and effect framing**: Show what happens when a metric or factor moves in a given direction, rather than just defining what it measures. This is the "so what" that readers actually care about.

**Engagement Techniques**

- **Practical application context**: Move from "here's what this is" to "here's how you'd actually use this when looking at a bank." The bridge from theory to practice is often where pages lose people or win them.
- **Edge cases or exceptions**: Note when the general rule doesn't apply. This signals expertise and builds trust — generic content never mentions exceptions.

#### FAQ Pages with Inherently Procedural Content

Some FAQ pages (like "How to calculate [metric]") are naturally more procedural, and that's fine. Even these pages should:

- Start with a quick answer (the formula or short method)
- Walk through the calculation clearly
- But then add value beyond the raw steps: explain what the result means, what a good vs. concerning result looks like for banks, common mistakes in the calculation, or when this calculation might mislead

**Formulas on FAQ pages**: Unlike metric and valuation method pages which have an established formula presentation format, FAQ pages should present formulas in a visually appealing and intuitive way that enhances the reader's experience. This is especially important for "how to calculate" FAQs or any FAQ that references a formula. The formula should be clearly set apart from the surrounding text, easy to read at a glance, and each variable should be defined clearly — either inline or immediately adjacent. The presentation should feel like it was designed for this specific page, not copied from a textbook.

Even procedural FAQ pages can include a freeform section at the end with additional considerations relevant to that specific topic.

### 5D. Data Structure and Field Mapping

Content for all pages lives in three self-contained JavaScript data files as plain string literals within object entries. Each entry is identified by its `slug` field. There are no external imports or dependencies — every entry carries all its data and relationships inline.

The three source files are:

- `src/data/content/metrics.js` — 36 metric entries in the `METRICS` array
- `src/data/content/valuations.js` — 12 valuation method entries in the `VALUATION_METHODS` array
- `src/data/content/faqs.js` — 184 FAQ entries in the `FAQS` array

This section maps the abstract content guidance in Sections 5A–5C to the concrete fields you will be editing.

**Important formatting rules:**

- All content fields are plain strings — no HTML, no JSX, no Markdown
- Paragraph breaks within string fields are encoded as `\n\n`
- Single-line breaks (where needed) are encoded as `\n`
- Strings in metrics and valuations files use single quotes (`'...'`); strings in the FAQs file use double quotes (`"..."`) — preserve whichever quote style the file uses
- Escape any apostrophes or quotes that match the string delimiter (e.g., `\'` inside single-quoted strings)
- Bullet points within string fields should use `\n\n` followed by a dash and space (`- `) for each item, with `\n\n` between items for readability when rendered

#### Metric Page Fields

| Guidance Concept | Field(s) | Notes |
|---|---|---|
| Opening section / search intent | `shortDescription`, `description` | `shortDescription` is the brief tagline; `description` is the main introductory content |
| Formula presentation | `formula`, `formulaExplanation` | Retain existing format — do not restructure |
| How to interpret the metric | `interpretation` | What the metric tells the reader |
| Benchmarks and ranges | `typicalRange` | Acceptable/expected ranges for banks |
| Good vs. bad signals | `goodBad.good`, `goodBad.bad` | What high/low values indicate |
| Important caveats | `considerations` | Array of strings — each string is one consideration |
| Data sourcing explanation | `dataSource` or `whereToFindData` | Original entries use `dataSource`; Phase 2 entries use `whereToFindData` — edit whichever exists |
| Bank-specific relevance | `bankSpecificContext` | Why this metric matters specifically for banks |
| Connections to other metrics | `metricConnections` | How this metric relates to others — natural internal linking opportunity |
| Common mistakes | `commonPitfalls` | What investors frequently get wrong |
| Variation across bank types | `acrossBankTypes` | How the metric differs for community banks vs. regionals vs. large banks |
| What moves this metric | `whatDrivesMetric` | Factors that cause the metric to change |
| Related metrics linking | `relatedMetrics`, `relatedMetricDescriptions` | `relatedMetrics` is an array of slugs; `relatedMetricDescriptions` is an object keyed by slug with description strings — fill in any missing descriptions |
| Related valuations linking | `relatedValuations`, `relatedValuationDescriptions` | `relatedValuations` is an array of valuation method slugs; `relatedValuationDescriptions` is an object keyed by slug with description strings — fill in any missing descriptions |
| FAQ cross-references | `faqTeasers` | Array of objects with `question`, `teaser`, `faqSlug`, `faqCluster` — review for completeness |

**Fields NOT to edit on metric pages:** `slug`, `name`, `category`, `categoryLabel`, `isPercentage`, `isEducationalOnly`

#### Valuation Method Page Fields

| Guidance Concept | Field(s) | Notes |
|---|---|---|
| Opening section / search intent | `shortDescription`, `description` | `shortDescription` is the brief tagline; `description` is the main introductory content |
| Formula presentation | `formula`, `formulaExplanation` | Retain existing format — do not restructure |
| Step-by-step process | `steps` | Array of strings — each string is one step |
| Illustrative example | `example` | Walkthrough using generic/historical data |
| Strengths | `strengths` | Array of strings |
| Limitations | `limitations` | Array of strings |
| Bank-specific relevance | `bankSpecific` | Why/how this method applies specifically to banks |
| When to use this method | `whenToUse` | Situations where this method is most appropriate |
| Connections to other methods | `methodConnections` | How this method relates to others — natural internal linking opportunity |
| Common mistakes | `commonMistakes` | What analysts frequently get wrong |
| Variation across bank types | `acrossBankTypes` | How the method applies differently across bank types |
| Related methods linking | `relatedMethods` | Array of valuation method slugs — review for completeness |
| Related metrics linking | `relatedMetrics` | Array of metric slugs — review for completeness and add any metrics discussed in the content but not listed |
| FAQ cross-references | `faqTeasers` | Array of objects — review for completeness |

**Fields NOT to edit on valuation method pages:** `slug`, `name`, `type`, `isPercentage`

#### FAQ Page Fields

| Guidance Concept | Field(s) | Notes |
|---|---|---|
| Immediate quick answer | `shortAnswer` | Must directly answer the question in 1-3 sentences — this is the non-negotiable search intent field |
| Detailed expansion | `fullAnswer` | The main content body — this is where the bulk of enhancement happens. Use `\n\n` for paragraph breaks. This field should contain all the depth, examples, techniques from the FAQ Content Techniques Toolkit, and any additional considerations |
| Related metrics linking | `relatedMetrics` | Array of metric slugs — review for completeness and add any that are discussed in the content but not listed |
| Related valuation methods linking | `relatedValuations` | Array of valuation method slugs — review for completeness |
| Related FAQs linking | `relatedFaqs` | Array of FAQ slugs — review for completeness, especially for FAQs that naturally lead into each other |
| Glossary cross-references | `relatedGlossaryTerms` | Array of strings — review for completeness |

**Fields NOT to edit on FAQ pages:** `slug`, `question`, `cluster`, `clusterName`, `intentType`, `cta`, `metaTitle`, `metaDescription`

#### General Field Editing Rules

- **String fields**: Edit the content in place. Expand, rewrite, and improve the text while preserving the string delimiters and escape characters.
- **Array of strings fields** (like `considerations`, `steps`, `strengths`, `limitations`): You may edit existing items, add new items, or reorder for logical flow. Do not remove items unless replacing with something better per the guidance on existing content.
- **Array of slugs fields** (like `relatedMetrics`, `relatedFaqs`, `relatedMethods`, `relatedValuations`): Add slugs for pages that are discussed in the content or clearly related. Only add slugs that correspond to actual entries that exist in the data files. Do not remove existing slugs unless they are clearly incorrect.
- **Description object fields** (like `relatedMetricDescriptions`, `relatedValuationDescriptions`): Fill in any keys that exist in the corresponding slug array but are missing from the descriptions object. Improve existing descriptions if they are thin or generic.
- **Teaser array fields** (`faqTeasers`): Review for completeness — if the content discusses topics covered by FAQs not currently in the teasers, consider adding them. Each teaser object needs `question`, `teaser`, `faqSlug`, and `faqCluster`.

---

## 6. Content Quality Standards

### Factual Accuracy

- Limit factual claims to those that add genuine value to the reader's understanding
- Do not make opinionated or potentially controversial claims
- All financial concepts should be explained accurately based on generally accepted financial knowledge
- If a claim could be debated among financial professionals, present it as a perspective rather than a fact
- Do not reference or use the website's own financial data or information for examples; use historical, generic, or hypothetical examples instead

### Evergreen Content and Originality

- All content written or expanded should be evergreen — avoid references to specific dates, current market conditions, recent events, or time-sensitive language (e.g., "recently," "in 2024," "as of this writing") that would cause the content to feel outdated over time
- Copyright issues and plagiarism must be avoided. All new and expanded content must be original. Do not reproduce or closely paraphrase material from external sources
- The existing content being updated should already be original and safe to leverage, enhance, and build upon

### Terminology Consistency

- Define abbreviations and acronyms on first use within each page. Even common ones like NIM (net interest margin) or NPA (non-performing assets) should be spelled out the first time they appear, then can be abbreviated afterward.
- Maintain consistent terminology across pages. If one page calls something "allowance for loan losses" and another calls it "allowance for credit losses," pick one and use it consistently — or note both terms and clarify the relationship if both are in common use.
- Don't assume familiarity with banking jargon on first reference, even on advanced pages. Introduce the term clearly, then use it freely.

### Examples and Specificity

- Inject specific, concrete examples wherever they would aid understanding
- Examples should be generic (e.g., "Consider a regional bank with $5 billion in assets...") or historical (referencing well-known industry events or trends)
- Avoid vague statements like "this metric is useful for investors" — explain specifically how and when
- When discussing ranges or benchmarks, provide actual numbers where possible using general industry knowledge (e.g., "Most well-run banks maintain an efficiency ratio between 50% and 60%")
- **Handling existing examples**: Examples already on the page should be improved or kept as-is. Replace an existing example only when it is confusing, redundant with other content on the page, contradictory with surrounding material, or when a better example would significantly help the reader understand the concept. Do not remove examples without replacing them with something at least as useful.

### Paragraph and Content Structure

- Prioritize content for web readability while remaining functional on mobile
- Break up walls of text — no paragraph should exceed 5-6 sentences unless the content genuinely requires it
- Use bullet points for lists of 3 or more items throughout all page types
- When three or more items are listed consecutively within a sentence, consider breaking them out into a bulleted list instead. This improves scannability and avoids dense, run-on sentences that bury important details. For example, rather than writing "Key factors include credit quality, interest rate sensitivity, capital adequacy, and management effectiveness," present those as individual bullets. Use judgment — not every inline list needs extraction, but when the items carry enough weight to warrant individual attention, bullets help.
- Bullet points should contain substantive content (at least 1-2 sentences each), not just single words or short phrases, unless the list is a simple enumeration
- Use subheadings within existing page structure sections where content is dense enough to warrant them
- Vary paragraph length for natural rhythm — mix 2-sentence paragraphs with longer ones
- **Component breakout pattern**: Across all page types, where a topic involves multiple components, factors, or key points, consider breaking them out into a bulleted list first, then dedicating a paragraph to each one below. This pattern works well when a single dense paragraph tries to cover too many ideas at once — splitting it into a scannable list followed by focused paragraphs makes the content both easier to digest and more thorough. Use this where it fits naturally; not every section needs this treatment, but it's a strong option when content is complex or multi-faceted.
- White space is valuable; don't pack everything tightly

---

## 7. Internal Linking Assessment and Enhancement

Internal linking in this project is managed through slug reference arrays and description objects within each entry's data. There are no hyperlinks to insert — linking is accomplished by ensuring the relationship arrays (`relatedMetrics`, `relatedFaqs`, `relatedMethods`, `relatedValuations`) and their corresponding description objects are complete and accurate. The page components use these arrays to render related content sections automatically.

### Assessment Tasks

For each page being enhanced, perform the following:

1. **Audit existing relationship arrays**: Review all slug arrays and description objects on the entry. Are the referenced slugs accurate and relevant?
2. **Identify missing relationships**: Look for mentions of other metrics, valuation methods, or FAQ topics within the entry's content fields that are not currently listed in the relationship arrays. If the content discusses ROE but `relatedMetrics` doesn't include `'roe'`, it should be added.
3. **Check description completeness**: For entries with description objects (`relatedMetricDescriptions`, `relatedValuationDescriptions`), verify that every slug in the corresponding array has a description. Fill in any that are missing with a brief, useful explanation of why that related page is relevant.
4. **Check faqTeasers completeness**: For metric and valuation entries, review whether the `faqTeasers` array covers the most relevant FAQs for that topic. If the content naturally connects to FAQs not currently in the teasers, consider adding them.

### Linking Principles

- Relationship arrays should reflect genuine topical connections, not be exhaustive lists of every tangentially related page
- Cross-link bidirectionally where appropriate: if a metric entry lists a valuation method in `relatedValuations`, that valuation entry should list the metric in `relatedMetrics`
- Description strings should explain the relevance of the relationship briefly — why would someone reading this page want to visit the related page?
- Only add slugs that correspond to actual entries that exist in the three data files
- For FAQ entries, `relatedFaqs` should connect FAQs that naturally lead into each other — if someone is reading one FAQ, what would they logically want to read next?

### Output for Internal Linking

For each page, include in the change summary:

- List of existing relationship array contents
- Any slugs added to relationship arrays with brief justification
- Any description objects filled in or improved
- Any faqTeasers added
- Any bidirectional linking gaps identified (e.g., "This entry references `roe` but the `roe` entry does not reference this entry back — recommend adding when `roe` is processed")

---

## 8. Processing Workflow

### Approach

Pages are processed via script-driven automation. The automation script reads from a page manifest, sends each page through Claude Code one at a time with the full guidance prompt, and commits changes after each page.

**Processing order within the manifest should be:**

1. **Metric pages first** — these have the most rigid structure and are referenced by other page types
2. **Valuation method pages second** — similar structure, may reference metrics already updated
3. **FAQ pages last** — most creative latitude, and benefits from metric and valuation pages already being in their enhanced state since FAQs often reference them

### For Each Page

The automation sends a prompt that instructs you to:

1. Read the content enhancement guidance document completely (this document)
2. Read the existing page content completely
3. Identify the page type (metric, valuation method, or FAQ) and topic complexity level (basic, intermediate, advanced)
4. Perform the content assessment described in Section 5 (Content Assessment First) — determine what the page should provide before making changes
5. Enhance the content in place following all guidelines
6. Assess and update internal linking per Section 7
7. Run the quality self-check in Section 10
8. Produce a change summary

**Each page is processed independently.** Do not carry over assumptions, structural choices, or phrasing from previously processed pages. Treat each page as a fresh assessment guided solely by this document and the page's own content and topic.

### Change Summary Format

After editing each page's content in place, provide a summary that includes:

- **Page identifier**: Which page was edited
- **Topic complexity classification**: Basic, intermediate, or advanced
- **Content changes made**: Brief description of what was expanded, restructured, or rewritten and why
- **Word count change**: Approximate before and after word counts
- **AI pattern fixes**: Specific AI-sounding language or structures that were identified and corrected
- **Internal linking updates**: Slugs added/removed from relationship arrays, descriptions filled in, faqTeasers added, bidirectional gaps identified (per Section 7)
- **Structure changes**: Any modifications to content organization within the existing page structure (for metric/valuation pages) or new structure choices (for FAQ pages)
- **Notes or flags**: Anything that needs human review, seems uncertain, or where a judgment call was made

---

## 9. Things to Explicitly NOT Do

- **Do not modify any entry other than the one matching the target slug** — this is the most critical rule. Do not touch adjacent entries, imports, exports, array structure, or any code outside the target entry's object boundaries.
- **Do not decrease word count on any page** — every page should have equal or more content after enhancement
- **Do not change meta descriptions or title tags** — this includes `metaTitle` and `metaDescription` fields on FAQ entries
- **Do not reorganize the established page structure for metric or valuation method pages** — work within the existing framework
- **Do not use the website's own financial data in examples** — use generic, historical, or hypothetical examples only
- **Do not make opinionated or controversial financial claims**
- **Do not introduce new sections with names like "Key Takeaways" or "The Bottom Line" that feel like AI-generated summary sections** unless the content genuinely warrants it and it doesn't feel formulaic
- **Do not add disclaimers, "not financial advice" notices, or legal language** unless they already exist on the page
- **Do not over-link** — internal links should be helpful, not every mention of every concept needs a link
- **Do not pad content with filler** — every sentence added should earn its place by providing genuine value to the reader
- **Do not make every FAQ page look the same** — structural variety across FAQ pages is a feature, not a bug

---

## 10. Quality Self-Check Before Finalizing Each Page

Before marking a page as complete, verify:

- [ ] Was a content assessment performed first to determine what the page should provide? (Section 5)
- [ ] **Scope guard**: Were only fields within the target slug's entry modified? No changes to adjacent entries, imports, exports, or file structure?
- [ ] Does the opening immediately address the likely search intent?
- [ ] Would a reader find their answer within the first few sentences (especially for FAQs)?
- [ ] Is the word count equal to or greater than the original?
- [ ] Does the content read naturally when read aloud? Would it pass as human-written?
- [ ] Are there any phrases from the AI avoidance list in Section 4?
- [ ] Are lists of 3+ items formatted as bullet points?
- [ ] Do paragraphs vary in length?
- [ ] Do sentences vary in length and structure?
- [ ] Is the complexity level appropriate for the topic (basic = assume nothing, advanced = start accessible and layer in depth)?
- [ ] Are examples specific and concrete rather than vague?
- [ ] Are existing examples preserved, improved, or replaced only with good reason?
- [ ] Is all content evergreen with no time-sensitive language?
- [ ] Is all new content original with no copyright or plagiarism concerns?
- [ ] Are abbreviations and acronyms defined on first use?
- [ ] Have relationship arrays been reviewed and updated where appropriate?
- [ ] Are description objects complete for all slugs in their corresponding arrays?
- [ ] Does the page avoid robotic transitions and formulaic structures?
- [ ] For FAQ pages: Does this page feel uniquely structured for its specific question, or does it feel templated?
- [ ] For FAQ pages: Is the tone consistent between the quick answer and the detailed expansion?

---

## 11. Summary of Key Principles

**Search intent comes first.** Every page exists because someone searched for something. Answer that search immediately, then provide depth.

**Human voice over perfection.** A slightly imperfect but genuine-sounding page is better than a polished but obviously AI-generated one. Real writing has personality, varied rhythm, and occasional directness that AI content often lacks.

**Structure serves the content, not the other way around.** Especially for FAQ pages, let the question determine the answer's shape. Don't force every answer into the same mold.

**Specificity builds trust.** Concrete examples, actual numbers, and practical scenarios make content feel authoritative. Vague generalities feel like filler.

**More is only better when it's genuinely more useful.** Expanding content means adding depth and value, not padding sentences or restating the same point in different words.

**Internal links are navigation aids.** They should help a curious reader explore related topics naturally, not serve as SEO decoration.
