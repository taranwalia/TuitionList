export type SeoExamBoard = {
  name: string;
  slug: string;
  category: "exam-board" | "igcse" | "11-plus" | "entrance-exam";
};

const examBoards: SeoExamBoard[] = [
  { name: "AQA", slug: "aqa", category: "exam-board" },
  { name: "Edexcel", slug: "edexcel", category: "exam-board" },
  { name: "Pearson Edexcel", slug: "pearson-edexcel", category: "exam-board" },
  { name: "OCR", slug: "ocr", category: "exam-board" },
  { name: "WJEC", slug: "wjec", category: "exam-board" },
  { name: "Eduqas", slug: "eduqas", category: "exam-board" },
  { name: "CCEA", slug: "ccea", category: "exam-board" },
  { name: "Cambridge International", slug: "cambridge-international", category: "exam-board" },
  { name: "Cambridge iGCSE", slug: "cambridge-igcse", category: "igcse" },
  { name: "Edexcel iGCSE", slug: "edexcel-igcse", category: "igcse" },
  { name: "GL Assessment", slug: "gl-assessment", category: "11-plus" },
  { name: "CEM", slug: "cem", category: "11-plus" },
  { name: "ISEB", slug: "iseb", category: "entrance-exam" },
  { name: "Kent Test", slug: "kent-test", category: "11-plus" },
  { name: "Medway Test", slug: "medway-test", category: "11-plus" },
  { name: "Bexley 11 Plus", slug: "bexley-11-plus", category: "11-plus" },
  { name: "Sutton 11 Plus", slug: "sutton-11-plus", category: "11-plus" },
  { name: "Tiffin 11 Plus", slug: "tiffin-11-plus", category: "11-plus" },
  { name: "St Olave's entrance exam", slug: "st-olaves-entrance-exam", category: "entrance-exam" },
  { name: "QE Boys entrance exam", slug: "qe-boys-entrance-exam", category: "entrance-exam" },
  { name: "Henrietta Barnett entrance exam", slug: "henrietta-barnett-entrance-exam", category: "entrance-exam" },
  { name: "Latymer entrance exam", slug: "latymer-entrance-exam", category: "entrance-exam" },
  { name: "Manchester Grammar entrance exam", slug: "manchester-grammar-entrance-exam", category: "entrance-exam" },
  { name: "Birmingham grammar school entrance", slug: "birmingham-grammar-school-entrance", category: "entrance-exam" },
  { name: "Warwickshire 11 Plus", slug: "warwickshire-11-plus", category: "11-plus" },
  { name: "Lincolnshire 11 Plus", slug: "lincolnshire-11-plus", category: "11-plus" },
  { name: "Buckinghamshire 11 Plus", slug: "buckinghamshire-11-plus", category: "11-plus" },
  { name: "Essex 11 Plus", slug: "essex-11-plus", category: "11-plus" },
  { name: "CSSE", slug: "csse", category: "11-plus" }
];

export const seoExamBoards = examBoards;

export function findSeoExamBoard(slug: string) {
  return seoExamBoards.find((board) => board.slug === slug);
}
