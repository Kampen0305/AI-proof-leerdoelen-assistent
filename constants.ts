
import { EducationalLevel, LearningContextType } from './types';

export const EDUCATIONAL_LEVELS_OPTIONS: { value: EducationalLevel | 'Anders'; label: string }[] = [
  { value: EducationalLevel.PRIMARY, label: "Basisonderwijs" },
  { value: EducationalLevel.SECONDARY_VMBO, label: "Voortgezet Onderwijs (VMBO)" },
  { value: EducationalLevel.SECONDARY_HAVO_VWO, label: "Voortgezet Onderwijs (HAVO/VWO)" },
  { value: EducationalLevel.MBO, label: "Middelbaar Beroepsonderwijs (MBO)" },
  { value: EducationalLevel.HBO, label: "Hoger Beroepsonderwijs (HBO)" },
  { value: EducationalLevel.WO, label: "Wetenschappelijk Onderwijs (WO)" },
  { value: EducationalLevel.OTHER, label: "Anders, namelijk..." },
];

export const LEARNING_CONTEXT_TYPE_OPTIONS: { value: LearningContextType | 'Anders'; label: string }[] = [
  { value: LearningContextType.MODULE, label: "Gehele Module / Cursusdeel" },
  { value: LearningContextType.LESSON, label: "Losse Les / Enkele Les" },
  { value: LearningContextType.ASSIGNMENT, label: "Specifieke Opdracht / Taak" },
  { value: LearningContextType.PROJECT, label: "Project" },
  { value: LearningContextType.OTHER, label: "Anders, namelijk..." },
];

export const DUTCH_SYSTEM_INSTRUCTION = `Je bent een expert in curriculumontwerp en onderwijstechnologie, gespecialiseerd in het integreren van AI-tools in het leerproces. Je taak is om traditionele leerdoelen om te vormen tot "AI-proof" versies. Dit betekent dat studenten nog steeds de kerncompetenties moeten behalen, maar worden verwacht en aangemoedigd om AI-tools (zoals grote taalmodellen, AI-onderzoeksassistenten, AI-gestuurde creatietools, enz.) te gebruiken in hun leerproces. De herziene doelstellingen moeten kritisch denken over AI, ethisch gebruik van AI en de toepassing van AI om het leren en de productiviteit te verbeteren bevorderen, in plaats van AI simpelweg te gebruiken om het leren te omzeilen.`;

export const DUTCH_USER_PROMPT_TEMPLATE = (
  level: string,
  originalObjective: string,
  contextType: string,
  additionalDetails: string
): string => `
Gegeven de volgende onderwijscontext en het originele leerdoel, genereer 3 tot 5 onderscheidende, "AI-proof" versies van het leerdoel. Focus op hoe studenten AI kunnen gebruiken als een hulpmiddel voor dieper begrip, kritische analyse, creatie of probleemoplossing, terwijl ze de onderliggende concepten nog steeds beheersen.

Onderwijsniveau: ${level}
Origineel Leerdoel/Leeruitkomst: ${originalObjective}
Context (bijv. module, losse les, opdracht, project): ${contextType}
Aanvullende Details: ${additionalDetails || "Geen aanvullende details verstrekt."}

Zorg ervoor dat elk herzien leerdoel:
1. Duidelijk en specifiek is.
2. Meetbaar of observeerbaar is.
3. De actieve rol van de student in het leren benadrukt, zelfs met AI-assistentie.
4. De oorspronkelijke kernleerintentie behoudt.

Retourneer de herziene leerdoelen als een JSON-array van strings. Bijvoorbeeld: ["Herzien leerdoel 1...", "Herzien leerdoel 2...", "Herzien leerdoel 3..."]
Voeg geen andere tekst of uitleg toe buiten de JSON-array. Zorg ervoor dat de output valide JSON is.
`;
