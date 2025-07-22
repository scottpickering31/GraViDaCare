// ControlledField.tsx
import { ControlledDatePicker } from "@/components/inputs/controlledDatePicker";
import { ControlledMultiSelect } from "@/components/inputs/controlledMultiSelect";
import { ControlledNumber } from "@/components/inputs/controlledNumber";
import { ControlledSelect } from "@/components/inputs/controlledSelect";
import { ControlledText } from "@/components/inputs/controlledText";
import { PatientProfileStep } from "@/constants/modals/patientProfileModal";

type Props = {
  step: PatientProfileStep;
  dropdownVisible: boolean;
  setDropdownVisible: (visible: boolean) => void;
};

export function ControlledField({
  step,
  dropdownVisible,
  setDropdownVisible,
}: Props) {
  switch (step.type) {
    case "text":
      return <ControlledText name={step.name} label={step.title} />;
    case "number":
      return <ControlledNumber name={step.name} label={step.title} />;
    case "date":
      return <ControlledDatePicker name={step.name} label={step.title} />;
    case "selector":
      return (
        <ControlledSelect
          name={step.name}
          label={step.title}
          options={step.options}
          dropdownVisible={dropdownVisible}
          setDropdownVisible={setDropdownVisible}
        />
      );
    case "multi-select":
      return (
        <ControlledMultiSelect
          name={step.name}
          label={step.title}
          options={[...step.options]}
        />
      );
    default:
      return null;
  }
}
