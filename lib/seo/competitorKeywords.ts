export type CompetitorKeywordCluster = {
  path: string;
  name: string;
  keywords: string[];
};

export const competitorKeywordClusters: CompetitorKeywordCluster[] = [
  {
    path: "/first-tutors-alternative",
    name: "First Tutors",
    keywords: [
      "First Tutors alternative",
      "First Tutors replacement",
      "websites like First Tutors",
      "free alternative to First Tutors",
      "First Tutors closed alternative",
      "where to list after First Tutors",
      "best First Tutors alternative UK"
    ]
  },
  {
    path: "/superprof-alternative",
    name: "Superprof",
    keywords: ["Superprof alternative", "websites like Superprof", "free alternative to Superprof", "Superprof vs TuitionList", "Superprof competitor UK"]
  },
  {
    path: "/tutorful-alternative",
    name: "Tutorful",
    keywords: ["Tutorful alternative", "websites like Tutorful", "free alternative to Tutorful", "Tutorful vs TuitionList", "Tutorful competitor UK"]
  },
  {
    path: "/mytutor-alternative",
    name: "MyTutor",
    keywords: ["MyTutor alternative", "websites like MyTutor", "free alternative to MyTutor", "MyTutor vs TuitionList", "MyTutor competitor UK"]
  },
  {
    path: "/tutorhunt-alternative",
    name: "Tutor Hunt",
    keywords: ["Tutor Hunt alternative", "TutorHunt alternative", "websites like Tutor Hunt", "free alternative to Tutor Hunt", "Tutor Hunt vs TuitionList"]
  },
  {
    path: "/tutorperch-alternative",
    name: "Tutorperch",
    keywords: ["Tutorperch alternative", "websites like Tutorperch", "Tutorperch vs TuitionList"]
  },
  {
    path: "/best-tutor-websites-uk",
    name: "Tutor websites",
    keywords: [
      "best tutor websites UK",
      "best tutoring platforms UK",
      "best tutor directories UK",
      "free tutor platforms UK",
      "free tutor websites UK",
      "UK tutor marketplace",
      "UK tutor directory",
      "private tutor directory UK"
    ]
  }
];

export function findCompetitorKeywordCluster(path: string) {
  return competitorKeywordClusters.find((cluster) => cluster.path === path);
}
