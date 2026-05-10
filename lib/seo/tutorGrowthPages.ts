import { tutorSignupFaqs } from "@/lib/seo/faqs";
import type { SeoPage } from "@/lib/seo-pages";

const tutorGrowthLinks = [
  { href: "/become-a-tutor", label: "Create a free tutor profile" },
  { href: "/free-tutor-listing-uk", label: "Free tutor listing UK" },
  { href: "/free-tutor-directory-uk", label: "Free tutor directory UK" },
  { href: "/for-tutors", label: "For tutors" },
  { href: "/no-commission-tutor-platform", label: "No commission tutor platform" },
  { href: "/how-tutor-listings-rank", label: "How tutor listings rank" },
  { href: "/profile-checks", label: "Profile checks explained" }
];

type TutorGrowthPageSeed = {
  path: string;
  title: string;
  description: string;
  h1: string;
  intro: string;
  focus: string;
  expectation: string;
};

const freePositioning =
  "TuitionList lets tutors, teachers, and tuition providers create a basic profile for free. There is no lesson commission, no parent finder fee, and no tutor subscription charge.";

const honestExpectation =
  "TuitionList does not guarantee enquiries, rankings, lesson bookings, income, or client numbers. Tutors are responsible for keeping their profile accurate, lawful, current, and not misleading.";

