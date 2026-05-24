import Anthropic from "@anthropic-ai/sdk";

const client = new Anthropic();

export async function POST(request: Request) {
  try {
    const { companyUrl, prospectName, linkedinUrl } = await request.json();

    if (!companyUrl && !prospectName && !linkedinUrl) {
      return Response.json(
        { error: "Provide at least a company URL, prospect name, or LinkedIn URL" },
        { status: 400 }
      );
    }

    const prompt = `You are a sales research analyst. Given the following prospect information, generate a structured research report with personalization data points for cold email outreach.

${companyUrl ? `Company URL: ${companyUrl}` : ""}
${prospectName ? `Prospect Name: ${prospectName}` : ""}
${linkedinUrl ? `LinkedIn URL: ${linkedinUrl}` : ""}

Based on what you can infer from this information (company name, domain, industry signals), provide a research report. Return ONLY valid JSON:
{
  "company": {
    "name": "Company name",
    "industry": "Industry vertical",
    "size": "Estimated company size",
    "stage": "Startup/Growth/Enterprise",
    "description": "1-2 sentence description"
  },
  "signals": {
    "recentNews": ["List of 2-3 likely recent events or news items"],
    "techStack": ["List of likely technologies based on industry and stage"],
    "hiringSignals": ["List of likely hiring patterns"],
    "painPoints": ["List of 3-4 likely pain points based on role/industry"],
    "fundingStatus": "Known or estimated funding status"
  },
  "personalizationHooks": [
    "5-6 specific angles you could use to personalize a cold email to this prospect"
  ],
  "talkingPoints": [
    "3-4 conversation starters based on their likely priorities"
  ]
}`;

    const message = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 2000,
      messages: [{ role: "user", content: prompt }],
    });

    const text =
      message.content[0].type === "text" ? message.content[0].text : "";
    const parsed = JSON.parse(text);

    return Response.json(parsed);
  } catch (error) {
    console.error("Research error:", error);
    const msg =
      error instanceof Error ? error.message : "Research failed";
    return Response.json({ error: msg }, { status: 500 });
  }
}
