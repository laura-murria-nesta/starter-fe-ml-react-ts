import { EPC, ExistingHeatingInfo, PremisesInfo } from "./data";

export type InputParams = {
    existingHeatingInfo: ExistingHeatingInfo,
    premisesInfo: PremisesInfo,
    EPC: EPC | null,
}

export type HPReadyAdvice = {
    adviceCode: number,
}

export const advise = (input: InputParams): HPReadyAdvice => {
    return {adviceCode: 1} as HPReadyAdvice;
};