const tutorGrowthPageSeeds: TutorGrowthPageSeed[] = [
  {
    path: "/advertise-as-a-tutor",
    title: "Advertise as a Tutor for Free | TuitionList",
    description:
      "Advertise as a tutor on TuitionList with a free tutor profile. List your subjects, levels, location, rates, online tuition, and experience.",
    h1: "Advertise as a tutor for free",
    intro:
      "TuitionList gives independent tutors, teachers, and tuition providers a simple way to advertise tutoring services through a searchable UK tutor profile.",
    focus:
      "Add your subjects, levels, location, online or in-person availability, rates, qualifications, DBS-related information, safeguarding training, insurance, experience, and contact preferences.",
    expectation: honestExpectation
  },
  {
    path: "/advertise-tutoring-services",
    title: "Advertise Tutoring Services Online | TuitionList",
    description:
      "Promote your tutoring services online with a free TuitionList profile and receive parent enquiries directly through the directory.",
    h1: "Advertise tutoring services online",
    intro:
      "If you offer private tuition, online tutoring, small-group tuition, exam support, or tuition centre services, TuitionList can help parents, carers, and students discover your profile.",
    focus:
      "A clear profile can explain what you teach, who you support, where you offer tuition, whether you teach online, and how families can enquire.",
    expectation: honestExpectation
  },
  {
    path: "/advertise-as-a-private-tutor",
    title: "Advertise as a Private Tutor | TuitionList",
    description:
      "Create a free profile to advertise as a private tutor across the UK with no commission or subscription charge.",
    h1: "Advertise as a private tutor",
    intro:
      "TuitionList is built for independent private tutors who want a straightforward directory profile without agency commission or subscription fees.",
    focus:
      "Profiles are submitted for admin review before appearing publicly, helping keep the directory consistent and useful for families.",
    expectation: honestExpectation
  },
  {
    path: "/advertise-tutoring-online",
    title: "Advertise Online Tutoring Services | TuitionList",
    description:
      "Advertise online tutoring services with a free TuitionList profile for parents and students searching across the UK.",
    h1: "Advertise online tutoring services",
    intro:
      "Online tutors can use TuitionList to show subjects, levels, hourly rates, availability, experience, and the support they offer to learners across the UK.",
    focus:
      "Online tutoring profiles should be clear about lesson format, safeguarding arrangements, communication boundaries, online safety, and how progress is shared.",
    expectation: honestExpectation
  },
  {
    path: "/advertise-tuition-services",
    title: "Advertise Tuition Services UK | TuitionList",
    description:
      "Advertise tuition services on TuitionList, a free UK tutor directory for tutors, teachers, and tuition providers.",
    h1: "Advertise tuition services",
    intro:
      "TuitionList supports independent tutors, teachers, tuition centres, and tuition providers who want to be visible to families searching for tuition support.",
    focus:
      "Use your profile to describe your tuition service, subjects, levels, location, online availability, rates, experience, and any relevant checks or evidence.",
    expectation: honestExpectation
  },
  {
    path: "/free-tutor-advertising",
    title: "Free Tutor Advertising UK | TuitionList",
    description:
      "Create a free tutor advert on TuitionList and promote your tutoring services without commission or subscription charges.",
    h1: "Free tutor advertising UK",
    intro:
      "TuitionList provides free tutor advertising through searchable tutor profiles for independent tutors and tuition providers across the UK.",
    focus: freePositioning,
    expectation: honestExpectation
  },
  {
    path: "/free-tutor-listing",
    title: "Free Tutor Listing | Create a Tutor Profile | TuitionList",
    description:
      "Create a free tutor listing on TuitionList and let parents, carers, and students send enquiries directly through your profile.",
    h1: "Create a free tutor listing",
    intro:
      "A TuitionList profile lets you list your tutoring services by subject, level, location, tuition type, and hourly rate.",
    focus:
      "Free listings are reviewed before publication. Once published, parents, carers, and students can send enquiries through your profile.",
    expectation: honestExpectation
  },
  {
    path: "/free-tutor-profile",
    title: "Free Tutor Profile UK | TuitionList",
    description:
      "Create a free tutor profile on TuitionList with your subjects, levels, location, online availability, rates, qualifications, and experience.",
    h1: "Create a free tutor profile",
    intro:
      "TuitionList helps tutors create a searchable profile that explains what they teach and how parents can contact them.",
    focus:
      "A useful tutor profile includes a clear bio, subjects taught, levels supported, hourly rates, location, online tuition availability, experience, qualifications, and contact preferences.",
    expectation: honestExpectation
  },
  {
    path: "/list-as-a-tutor-for-free",
    title: "List as a Tutor for Free | TuitionList",
    description:
      "List as a tutor for free on TuitionList and receive enquiries from parents, carers, and students without commission.",
    h1: "List as a tutor for free",
    intro:
      "Tutors, teachers, and tuition providers can create a free TuitionList profile and submit it for review before it goes live.",
    focus: freePositioning,
    expectation: honestExpectation
  },
  {
    path: "/promote-my-tutoring-services",
    title: "Promote My Tutoring Services | TuitionList",
    description:
      "Promote your tutoring services with a free TuitionList profile for local and online tutor searches across the UK.",
    h1: "Promote your tutoring services",
    intro:
      "TuitionList gives tutors a simple public profile they can use to explain their tutoring offer and receive enquiries directly.",
    focus:
      "Strong profiles are specific: name the subjects, levels, exam boards, learning needs, online or in-person options, rates, and the type of support you provide.",
    expectation: honestExpectation
  },
  {
    path: "/get-tutoring-students",
    title: "Get Tutoring Students Online | TuitionList",
    description:
      "Create a free TuitionList profile to help parents and students discover your tutoring services online.",
    h1: "Help parents find your tutoring services",
    intro:
      "Tutors often search for ways to get tutoring students or find tutoring clients. TuitionList helps by giving you a searchable directory profile.",
    focus:
      "Use your profile as one part of your wider marketing: keep it accurate, explain your teaching approach, and make it easy for families to send an enquiry.",
    expectation: honestExpectation
  },
  {
    path: "/find-tutoring-students",
    title: "Find Tutoring Students | TuitionList",
    description:
      "Create a free tutor profile to help parents, carers, and students find your private tutoring services.",
    h1: "Find tutoring students through your profile",
    intro:
      "TuitionList helps tutors stay visible online by listing searchable profiles for parents, carers, and students looking for tuition support.",
    focus:
      "Families can search by subject, level, location, tuition type, and rate, then send enquiries directly through published tutor profiles.",
    expectation: honestExpectation
  },
  {
    path: "/private-tutor-leads",
    title: "Private Tutor Leads UK | TuitionList",
    description:
      "Receive parent enquiries through a free TuitionList profile. No commission, no subscription, and no parent finder fees.",
    h1: "Private tutor enquiries",
    intro:
      "TuitionList sends parent enquiries through published tutor profiles. It is a directory, not a lead-selling agency or booking marketplace.",
    focus:
      "Enquiries are free for parents and tutors. TuitionList does not sell parent contact details or charge a commission on lessons.",
    expectation: honestExpectation
  },
  {
    path: "/tutor-leads-uk",
    title: "Tutor Leads UK | Free Tutor Enquiries | TuitionList",
    description:
      "Use TuitionList to receive direct parent enquiries through a free tutor profile, without lesson commission or subscription charges.",
    h1: "Tutor enquiries in the UK",
    intro:
      "TuitionList helps families send enquiries to independent tutors and tuition providers through public profile pages.",
    focus:
      "The platform records enquiries and can email tutors where email is configured. Tutors remain responsible for responding, arranging lessons, and agreeing fees directly.",
    expectation: honestExpectation
  },
  {
    path: "/online-tutor-leads",
    title: "Online Tutor Leads UK | TuitionList",
    description:
      "Create a free online tutor profile and receive enquiries from parents and students searching across the UK.",
    h1: "Online tutor enquiries",
    intro:
      "Online tutors can be found by families across the UK, not only in one local area. TuitionList lets you mark online tuition availability on your profile.",
    focus:
      "Profiles should explain online lesson format, subjects taught, levels supported, hourly rates, availability, and online safety arrangements.",
    expectation: honestExpectation
  },
  {
    path: "/how-to-get-more-tutoring-clients",
    title: "How to Get More Tutoring Clients | TuitionList",
    description:
      "Practical ideas for tutors looking to improve online visibility, write clearer profiles, and receive more relevant tutoring enquiries.",
    h1: "How to get more tutoring clients",
    intro:
      "Getting more tutoring clients usually depends on clear positioning, a strong profile, relevant experience, responsiveness, and trust signals that families can understand.",
    focus:
      "Use specific subject and level wording, explain your teaching approach, show your availability, keep rates clear, and add evidence or profile checks where appropriate.",
    expectation: honestExpectation
  },
  {
    path: "/how-to-advertise-tutoring-business",
    title: "How to Advertise a Tutoring Business | TuitionList",
    description:
      "A practical UK guide for tutors and tuition providers advertising tutoring services online.",
    h1: "How to advertise a tutoring business",
    intro:
      "A tutoring business can use a mix of website pages, local search, directory listings, referrals, social media, and clear parent-friendly profiles.",
    focus:
      "TuitionList can support this by giving your tuition business a searchable profile with subjects, levels, areas served, online availability, rates, and enquiry forms.",
    expectation: honestExpectation
  },
  {
    path: "/best-place-to-advertise-tutoring",
    title: "Best Place to Advertise Tutoring Services | TuitionList",
    description:
      "Compare tutor advertising options and learn how TuitionList provides a free UK tutor directory profile without commission.",
    h1: "Where to advertise tutoring services",
    intro:
      "The best place to advertise tutoring services depends on your subject, location, audience, budget, and whether you teach online, in-person, or both.",
    focus:
      "TuitionList is designed as a free directory profile option for tutors who want visibility without paying subscription fees or lesson commission.",
    expectation: honestExpectation
  },
  {
    path: "/where-to-advertise-as-a-tutor",
    title: "Where to Advertise as a Tutor | TuitionList",
    description:
      "Learn where private tutors can advertise online and how TuitionList offers a free tutor profile option in the UK.",
    h1: "Where to advertise as a tutor",
    intro:
      "Private tutors can advertise through their own website, search listings, social media, referrals, local groups, schools where appropriate, and tutor directories.",
    focus:
      "TuitionList adds a free tutor directory profile that parents can find by subject, level, location, online availability, and rate.",
    expectation: honestExpectation
  },
  {
    path: "/tutor-marketplace-uk",
    title: "Tutor Marketplace UK Alternative | TuitionList",
    description:
      "TuitionList is a free UK tutor directory, not a commission-based tutor marketplace or booking platform.",
    h1: "Tutor marketplace UK alternative",
    intro:
      "Some tutor marketplaces handle booking, payments, commissions, or platform messaging. TuitionList is simpler: it is a free UK tutor directory.",
    focus:
      "Parents contact tutors directly through enquiries. TuitionList does not process lesson payments, take commission, manage lessons, or become part of the tuition agreement.",
    expectation: honestExpectation
  },
  {
    path: "/tutor-platform-uk",
    title: "Tutor Platform UK | Free Tutor Directory | TuitionList",
    description:
      "TuitionList is a UK tutor platform for free tutor profiles and direct parent enquiries, without commission or subscription charges.",
    h1: "Tutor platform UK",
    intro:
      "TuitionList provides a simple platform for tutor discovery: tutors create profiles, admins review them, and families send enquiries directly.",
    focus:
      "The platform focuses on visibility and discovery rather than bookings, subscriptions, video lessons, parent accounts, or payment processing.",
    expectation: honestExpectation
  },
  {
    path: "/no-subscription-tutor-platform",
    title: "No Subscription Tutor Platform | TuitionList",
    description:
      "Create a tutor profile on TuitionList without subscription fees, parent finder fees, or lesson commission.",
    h1: "No subscription tutor platform",
    intro:
      "TuitionList is built around free basic tutor profiles and free parent enquiries, with no tutor subscription charge.",
    focus: freePositioning,
    expectation: honestExpectation
  },
  {
    path: "/superprof-alternative-for-tutors",
    title: "Free Alternative to Superprof for Tutors | TuitionList",
    description:
      "TuitionList is a free UK tutor directory where tutors can create profiles without commission or subscription charges.",
    h1: "Superprof alternative for tutors",
    intro:
      "Tutors comparing platforms may want a simple free directory profile. TuitionList lets tutors create a profile and receive enquiries directly.",
    focus:
      "TuitionList is not affiliated with Superprof. It is positioned as a free UK tutor directory with no lesson commission, no subscription charge, and no parent finder fee.",
    expectation: honestExpectation
  },
  {
    path: "/tutorful-alternative-for-tutors",
    title: "Free Alternative to Tutorful for Tutors | TuitionList",
    description:
      "Create a free TuitionList tutor profile as an alternative way to advertise tutoring services online.",
    h1: "Tutorful alternative for tutors",
    intro:
      "Tutors looking for alternatives to Tutorful can use TuitionList as a simple directory profile for local and online tutor discovery.",
    focus:
      "TuitionList is not affiliated with Tutorful. It does not process lesson payments, take commission, or manage lesson bookings.",
    expectation: honestExpectation
  },
  {
    path: "/tutor-hunt-alternative-for-tutors",
    title: "Free Alternative to Tutor Hunt for Tutors | TuitionList",
    description:
      "TuitionList lets tutors create a free profile and receive parent enquiries directly without commission.",
    h1: "Tutor Hunt alternative for tutors",
    intro:
      "TuitionList offers tutors a free directory profile that can help families discover their subjects, levels, location, and online availability.",
    focus:
      "TuitionList is not affiliated with Tutor Hunt. Profiles are free, enquiries are free, and lesson arrangements are agreed directly between families and tutors.",
    expectation: honestExpectation
  },
  {
    path: "/first-tutors-alternative-for-tutors",
    title: "First Tutors Alternative for Tutors | TuitionList",
    description:
      "List your tutor profile for free on TuitionList as a UK tutor directory alternative for independent tutors.",
    h1: "First Tutors alternative for tutors",
    intro:
      "Tutors looking for a First Tutors alternative can create a free TuitionList profile for parent and student discovery across the UK.",
    focus:
      "TuitionList is not affiliated with First Tutors. It is a free UK tutor directory with no lesson commission, no subscription charge, and no parent finder fee.",
    expectation: honestExpectation
  }
];

export const tutorGrowthSeoPages: SeoPage[] = tutorGrowthPageSeeds.map((page) => ({
  path: page.path,
  title: page.title,
  description: page.description,
  h1: page.h1,
  intro: page.intro,
  sections: [
    {
      heading: "Free tutor profile",
      body: page.focus
    },
    {
      heading: "No commission or subscription",
      body: freePositioning
    },
    {
      heading: "Clear expectations",
      body: page.expectation
    }
  ],
  faqs: tutorSignupFaqs,
  links: tutorGrowthLinks
}));
