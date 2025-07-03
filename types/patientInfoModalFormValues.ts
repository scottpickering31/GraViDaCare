import { fullWizardSchema } from "@/constants/modals/introModal";
import { z } from "zod";

export type patientInfoModalFormValues = z.infer<typeof fullWizardSchema>;
