export type InputParams = {
    radio1: string,
    dropdown1: string,
    value1: number,
}

export type Result = {
    output: number,
}

export const predict = (input: InputParams): Result => {

    return {output: 99} as Result;
};
