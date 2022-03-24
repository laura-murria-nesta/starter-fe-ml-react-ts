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

const nextSteps = [
    {
        nextStepsCode: 1,
        linkText: 'Could I get a loan?',
        linkUrl: 'www.nesta.org.uk/hp-loans'
    },
    {
        nextStepsCode: 2,
        linkText: 'What grants or subsidies are available?',
        linkUrl: 'www.nesta.org.uk/subsidies'
    },
    {
        nextStepsCode: 3,
        linkText: 'Energy efficiency schemes: Find out more',
        linkUrl: 'www.est.org.uk'
    },
]

const activismActions = [
    {
        nextStepsCode: 1,
        linkText: 'Email my MP',
        linkUrl: 'www.gov.uk'
    },
    {
        nextStepsCode: 2,
        linkText: 'Sign a petition',
        linkUrl: 'www.change.org.uk'
    },
    {
        nextStepsCode: 3,
        linkText: 'Share on social media',
        linkUrl: 'www.twitter.com'
    },
]


export function HPReadyReport(props: { advice: HPReadyAdvice }) {
    const adviceText = adviceContent.filter((item) => item.adviceCode === props.advice.adviceCode)[0];
    const nextStepsLinks = nextSteps.filter((item) => props.advice.nextSteps.includes(item.nextStepsCode))
    const activismLinks = activismActions.filter((item) => props.advice.nextSteps.includes(item.nextStepsCode))
    // TODO - handle code not found
    return (
        <Grid>
            <h2>{adviceText.adviceHeading}</h2>
            <p>{adviceText.adviceDescription}</p>
            <div>
            <h2>Next steps</h2>
            {nextStepsLinks.map((i) => (
                <div key={`next-steps-${i}`}>
                    <a href={i.linkUrl}>{i.linkText}</a>
                </div>
            ))}
            <h2>Get involved</h2>
            {activismLinks.map((j) => (
                <div key={`activism-${j}`}>
                    <a href={j.linkUrl}>{j.linkText}</a>
                </div>
            ))}
            </div>
        </Grid>
    );
}
