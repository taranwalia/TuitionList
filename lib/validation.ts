import { z } from "zod";
import { outwardPostcode } from "@/lib/utils";

export const enquirySchema = z.object({
  tutorId: z.string().min(1),
  parentName: z.string().min(2, "Please enter your name."),
  parentEmail: z.string().email("Please enter a valid email address."),
  parentPhone: z.string().max(30).optional(),
  studentYearGroup: z.string().min(1, "Please enter the student year group."),
  subject: z.string().min(1, "Please choose a subject."),
  level: z.string().min(1, "Please choose a level."),
  tuitionPreference: z.enum(["online", "in-person", "both"]),
  location: z.string().max(120).optional(),
  message: z.string().min(20, "Please include a little more detail."),
  consentGiven: z.literal("on", {
    errorMap: () => ({ message: "Consent is required before we can send the enquiry." })
  }),
  website: z.string().max(0, "Spam check failed.").optional()
});

export const tutorProfileSchema = z.object({
  displayName: z.string().min(2),
  fullName: z.string().min(2),
  phone: z.string().optional(),
  town: z.string().min(2),
  county: z.string().min(2),
  postcodeArea: z.preprocess(
    (value) => outwardPostcode(String(value ?? "")),
    z.string().min(2, "Please enter the first part of the postcode.").max(4, "Postcode area must be 4 characters or fewer.")
  ),
  onlineAvailable: z.coerce.boolean().default(false),
  inPersonAvailable: z.coerce.boolean().default(false),
  willingToTravel: z.coerce.boolean().default(false),
  minRate: z.coerce.number().min(0),
  maxRate: z.coerce.number().min(0),
  shortBio: z.string().min(40).max(220),
  longBio: z.string().min(120),
  experience: z.string().min(40),
  subjects: z.array(z.string()).min(1),
  levels: z.array(z.string()).min(1),
  websiteUrl: z.string().url().optional().or(z.literal("")),
  linkedinUrl: z.string().url().optional().or(z.literal("")),
  qualificationTitle: z.string().max(160).optional(),
  qualificationInstitution: z.string().max(160).optional(),
  qualificationYear: z.string().max(40).optional(),
  qualificationDescription: z.string().max(1000).optional(),
  showEmail: z.coerce.boolean().default(false),
  showPhone: z.coerce.boolean().default(false),
  showWhatsapp: z.coerce.boolean().default(false)
}).refine((data) => data.onlineAvailable || data.inPersonAvailable, {
  message: "Please choose online, in-person, or both.",
  path: ["onlineAvailable"]
}).refine((data) => data.maxRate >= data.minRate, {
  message: "Maximum rate must be at least the minimum rate.",
  path: ["maxRate"]
});
