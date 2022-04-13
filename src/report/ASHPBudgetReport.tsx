import { Slider } from "@mui/material";
import { ASHPBudget } from "../budget";
import { formatter } from "../util";

export function ASHPBudgetReport(props: { budget: ASHPBudget }) {

    const { 
      budget,
    } = props;

    const marks = [
        {
            value: budget.total.totalIncVat.lower,
            label: formatter.format(budget.total.totalIncVat.lower),
        },
        {
            value: budget.total.totalIncVat.typical,
            label: formatter.format(budget.total.totalIncVat.typical),
          },
        {
          value: budget.total.totalIncVat.higher,
          label: formatter.format(budget.total.totalIncVat.higher),
        },
      ];

    return (
        <>
        <br/>
        <br/>
        <br/>
        <br/>
        <Slider disabled 
            max={budget.total.totalIncVat.higher} 
            defaultValue={budget.total.totalIncVat.typical} 
            min={budget.total.totalIncVat.lower} 
            aria-label="Total Cost Estimate" 
            getAriaValueText={formatter.format}
            valueLabelFormat={formatter.format}
            valueLabelDisplay="on"
            marks={marks}/>
    </>
    );

}