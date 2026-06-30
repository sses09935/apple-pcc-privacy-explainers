# Your AI, your data: understanding Private Cloud Compute (AI user edition)

> Concept edition. **Same set of facts** as the developer edition (`content/knowledge-base.md`), just a lighter framing.
> Wording follows the glossary's plain-language policy (attestation → verification; transparency log → a record anyone can check; relay → anonymous forwarding).
> Factual sentences carry `[S0X]`; analogies do not exaggerate beyond the facts. English is a source-aligned translation of the Traditional Chinese source text.

---

## 0. Opening: you use AI every day — where does your data go?

> [!SUMMARY] The short version
>
> 1. The genuinely capable large models live in the cloud, so your content often has to leave your phone to be processed. `[S11]`
> 2. The answer PCC aims to give is not "trust us not to look" but "**it is technically impossible to peek, and outsiders can verify that**". `[S11]`
> 3. By the end you get a ruler for **evaluating any AI service** — including **where it does not protect you**.

You ask an AI assistant questions, have it rewrite an email, tidy photos, or look at an image — much of this content often leaves your phone and goes to a large cloud model. `[S11]` Because a genuinely capable large model is too big to fit on a phone, it has to live in a data center.

The question is: **once it is sent up, who can see it?**

Most cloud services answer "we promise not to snoop". Apple's **Private Cloud Compute (PCC)** wants to give a different answer — not "trust us not to look" but "**it is technically impossible to peek, and outsiders can verify it**". `[S11]`

This explainer uses three everyday analogies and one "journey of a request" to show how it does that, and finally gives you a ruler you can **take to evaluate any AI service**. By the end you will know which questions to ask, what counts as "real protection", and — importantly — **where it cannot protect you**.

---

## 1. Two kinds of privacy promise: verbal vs technical

Imagine two restaurants both say "we won't eat the food you packed to take home":

- **Verbal promise**: a "staff must not eat this" note on the door. You can only trust it. The day the manager changes, or things get busy, the rule may slip — and you have **no way to check**. `[S11]`
- **Technical promise**: the takeaway box is **locked from your end, and only you have the key**, so staff cannot eat it even if they wanted to; and **anyone can come and check that the lock is real**. `[S11]`

The difference: the first relies on people's discipline, the second on physics and math. PCC takes the second route — building "cannot look" into the system design so that even the operator cannot get around it, and **external researchers can verify it**. `[S11]`

> [!NOTE]
>
> This is also why we keep stressing "can it be verified" — a promise only carries weight when outsiders can check it.

> [!MISCONCEPTION] Don't read PCC this way
>
> - **Not** "data never goes to the cloud": what can be done on the phone stays on the phone, and only when needed does it go to the cloud (see "How it decides whether to use the cloud" below). `[S11]`
> - **Not** "you can now unconditionally trust all cloud AI": PCC is a **verifiable** approach, not an endorsement of every cloud service. `[S05]`
> - **Not** "Apple has published every internal detail": what is published is the **software actually running in production** for inspection, not every detail laid bare. `[S05, S07]`
> - **Not** ordinary cloud hosting: the point is the **privacy boundary, verifiability and honest limits**, not just putting data in someone else's data center. `[S03]`

---

## Why not just use "end-to-end encryption"?

You might think: lots of apps tout "end-to-end encryption", so why not cloud AI?

End-to-end encryption means only you and the recipient can read it; no one in the middle can see it. The problem is — **the very job of cloud AI is to "read your content and then help you process it"**. For a large model to rewrite, summarize or answer for you, it **must be able to see** your input. `[S11]` You cannot "end-to-end encrypt" data away from a model that has to read it to work.

So PCC changed the goal: not "even the service provider cannot read it" (then AI could not work), but —

> [!SUMMARY] What PCC changes the goal to
>
> **"The service provider reads it briefly in order to help you, but it is technically unable to retain it, leak it, or single you out — and all of this can be verified by outsiders."** `[S03]`

That is why the five things below matter: use-once-and-discard, no back door, cannot be singled out, can be verified — together they mean that "having to read your data" no longer equals "someone being able to do something else with your data". `[S03]`

---

## 2. How PCC works (the five requirements, by analogy)

![D5 (simplified) the five requirements at a glance](../../../assets/diagrams/en/D5.svg)
*Figure: the five things it promises to do for you. `[S03]`*

PCC has five core requirements. Each gets an analogy, one line on "**what this protects**", and one on "**how it can be verified**". `[S03]`

### ① Use once, keep nothing (stateless computation)
- **Analogy**: like a **room that clears itself out after use** — once you leave, nothing remains inside.
- **What this protects**: your content exists only to answer you that one time; after replying it is no longer kept, not even debug logs. `[S03]`
- **How it is done**: at every reboot the system replaces the key for temporary data entirely, so old data can no longer be read. `[S03]`

