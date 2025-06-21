import { useState } from "react";
import { Box, Tab, Tabs } from "@mui/material";
import CustomSignInPage from "./UserLogin";
import AgentLogin from "./AgentLogin";

export default function TabForm() {
  const [tabIndex, setTabIndex] = useState(0);

  const tabItems = [
    { label: "User Login", component: <CustomSignInPage /> },
    { label: "Agent Login", component: <AgentLogin /> },

  ];

  return (
    <Box>
      <Tabs
        value={tabIndex}
        onChange={(_, newValue) => setTabIndex(newValue)}
        variant="scrollable"
        scrollButtons="auto"
      >
        {tabItems.map((tab, index) => (
          <Tab key={index} label={tab.label} />
        ))}
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {tabItems[tabIndex]?.component}
      </Box>
    </Box>
  );
}
