import {
  Accordion as MuiAccordion,
  AccordionDetails,
  AccordionSummary,
} from "@mui/material";

export function Accordion(props: any) {
  return (
    <MuiAccordion className="bg-slate-100">
      <AccordionSummary>{props.title}</AccordionSummary>
      <AccordionDetails className="grid gap-2">{props.children}</AccordionDetails>
    </MuiAccordion>
  );
}