### ② Technically impossible, not just "promised not to" (enforceable guarantees)
- **Analogy**: not a "do not peek" notice, but **simply no key to open the door**.
- **What this protects**: protection comes from the system design itself, not from human discipline; even the people running operations have no "master key". `[S03]`

### ③ No one can read it by going around the system (no privileged access)
- **Analogy**: a **box only you have the key to** — not the administrator, not Apple's engineers, even during a crash or a midnight emergency fix. `[S03]`
- **What this protects**: there is no "back door" or admin channel to read your data. The system even **removes** the tools engineers would normally use to "go in and take a look" (such as the remote command line). `[S06]`

### ④ Cannot be "singled out" and targeted (non-targetability)
- **Analogy**: your request is dropped into a large group for processing, and **no one can pick "you" out** to tamper with. `[S03]`
- **What this protects**: even a powerful attacker who wants to target you specifically would have to **attack a large swath of the system**, which is easy to notice. `[S03]`
- **How it is done**: each request only goes to a small set of servers; compromising one of them touches only a tiny number of requests, almost never "yours". `[S23]`

### ⑤ Outsiders can verify it themselves (verifiable transparency)
- **Analogy**: a **receipt anyone can verify** — Apple publishes the software the cloud actually runs so independent researchers can check it. `[S05]`
- **What this protects**: its claims do not require blind faith; others can check for you, and this public record **can only be added to, not quietly changed**, so tampering is exposed. `[S05]`

---

## 3. How it decides whether to use the cloud

![D1 (popularized) on-device vs cloud](../../../assets/diagrams/en/D1.svg)
*Figure: do the easy parts on the phone, send only the hard ones to the private cloud. `[S11]`*

Not everything goes to the cloud. Your phone judges first: `[S11]`
- **What can be done on the phone** → stays on the phone and never leaves.
- **What is harder and needs the large model** → only this goes to PCC.

So "going to the cloud" **happens only when necessary**, not as a default of sending everything out.

---

## 4. The journey of your request

![D3 (simplified) the journey of a request](../../../assets/diagrams/en/D3.svg)
*Figure: phone →(anonymous forwarding)→ a verified cloud server → discarded after use. `[S04]`*

When the cloud really is needed, it goes roughly like this:

1. **Hide "who you are" first**: the request passes through a **third-party relay** (currently Cloudflare and Fastly), which masks your network address, so the PCC side does not know who sent it. `[S04]`
2. **Enter with an "anonymous pass"**: your device receives a kind of **one-time pass that cannot be matched to your identity**; the server can only confirm "this is a valid request" but cannot tell which person or which phone. `[S04]`
3. **Only hand it to "verified" servers**: your phone first asks the server to produce a **cryptographic proof** confirming it is running **exactly that published, checkable software**, and only then gives it the key to decrypt the request. `[S04, S05]`
4. **Encrypted between servers too**: if a request needs several servers to compute together, they are also encrypted between one another, and each must pass the same verification. `[S26]`
5. **Discarded after use**: once processed and answered, the data is not retained. `[S03]`

> [!NOTE] Why go to all this trouble?
>
> Because each step removes a link where "someone could peek": the relay removes "knowing who you are", verification removes "swapping in tampered software", and discard-after-use removes "digging up old records later".

---

## 5. Why "verifiable" is the key difference

Ordinary cloud AI can usually only give you a "verbal promise". PCC is different: `[S05]`
- Apple publishes **the software of every version that goes live**, recorded in a **record anyone can check** that **can only be added to, not quietly changed**. `[S05]`
- Your device **only talks to servers whose software is in that record**. `[S05]`
- Once written, a record **cannot be quietly removed**; tampering is detectable. `[S05]`
- Apple also provides tools and pays rewards (up to one million US dollars) inviting researchers around the world to find flaws. `[S12]`

That is what "verifiable" means: **not asking you to trust, but letting people check.**

---

## 6. What is **not** in scope (the honest boundary)

No system is all-powerful. Stating this clearly is how you know what this ruler can measure:

- **Not "Apple can never see anything"**. These protections are for **the requests sent into PCC**; and like all security systems, it has its own assumed threat range. `[S07]`
- **"Open source" does not equal "every detail can be matched to the finished product"**. Researchers can check "whether what the cloud runs is the same as what was published"; but Apple does **not** provide the ability to "rebuild an identical binary from the published source", so the source code is more like **material that helps analysis**, not a line-by-line proof. `[S07]`
- **A little non-personal information is still exposed**: to route a request to a nearby data center, the relay learns your **approximate geographic region**; the request also carries a little **non-identifying** information (such as "iPhone" and the OS version). This is not enough to identify you, but honesty requires saying so. `[S07]`

> [!BOUNDARY] Why spell out the limits
>
> Spelling these out is not throwing cold water — a system willing to state its own boundaries is usually more trustworthy than one that "guarantees everything is perfect".

