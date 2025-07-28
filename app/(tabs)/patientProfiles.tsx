import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";

export default function PatientProfiles() {
  return (
    <TabTemplate headingText="PatientProfiles" showProfileAvatar={true}>
      <LoadingSkeleton />
    </TabTemplate>
  );
}
