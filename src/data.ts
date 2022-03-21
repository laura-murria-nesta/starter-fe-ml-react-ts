export type ExistingHeatingInfo = {
    isCombiBoiler: string,
    isHWCylinder: string,
    boilerControls: BoilerControls,
}

export type EPC = {
    id: number
}

export enum BoilerControls {
    buttons = 'Buttons',
    oneDial = 'One Dial',
    multipleDials = 'Multiple Dials',
    unknown = 'Unknown',
    inaccessible = 'Inaccessible'
}

export enum NumRooms {
    small = '1-2 rooms',
    medium = '3-4 rooms',
    large = '5-6 rooms',
    huge = '7-9 rooms',
    palatial = '10+ rooms'
    }
    
export enum PremiseType {
    Detached = "Detached",
    SemiDetached = "Semi-Detached",
    MidTerraced = "Mid-Terraced",
    EndTerraced = "End-Terraced",
    Bungalow = "Bungalow",
    Flat = "Flat",
}
    
export enum PremiseAge {
    Band1 = 'Pre 1900',
    Band2 = '1900-1950',
    Band3 = '1950-1975',
    Band4 = '1976-1990',
    Band5 = 'Post 1990',
}
    
export type PremisesInfo = {
    type: string,
    age: string,
    numRooms: number,
    floorArea: number | null,
}

export type Address = {
    id: number | null,
    address1: string,
    address2: string,
    city: string,
    postcode: string,
}

export type Customer = {
    id: number | null,
    firstName: string,
    lastName : string,
    email: string,
}

export type Property = {
    id: number | null;
    address: Address | null,
    premisesInfo: PremisesInfo | null,
    existingHeatingInfo: ExistingHeatingInfo | null,
    epc: EPC | null,
    owner: Customer | null,
    mpan: string | null,
}