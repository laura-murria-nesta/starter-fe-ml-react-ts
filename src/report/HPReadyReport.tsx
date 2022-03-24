import { Grid } from "@mui/material";
import { HPReadyAdvice } from "../adviseHPReady";

const adviceContent = [
    {
        adviceCode: 0,
        adviceHeading: 'No advice found',
        adviceDescription: 'Apologies we are unable to give specific advice based on the information you provided',
    },
    {
        adviceCode: 1,
        adviceHeading: 'Your advice',
        adviceDescription: 'This is the description of what we are advising you',
    },
    {
        adviceCode: 2,
        adviceHeading: 'Your advice',
        adviceDescription: 'This is the description of what we are advising you',
    },
    {
        adviceCode: 3,
        adviceHeading: 'Your advice',
        adviceDescription: 'This is the description of what we are advising you',
    },
]


export function HPReadyReport(props: { advice: HPReadyAdvice }) {
    const adviceText = adviceContent.filter((item) => item.adviceCode === props.advice.adviceCode)[0];
    // TODO - handle code not found
    return (
        <Grid>
            <h2>{adviceText.adviceHeading}</h2>
            <p>{adviceText.adviceDescription}</p>
        </Grid>
    );
}
