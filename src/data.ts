export type ExistingHeatingInfo = {
    isGasBoiler: string
    isCombiBoiler: string,
    isHWCylinder: string,
    boilerControls: BoilerControls,
    isRadiators: string,
    typicalRadiatorType: RadiatorType,
}

export type EPCEnergyPerfRating = {
    key: string,
    value: number,
    label: string,
}
export const EPCEnergyPerfRatings: EPCEnergyPerfRating[] =  [
    { key: 'NOT_SET', value: 0, label: '--Please select --' },
    { key: 'VERY_POOR', value: 1, label: 'Very Poor' },
    { key: 'POOR', value: 2, label: 'Poor' },
    { key: 'AVERAGE', value: 3, label: 'Average' },
    { key: 'GOOD', value: 4, label: 'Good' },
    { key: 'VERY_GOOD', value: 5, label: 'Very Good' },
    { key: 'N_A', value: 6, label: 'N/A' },
]

export type PropertyFeaturesEnergyPerformance = {
    wall: string,
    roof: string,
    window: string,
    floor?: EPCEnergyPerfRating,
    hotWater?:  EPCEnergyPerfRating,
    mainHeating?: EPCEnergyPerfRating,
    mainHeatingControl?: EPCEnergyPerfRating,
    secondaryHeating?: EPCEnergyPerfRating,
}

// null id indicates customer provided values not formal EPC values
export type EPC = {
    id: number | null
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