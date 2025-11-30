# Before and After: Third Person Conversion for Solution Route

This document shows all changes made to convert the solution page (`/solution`) from second person to third person.

---

## Change 1: Page Title (Browser Tab)

**BEFORE:**

```html
{% block title %}Solution & What You Can Do - Nuclear Energy{% endblock %}
```

**AFTER:**

```html
{% block title %}Solution & Recommended Actions - Nuclear Energy{% endblock %}
```

---

## Change 2: Main Header and Subtitle

**BEFORE:**

```html
<h1>Solution &amp; What You Can Do</h1>
<p>Paths forward for nuclear energy and how you can make a difference</p>
```

**AFTER:**

```html
<h1>Solution &amp; Recommended Actions</h1>
<p>Paths forward for nuclear energy and ways to support its advancement</p>
```

**Changes Made:**

- "What You Can Do" → "Recommended Actions"
- "how you can make a difference" → "ways to support its advancement"

---

## Change 3: Section Heading

**BEFORE:**

```html
<h2>What You Can Do</h2>
```

**AFTER:**

```html
<h2>Recommended Actions</h2>
```

**Changes Made:**

- "What You Can Do" → "Recommended Actions"

---

## Change 4: Action List Introduction

**BEFORE:**

```html
<p>
  Here are two ways you can help support the growth of nuclear knowledge that
  take just a minute to do:
</p>
```

**AFTER:**

```html
<p>
  There are two ways individuals can help support the growth of nuclear
  knowledge that take just a minute to complete:
</p>
```

**Changes Made:**

- "Here are" → "There are"
- "you can help" → "individuals can help"
- "to do" → "to complete"

---

## Change 5: Action Items (Bullet Points)

**BEFORE:**

```html
<li>
  Join or donate to groups like
  <a href="https://www.nuclearmatters.com/" target="_blank">Nuclear Matters</a>
  or
  <a href="https://www.mothersfornuclear.org/donate" target="_blank"
    >Mothers for Nuclear</a
  >.
</li>
<li>
  Send a message to your senator to keep funding going for SMR licensing and the
  ADVANCE Act, an act passed in 2024 requiring the U.S. Nuclear Regulatory
  Commission to modernize old nuclear regulations (U.S.NRC).
</li>
```

**AFTER:**

```html
<li>
  Joining or donating to groups like
  <a href="https://www.nuclearmatters.com/" target="_blank">Nuclear Matters</a>
  or
  <a href="https://www.mothersfornuclear.org/donate" target="_blank"
    >Mothers for Nuclear</a
  >.
</li>
<li>
  Sending a message to one's senator to keep funding going for SMR licensing and
  the ADVANCE Act, an act passed in 2024 requiring the U.S. Nuclear Regulatory
  Commission to modernize old nuclear regulations (U.S.NRC).
</li>
```

**Changes Made:**

- "Join or donate" → "Joining or donating" (imperative to gerund)
- "Send a message to your senator" → "Sending a message to one's senator" (imperative to gerund, "your" to "one's")

---

## Summary of Changes

All instances of second person ("you", "your") have been converted to third person:

1. **Page Title**: Changed to "Recommended Actions"
2. **Header**: Changed to neutral third person language
3. **Direct Address**: Removed all "you/your" references
4. **Imperative Verbs**: Converted to gerunds (Join → Joining, Send → Sending)
5. **Possessives**: Changed "your senator" to "one's senator"

The page now maintains a consistent third-person academic tone throughout, suitable for a research paper or formal presentation.
