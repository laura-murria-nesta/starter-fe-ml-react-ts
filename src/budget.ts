import { Result } from "./model";

export type Cost = {
    totalIncVat: CostRange,
    totalExVat: CostRange | null,
    vatPercent: VatPercent | null,
    vatAmount: CostRange | null,
    costCategory: CostCategory,
}

export type CostRange = {
  lower: number,
  higher: number,
  typical: number,
}

export type Breakdown = {
    incVat: number,
    exVat: number,
    vatAmount: number,
    vatPercent: VatPercent,
}

export enum RangePoint {
    lower,
    higher,
    typical,
}

export enum CostCategory {
    labour,
    materials,
    mixed,
}

export enum VatPercent {
    standard = 20,
    reduced = 5,
    zero = 0,
}

export type ASHPBudget = {
    total: Cost,
    unit: Cost | null,
    labour: Cost | null,
    otherMaterials: Cost | null,
    design: Cost | null,
    heatDistUpgrades: Cost | null,
    fabricEEUpgrades: Cost | null,
}

export const asRange = (figure: number): CostRange => {
    const calcLower = (f: number) => f * 0.85 ;
    const calcHigher = (f: number) => f * 1.15;
    const cost = {
        lower: calcLower(figure),
        typical: figure,
        higher: calcHigher(figure),
    } as CostRange;
    return cost;
}

export const asBreakdown = (cost: Cost, point: RangePoint): Breakdown => {
    switch (point) {
        case (RangePoint.higher): 
            return { 
                exVat: cost.totalExVat?.higher, 
                incVat: cost.totalIncVat?.higher,
                vatAmount: cost.vatAmount?.higher,
                vatPercent: cost.vatPercent 
            } as Breakdown;
        case (RangePoint.typical): 
            return { 
                exVat: cost.totalExVat?.typical, 
                incVat: cost.totalIncVat?.typical,
                vatAmount: cost.vatAmount?.typical,
                vatPercent: cost.vatPercent 
            } as Breakdown;
        case (RangePoint.lower): 
            return { 
                exVat: cost.totalExVat?.lower, 
                incVat: cost.totalIncVat?.lower,
                vatAmount: cost.vatAmount?.lower,
                vatPercent: cost.vatPercent 
            } as Breakdown;
        default:
            return { 
                exVat: cost.totalExVat?.typical, 
                incVat: cost.totalIncVat?.typical,
                vatAmount: cost.vatAmount?.typical,
                vatPercent: cost.vatPercent 
            } as Breakdown;
    }
}

export const asCost = 
    (figure: number, vatPercent: VatPercent, inputInclusive: boolean, costCategory: CostCategory): Cost => {
    const totalIncVat = inputInclusive ? asRange(figure) : asRange(addVat(figure, vatPercent));
    const totalExVat = inputInclusive ? asRange(removeVat(figure, vatPercent)) : asRange(figure);
    const vatAmount = asRange(getVatAmount(figure, vatPercent, inputInclusive));
    return  {
        totalIncVat,
        totalExVat,
        vatPercent,
        vatAmount,
        costCategory,
    } as Cost;
}
export const addVat = (figure: number, rate: VatPercent) => {
    return figure*(1+(rate/100));
}
export const removeVat = (figure: number, rate: VatPercent) => {
    return (figure/(100+rate));
}
export const getVatAmount = (figure: number, rate: VatPercent, inputInclusive: boolean) => {
    if (inputInclusive) {
        return (figure*(rate/100))
    } else {
        return figure - removeVat(figure, rate);
    }
}

export const generateASHPBudget = (prediction: Result): ASHPBudget => {

    const total: Cost = {
        totalIncVat: asRange(prediction.typicalTotalCost),
        costCategory: CostCategory.mixed,
        totalExVat: null,
        vatPercent: null,
        vatAmount: null
    }
    const unit: Cost | null = prediction.typicalHPUnitCost ? 
       {
            totalIncVat: asRange(prediction.typicalHPUnitCost),
            costCategory: CostCategory.materials,
            totalExVat: asRange(removeVat(prediction.typicalHPUnitCost!, VatPercent.standard)),
            vatPercent: VatPercent.standard,
            vatAmount: asRange(getVatAmount(prediction.typicalHPUnitCost, VatPercent.standard, true)),
        } 
        : null;

    const budget = {
        total,
        unit,
        labour: asCost(2000, VatPercent.standard, true, CostCategory.labour),
        otherMaterials: asCost(1500, VatPercent.standard, true, CostCategory.labour),
        design: asCost(700, VatPercent.standard, true, CostCategory.labour),
        heatDistUpgrades: null,
        fabricEEUpgrades: null,
    } as ASHPBudget;
    return budget;
};