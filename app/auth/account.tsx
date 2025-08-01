import Logout from "@/app/auth/logout";
import TabTemplate from "@/components/ui/tabs/tabTemplate";
import React from "react";

export default function Account() {
  return (
    <TabTemplate headingText="Account" accountPage={true}>
      <Logout width="50%" />
    </TabTemplate>
  );
}
