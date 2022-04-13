export type ExistingHeatingInfo = {
    isGasBoiler: string
    isCombiBoiler: string,
    isHWCylinder: string,
    boilerControls: BoilerControls,
    isRadiators: string,
    typicalRadiatorType: RadiatorType,
}

export enum EPCEnergyPerfRating {
   ' ' = 0,
   'very good'  = 5,
   'good' = 4,
   'average' = 3,
   'poor' = 2,
   'very poor' = 1,
   'N/A' = 6,
}

export type PropertyFeaturesEnergyPerformance = {
    wall: EPCEnergyPerfRating,
    roof: EPCEnergyPerfRating,
    window: EPCEnergyPerfRating,
    floor: EPCEnergyPerfRating | null,
    hotWater:  EPCEnergyPerfRating| null,
    mainHeating: EPCEnergyPerfRating | null,
    mainHeatingControl: EPCEnergyPerfRating | null,
    secondaryHeating: EPCEnergyPerfRating | null,
}

export type EPC = {
    id: number
    energyPerformance: PropertyFeaturesEnergyPerformance,
}

export enum RadiatorType {
    singlePanel = 'Single Panel',
    doublePanel = 'Double Panel',
    doubleWithFins = 'Double With Fins',
    k1 = 'K1',
    k2 = 'K2',
    k3 = 'K3',
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

export enum Region {
    Scotland = 'Scotland',
    Wales = 'Wales',
    NorthernEngland = 'Northern England',
    Midlands = 'Midlands',
    SouthernEngland = 'Southern England',
}