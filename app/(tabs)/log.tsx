import React from "react";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";

export default function Log() {
  return (
    <TabTemplate headingText="Log" showProfileAvatar={true}>
          <LoadingSkeleton />
  </TabTemplate>
  );
}
