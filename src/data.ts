export type ExistingHeatingInfo = {
    isGasBoiler: string
    isCombiBoiler: string,
    isHWCylinder: string,
    boilerControls: BoilerControls,
    isRadiators: string,
    typicalRadiatorType: RadiatorType,
}

export type Lookup = {
    key: string,
    value: number,
    label: string,
}
export const EPCEnergyPerfRatings: Lookup[] =  [
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
    floor?: string,
    hotWater?:  string,
    mainHeating?: string,
    mainHeatingControl?: string,
    secondaryHeating?: string,
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
    
export const PremiseTypes: Lookup[] = [
    { key: 'Detached', value: 1, label: "Detached" },
    { key: 'SemiDetached', value: 1, label: "Semi-Detached"},
    { key: 'MidTerraced', value: 1, label: "Mid-Terraced"},
    { key: 'EndTerraced', value: 1, label: "End-Terraced"},
    { key: 'Bungalow', value: 1, label: "Bungalow"},
    { key: 'Flat', value: 1, label: "Flat"},
]
   
export const PremiseAges: Lookup[] =  [
    { key: 'Not set', value: 0, label: '--Please select --' },
    { key: 'Pre 1930', value: 1, label: 'Pre 1930' },
    { key: '1930-1965', value: 2, label: '1930-1965' },
    { key: '1966-1983', value: 3, label: '1966-1983' },
    { key: 'Post 1983', value: 4, label: 'Post 1983' },
]
    
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

export const Regions = [
 'Scotland', 
 'North East', 
 'Yorkshire and The Humber',
 'North West', 
 'Wales',
 'West Midlands', 
 'East Midlands',
 'East of England',
 'London', 
 'South East', 
 'South West',
]