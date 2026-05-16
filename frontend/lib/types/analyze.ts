export interface SkillFile {
  fileName: string;
  content: string;
}

export interface AnalyzeResponse {
  files: SkillFile[];
  library: string;
  source: string;
  total: number;
}
