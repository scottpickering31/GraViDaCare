import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";

export default function Reports() {
  return (
    <TabTemplate headingText="Reports" showProfileAvatar={true}>
      <LoadingSkeleton />
    </TabTemplate>
  );
}
