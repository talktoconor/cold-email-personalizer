import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

const SYSTEM_PROMPT = `You are an elite cold email copywriter who has written thousands of high-converting outbound emails for top B2B sales teams. You understand that the best cold emails feel like they were written by a human who genuinely researched the prospect — not by a template.

Your job: given prospect information and the sender's product/value prop, generate exactly 3 cold email variants. Each variant uses a different persuasion angle:

**Variant 1 — Direct Value**
Lead with a specific observation about the prospect's company/role, then connect it directly to the sender's value prop. Short, punchy, no fluff. This is the "I noticed X about your company, we help with exactly that" angle.

**Variant 2 — Curiosity / Pattern Interrupt**
Open with something unexpected — a contrarian take, a surprising stat, or a provocative question related to the prospect's world. The goal is to break the pattern of every other cold email in their inbox. Make them want to reply even if just to disagree.

**Variant 3 — Social Proof / Peer Reference**
Lead with what similar companies/roles are doing. "Other [their role] at [similar companies] are..." — leveraging FOMO and social validation. Reference specific outcomes when possible.

Rules:
- Each email MUST reference specific details from the prospect's info (job title, company, recent news, tech stack, team size, etc.)
- Subject lines must be lowercase, 4-7 words, no clickbait
- Emails must be 50-90 words in the body (SDRs know short emails get replies)
- End with a soft CTA — question, not a demand ("worth a quick chat?" not "book a call here")
- Never use: "I hope this email finds you well", "I came across your profile", "I'd love to", "just following up", "synergy", "leverage", "circle back"
- Write like a smart human, not a marketing bot
- Match the tone to the prospect's likely communication style (exec = direct, IC = casual, technical = specific)
- If sender context includes their company URL, LinkedIn, or uploaded documents, use those details to make the emails feel like they come from a real person at a real company — reference specific capabilities, case studies, or credibility signals from the provided materials

Output format — respond with ONLY valid JSON, no markdown fences:
{
  "emails": [
    {
      "variant": "Direct Value",
      "subject": "...",
      "body": "..."
    },
    {
      "variant": "Curiosity Hook",
      "subject": "...",
      "body": "..."
    },
    {
      "variant": "Social Proof",
      "subject": "...",
      "body": "..."
    }
  ]
}`;

export async function POST(request: Request) {
  try {
    const { prospectInfo, senderContext, companyUrl, linkedinUrl, pdfContext, pdfFileName } =
      await request.json();

    if (!prospectInfo?.trim()) {
      return Response.json(
        { error: "Prospect info is required" },
        { status: 400 }
      );
    }

    // Build enriched sender context
    const senderParts: string[] = [];
    if (senderContext?.trim()) {
      senderParts.push(senderContext.trim());
    }
    if (companyUrl?.trim()) {
      senderParts.push(`Sender's company website: ${companyUrl.trim()}`);
    }
    if (linkedinUrl?.trim()) {
      senderParts.push(`Sender's LinkedIn: ${linkedinUrl.trim()}`);
    }

    const enrichedSender =
      senderParts.length > 0
        ? senderParts.join("\n\n")
        : "Not provided — write emails that are prospect-focused and leave the value prop vague enough to spark curiosity.";

    // Build the message content — if PDF is provided, use multimodal
    const contentParts: Anthropic.Messages.ContentBlockParam[] = [];

    // Add PDF as a document if provided
    if (pdfContext) {
      contentParts.push({
        type: "document",
        source: {
          type: "base64",
          media_type: "application/pdf",
          data: pdfContext,
        },
      });
      contentParts.push({
        type: "text",
        text: `The above PDF document${pdfFileName ? ` ("${pdfFileName}")` : ""} contains additional context about the sender's company — use relevant details from it (case studies, product features, metrics, differentiators) to make the emails more specific and credible.\n\n`,
      });
    }

    // Add the main prompt
    contentParts.push({
      type: "text",
      text: `## Prospect Information
${prospectInfo}

## Sender's Product / Value Prop
${enrichedSender}

Generate 3 personalized cold email variants.`,
    });

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1500,
      system: SYSTEM_PROMPT,
      messages: [{ role: "user", content: contentParts }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";

    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error("Generation error:", error);
    const msg =
      error instanceof Error ? error.message : "Failed to generate emails";
    return Response.json({ error: msg }, { status: 500 });
  }
}
