import TabTemplate from "@/components/ui/tabs/tabTemplate";
import LoadingSkeleton from "@/components/ui/loading/LoadingSkeleton";
import React from "react";

export default function Insights() {
  return (
    <TabTemplate headingText="Insights" showProfileAvatar={true}>
            <LoadingSkeleton />
    </TabTemplate>
  );
}
