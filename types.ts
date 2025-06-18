
export enum EducationalLevel {
  PRIMARY = "Basisonderwijs",
  SECONDARY_VMBO = "Voortgezet Onderwijs (VMBO)",
  SECONDARY_HAVO_VWO = "Voortgezet Onderwijs (HAVO/VWO)",
  MBO = "Middelbaar Beroepsonderwijs (MBO)",
  HBO = "Hoger Beroepsonderwijs (HBO)",
  WO = "Wetenschappelijk Onderwijs (WO)",
  OTHER = "Anders",
}

export enum LearningContextType {
  MODULE = "Gehele Module / Cursusdeel",
  LESSON = "Losse Les / Enkele Les",
  ASSIGNMENT = "Specifieke Opdracht / Taak",
  PROJECT = "Project",
  OTHER = "Anders",
}

export interface FormData {
  level: EducationalLevel | string; // Using string to accommodate 'Anders' value directly
  customLevel?: string;
  originalObjective: string;
  contextType: LearningContextType | string; // Using string to accommodate 'Anders' value directly
  customContextType?: string;
  additionalDetails: string;
}

export interface ProcessedLearningObjective {
  id: string;
  text: string;
}

export interface GeminiServiceResponse {
  success: boolean;
  data?: string[];
  error?: string;
}

export interface ModuleWithOutcomes {
  moduleTitle: string;
  learningOutcomes: string[];
}

export interface OpenAIServiceResponse {
  success: boolean;
  data?: ModuleWithOutcomes[];
  error?: string;
}
