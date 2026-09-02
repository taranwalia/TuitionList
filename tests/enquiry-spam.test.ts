import { describe, expect, it } from "vitest";
import { assessEnquirySpam } from "@/lib/enquiry-spam";

const baseEnquiry = {
  parentName: "Parent",
  parentEmail: "parent@example.com",
  subject: "Maths",
  level: "GCSE",
  location: "London"
};

describe("enquiry spam assessment", () => {
  it("holds tutor marketing and research pitches", () => {
    const result = assessEnquirySpam({
      ...baseEnquiry,
      parentName: "Samuel Quainoo",
      parentEmail: "samuelquainoo@pathra.co.uk",
      message:
        "I am building Pathra, a tool to help independent tutors understand where students are struggling. Would you be open to a 45-minute informal video call? I can show you an early prototype and get your feedback."
    });

    expect(result.isLikelySpam).toBe(true);
    expect(result.score).toBeGreaterThanOrEqual(5);
  });

  it("allows ordinary tuition enquiries", () => {
    const result = assessEnquirySpam({
      ...baseEnquiry,
      message:
        "I am looking for a GCSE Maths tutor for my daughter in Year 11. She needs help with algebra and exam technique. Please could you let me know your availability and rates?"
    });

    expect(result.isLikelySpam).toBe(false);
  });
});
