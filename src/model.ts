import { EPC, ExistingHeatingInfo, PremisesInfo } from "./data";

export type InputParams = {
    existingHeatingInfo: ExistingHeatingInfo,
    premisesInfo: PremisesInfo,
    epc: EPC | null,
}

export type Result = {
    typicalHPUnitCost: number | null,
    typicalTotalCost: number,
    typicalHPUnitCapacity: number | null,
}

export const predict = (input: InputParams): Result => {
    return {typicalTotalCost: 10000} as Result;
};


