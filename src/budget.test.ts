import { asBreakdown, ASHPBudget, Breakdown, Cost, CostCategory, generateASHPBudget, RangePoint, VatPercent } from './budget';
import { Result } from './model';
test('generateASHPBudget produces correct budget data', () => {
  const expected =       {
    total: {
      totalIncVat: {
        lower: 10200, typical: 12000, higher :13800 
      },
      costCategory: CostCategory.mixed,
      totalExVat:null,
      vatPercent:null,
      vatAmount:null
    },
    unit:null,
    labour: null,
    otherMaterials: null,
    design: null,
    heatDistUpgrades: null,
    fabricEEUpgrades: null
  } as ASHPBudget;
  const result = {
    typicalTotalCost: 12000,
  } as Result;
  const budget = generateASHPBudget(result);
  expect(budget).toStrictEqual(expected);
});

// TODO - test for with/without VAT and vat amount
test('asBreakdown supplies breakdown for right range point', () => {
  const expected = {
    incVat: 10200,
    exVat: undefined,
    vatAmount: undefined,
    vatPercent: VatPercent.standard
  } as unknown as Breakdown;
  const cost = {
      totalIncVat: {
        lower: 10200, typical: 12000, higher :13800 
      },
      costCategory: CostCategory.mixed,
      totalExVat:null,
      vatPercent: VatPercent.standard,
      vatAmount:null
  } as Cost;

  expect(asBreakdown(cost, RangePoint.lower)).toStrictEqual(expected);
});
