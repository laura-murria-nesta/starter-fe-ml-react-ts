export type InputParams = {
    isCombiBoiler: boolean,
    isHWCylinder: boolean,
    dropdown1: string,
    value1: number,
}

export type Result = {
    output: number,
}

export const predict = (input: InputParams): Result => {

    return {output: 99} as Result;
};


