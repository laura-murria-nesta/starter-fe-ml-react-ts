import { Slider } from "@mui/material";
import { ASHPBudget } from "./budget";

export function ASHPBudgetReport(props: { budget: ASHPBudget }) {

    const { 
      budget,
    } = props;

    return (
        <>
        <div>
            {JSON.stringify(budget)}
        </div>
        <Slider disabled defaultValue={budget.total.totalIncVat.typical} aria-label="Total Cost Estimate" />
    </>
    );

}