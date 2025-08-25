import { useState } from "react";
import AgentHome from "./AgentHome";
import ResquestsPage from "./AgentGetRequest";
import { Box, Tab, Tabs } from "@mui/material";

export default function AgnetTab(){
  const [tabIndex, setTabIndex] = useState(0);
       const tabs = [
           {
           label:"Add Service",
           component: <AgentHome />,
       },
       {
           label: "Request Service",
           component: <ResquestsPage />,
       }]
        return (
           <Box sx={{ mt: -3 }}>
             <Tabs
               value={tabIndex}
               onChange={(_, newValue) => setTabIndex(newValue)}
               variant="scrollable"
               scrollButtons="auto"
             >
               {tabs.map((tab, index) => (
                 <Tab key={index} label={tab.label} />
               ))}
             </Tabs>
       
             <Box sx={{ mt: 2 }}>
               {tabs[tabIndex]?.component}
             </Box>
           </Box>
         );
}