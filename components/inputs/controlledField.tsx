import { ControlledDatePicker } from "@/components/inputs/controlledDatePicker";
import { ControlledMultiSelect } from "@/components/inputs/controlledMultiSelect";
import { ControlledNumber } from "@/components/inputs/controlledNumber";
import { ControlledSelect } from "@/components/inputs/controlledSelect";
import { ControlledText } from "@/components/inputs/controlledText";
import { PatientProfileStep } from "@/constants/modals/patientProfileModal";
import { FieldPath, FieldValues } from "react-hook-form";

export function ControlledField<T extends FieldValues>({
  step,
  onFieldFocusChange,
}: {
  step: PatientProfileStep;
  onFieldFocusChange?: (focused: boolean) => void;
}) {
  const name = step.name as FieldPath<T>;

  const sharedProps = { onFieldFocusChange };

  switch (step.type) {
    case "text":
      return (
        <ControlledText<T>
          name={name}
          label={step.placeholder}
          {...sharedProps}
        />
      );
    case "number":
      return (
        <ControlledNumber<T>
          name={name}
          label={step.placeholder}
          {...sharedProps}
        />
      );
    case "date":
      return (
        <ControlledDatePicker<T>
          name={name}
          label={step.placeholder}
          {...sharedProps}
        />
      );
    case "selector":
      return (
        <ControlledSelect<T>
          name={name}
          label={step.placeholder}
          options={step.options}
          {...sharedProps}
        />
      );
    case "multi-select":
      return (
        <ControlledMultiSelect<T>
          name={name}
          label={step.placeholder}
          options={[...step.options]}
          key={step.name}
          {...sharedProps}
        />
      );
    default:
      return null;
  }
}