---

## 7. Use it as a ruler: evaluating any AI service

### 7.1 PCC vs typical cloud AI (comparison)

> [!NOTE] How to read this table
>
> The left column is what a typical cloud service tends to do; the right is what PCC does. The point is the contrast between "verbal" and "technical + verifiable", not memorizing each cell.

| What you should ask | Typical cloud AI | PCC |
|---|---|---|
| Is it kept after use? | Often (logs/debug) | Discarded after use, not retained `[S03]` |
| Who can read your data? | The provider/admin may be able to | By design no one can bypass (incl. Apple) `[S03]` |
| Any "master admin channel"? | Often | Remote command line etc. deliberately removed `[S06]` |
| Can it target you specifically? | Usually | Hard; needs a large-scale attack on much of the system `[S23]` |
| Can the claim be verified by outsiders? | Mostly not | Published software + a checkable record `[S05]` |
| Protection comes from? | Mostly policy promises | Technical mechanisms `[S03]` |

### 7.2 An AI privacy checklist (take it to any service)
- [ ] Will my input **be retained or used for training**? For how long?
- [ ] **Who**, and under what circumstances, can read my content? Is there an "admin channel" or back door?
- [ ] Can its privacy claims **be verified by an independent third party**, or must I take them on faith?
- [ ] Is protection **achieved technically**, or only **promised by policy**?
- [ ] When something goes wrong (crash, investigation, breach), does the protection still hold?
- [ ] Does it **state its own limits honestly**? (One that states its limits tends to be more trustworthy.)

### 7.3 How to use the ruler: an example
Suppose an AI service says "we take your privacy seriously". Use the checklist above to press: "How long is data kept? Who can read it? Can external researchers verify it?" — if the answers are all "trust us", it stops at a "verbal promise"; if it can show "technically impossible + verifiable", it approaches the PCC level.

---

## 8. 2026: the standard is expanding

In 2026 Apple extended PCC **beyond** its own data centers, working with Google and NVIDIA to run on Google Cloud. `[S13]` What matters for you:
- **The five requirements are completely unchanged.** `[S13]`
- **Apple still fully controls** this software; your device **only trusts PCC software cryptographically approved by Apple**. `[S13]`
- This **does not mean** handing your data to Google to use freely — the chain of trust is still gatekept by Apple. `[S13]`

In other words: the data center may move, but **the gatekeeper and the rules have not changed**.

---

## What to take away

1. **What can be done on the phone stays on the phone**, and only when needed does it go to the cloud — going to the cloud happens only when necessary, not by default. `[S11]`
2. PCC builds "cannot look" into the **system design** (use-once, no back door, cannot be singled out), and **outsiders can verify it** — not a verbal promise. `[S03, S05]`
3. It **states its limits honestly**: the guarantees are for PCC requests, it does not claim "bit-for-bit reproducibility", and it exposes things like your approximate region. Willingness to state limits usually makes it more trustworthy. `[S07]`
4. Take the ruler with you: ask any AI service "how long is it kept? who can read it? can outsiders verify it? technical or policy?" `[S03, S05]`

---

## 9. FAQ + mini glossary

**Q: Can Apple see my content?**
For requests processed by PCC, by design **not even Apple employees can, even during processing**; nothing is retained after use. `[S03]` (Precisely: this is a guarantee for PCC requests, and the system has its own assumed threat range. `[S07]`)

**Q: Do I need to set anything up?**
No. What can be done on the phone stays on the phone; only when the cloud is needed does it go through PCC. `[S11]`

**Q: Is that "anonymous" real, or just spin?**
It is a technical measure: your address is masked by a third-party relay, and you use a "one-time pass that cannot be matched to your identity", so the server cannot tell who you are. `[S04]`

**Q: Is "published for anyone to check" actually being checked?**
Apple provides tools and rewards (up to one million US dollars) to encourage researchers to find problems. `[S12]`

**Q: What about during a crash or a breach?**
Even if a server is compromised, it can only touch a tiny number of requests, data is discarded after use, and every reboot wipes it, so an attacker can hardly persist for long. `[S07]`

**Q: I heard it used Google's data centers in 2026 — is it still safe?**
The data center moves, but Apple stays in control, your phone only trusts the software Apple has approved, and the standard does not change. `[S13]`

**Mini glossary (plain-language)**
- **Verification (attestation)**: a server proves "I am running that published software". `[S05]`
- **A record anyone can check (transparency log)**: a public software list that can only be added to, not quietly changed. `[S05]`
- **Anonymous forwarding (relay)**: a forwarding layer that hides your source address. `[S04]`
- **One-time pass**: an access credential that cannot be matched to your identity and is used once then discarded. `[S04]`
- **Private Cloud Compute (PCC)**: the cloud system Apple built for private AI inference. `[S11]`
