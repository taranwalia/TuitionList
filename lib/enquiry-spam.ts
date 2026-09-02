type EnquirySpamInput = {
  parentName: string;
  parentEmail: string;
  parentPhone?: string;
  subject: string;
  level: string;
  location?: string;
  message: string;
};

type SpamAssessment = {
  isLikelySpam: boolean;
  score: number;
  reasons: string[];
};

const salesOrResearchPatterns = [
  /\bmarket research\b/i,
  /\bresearch call\b/i,
  /\bvideo call\b/i,
  /\binformal call\b/i,
  /\bearly prototype\b/i,
  /\bprototype\b/i,
  /\bearly access\b/i,
  /\bfounding tutor\b/i,
  /\bfounding teacher\b/i,
  /\bdiscounts?\b/i,
  /\bwhen .* launches\b/i,
  /\btool to help\b/i,
  /\bdigital resource\b/i,
  /\bcurrently plan lessons\b/i,
  /\btrack progress\b/i,
  /\bwhere students are struggling\b/i,
  /\bworth building\b/i,
  /\bbuilding\s+[a-z0-9-]+/i,
  /\bwould you be open to\b/i,
  /\bi'?m speaking with\b/i,
  /\bi am speaking with\b/i,
  /\bquick question\b/i,
  /\bhow you currently handle\b/i,
  /\bhow you currently work\b/i,
  /\bshow you an early\b/i,
  /\bgenuine feedback\b/i,
  /\bclient is late paying\b/i,
  /\bpayment chasing\b/i,
  /\bchasing.*payment\b/i,
  /\bwhatsapp me\b/i,
  /\bemail me\b/i,
  /\bleads?\b/i,
  /\bseo\b/i,
  /\bcrm\b/i,
  /\bmarketing\b/i,
  /\badvertis(e|ing)\b/i,
  /\bpartnership\b/i,
  /\bcollaboration\b/i,
  /\bsponsor(ed)?\b/i,
  /\bguest post\b/i,
  /\blink exchange\b/i
];

const commercialDomains = [
  /\bpathra\.co\.uk\b/i,
  /\bcalendly\.com\b/i,
  /\bhubspot\b/i,
  /\bmailchimp\b/i,
  /\bsubstack\b/i
];

const tuitionIntentPatterns = [
  /\bmy child\b/i,
  /\bmy son\b/i,
  /\bmy daughter\b/i,
  /\bmy student\b/i,
  /\bi need\b/i,
  /\blooking for (a )?tutor\b/i,
  /\btuition\b/i,
  /\btutoring\b/i,
  /\blesson(s)?\b/i,
  /\bexam\b/i,
  /\bgcse\b/i,
  /\ba-?level\b/i,
  /\b11\+?\b/i,
  /\byear\s+\d+\b/i,
  /\bavailability\b/i,
  /\brate(s)?\b/i,
  /\bsupport with\b/i,
  /\bhelp with\b/i
];

export function assessEnquirySpam(input: EnquirySpamInput): SpamAssessment {
  const text = [
    input.parentName,
    input.parentEmail,
    input.parentPhone,
    input.subject,
    input.level,
    input.location,
    input.message
  ]
    .filter(Boolean)
    .join("\n");

  const reasons: string[] = [];
  let score = 0;

  for (const pattern of salesOrResearchPatterns) {
    if (pattern.test(text)) {
      score += 2;
      reasons.push(`Matched marketing/research phrase: ${pattern.source}`);
    }
  }

  for (const pattern of commercialDomains) {
    if (pattern.test(text)) {
      score += 3;
      reasons.push(`Matched commercial domain or tool reference: ${pattern.source}`);
    }
  }

  const hasTuitionIntent = tuitionIntentPatterns.some((pattern) => pattern.test(text));
  if (!hasTuitionIntent) {
    score += 2;
    reasons.push("No clear parent/student tuition request detected.");
  }

  const asksTutorAboutTheirBusiness =
    /\bhow (do|you|your)\b/i.test(input.message) &&
    /\b(plan|track|handle|manage|chase|clients?|payments?|students?|lessons?)\b/i.test(input.message);
  if (asksTutorAboutTheirBusiness) {
    score += 3;
    reasons.push("Message asks the tutor about their business processes rather than requesting tuition.");
  }

  const containsContactPitch = /\b(whatsapp|email|call|book|schedule)\b/i.test(input.message) && /\b(me|my|prototype|feedback|research)\b/i.test(input.message);
  if (containsContactPitch) {
    score += 2;
    reasons.push("Message asks tutor to contact sender for a pitch, call, or feedback request.");
  }

  return {
    isLikelySpam: score >= 5,
    score,
    reasons
  };
}
