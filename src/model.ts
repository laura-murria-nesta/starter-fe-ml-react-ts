export type InputParams = {
    isCombiBoiler: boolean,
    isHWCylinder: boolean,
    boilerControls: BoilerControls,
}

export enum BoilerControls {
    buttons = 'Buttons',
    oneDial = 'One Dial',
    multipleDials = 'Multiple Dials',
    unknown = 'Unknown',
    inaccessible = 'Inaccessible'
}

export type Result = {
    output: number,
}

export const predict = (input: InputParams): Result => {

    return {output: 99} as Result;
};


