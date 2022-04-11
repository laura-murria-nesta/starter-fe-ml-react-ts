import { EPC, ExistingHeatingInfo, PremisesInfo } from "./data";

export type InputParams = {
    existingHeatingInfo: ExistingHeatingInfo,
    premisesInfo: PremisesInfo,
    epc: EPC | null,
}

export type HPReadyAdvice = {
    adviceCode: number,
    nextSteps: number[],
    activismActions: number[],
}

export const advise = (input: InputParams): HPReadyAdvice => {
    return { 
        nextSteps: [1,2,3],
        adviceCode: 1,
        activismActions: [ 2,3 ]
    } as HPReadyAdvice;
};