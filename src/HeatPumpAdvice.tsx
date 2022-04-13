import { useState } from "react";
import { Alert, Box, Button, Grid } from '@mui/material';

import {  EPC, EPCEnergyPerfRatings, ExistingHeatingInfo, PremiseAges, PremisesInfo, PremiseTypes, } from './data';
import { InputParams, predict } from './model';


import { ASHPBudget, generateASHPBudget } from "./budget";
import { ASHPBudgetReport } from "./report/ASHPBudgetReport";
import { PropertyInput, PropertyInputFormValues } from "./form/PropertyInput";

export default function App() {

  const noRatingSet =  EPCEnergyPerfRatings.find(element => element.key === 'NOT_SET')?.value.toString();

  const [ budget, setBudget ] = useState(null as ASHPBudget | null );
  const [ region, setRegion ] = useState('Scotland');
  const [ premisesInfo, setPremisesInfo ] = useState({ floorArea: 0, numRooms: 0 , age: PremiseAges[0]?.key, type: PremiseTypes[0]?.key } as PremisesInfo);
  const [ epc, setEPC ] = useState({ id: null, energyPerformance: { wall: noRatingSet,  window: noRatingSet, roof: noRatingSet }} as EPC);
  const [ error, setError ] = useState(null as string | null);
  const [ existingHeatingInfo, setExistingHeatingInfo ] = useState({} as ExistingHeatingInfo);
  // const [ HPReadyAdvice, setHPReadyAdvice ] = useState (null as HPReadyAdvice | null );

  const handleSubmitPropertyInput = (propertyInput: PropertyInputFormValues) => {
    try { 
      console.log(`Handling propertyInput: ${JSON.stringify(propertyInput)}`);
      setPremisesInfo(propertyInput.premisesInfo);
      setEPC(propertyInput.epc)
      setRegion(propertyInput.region)
      const result = predict({ ...propertyInput, existingHeatingInfo } as InputParams);
      const budget = generateASHPBudget(result);
      setBudget(budget);
    } catch (error) {
      const errMess = `Unable to estimate heat pump costs for this property at this time: ${error}`;
      console.log(errMess);
      setError(errMess);
    }
  }

  // const handleSubmitExistingHeatingInfo = (heatingInfo: ExistingHeatingInfo) => {
  //   try { 
  //     setExistingHeatingInfo(heatingInfo);
  //     const adviceCode = advise({ existingHeatingInfo } as InputParams);
  //     setHPReadyAdvice(adviceCode);
  //   } catch (error) {
  //     const errMess = `Unable to estimate heat pump costs for this property at this time: ${error}`;
  //     console.log(errMess);
  //     setError(errMess);
  //   }
  // }

  const resetOutput = () => {
    setError(null);
    setBudget(null);
    // setHPReadyAdvice(null);
  };

  const resetInput = () => {
    
    setError(null);
    setPremisesInfo({ floorArea: 0, numRooms: 0 , age: PremiseAges[0]?.key, type: PremiseTypes[0]?.key } as PremisesInfo);
    setEPC({ 
      id: null, 
      energyPerformance: { 
        wall: noRatingSet,
        roof: noRatingSet, 
        window: noRatingSet
      } } as EPC);
    setExistingHeatingInfo({} as ExistingHeatingInfo);
    setRegion('Scotland');
    resetOutput();
  };

  return (
    <>
      <Box sx={{ border: 3, margin: 1, padding: 5 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      <h2>How much might a Heat Pump cost me?</h2>
      {
      // If budget is not yet known, this is the start - collect input 
      (!budget)
        ?
        <PropertyInput region={region} premisesInfo={premisesInfo} epc={epc} onSubmit={handleSubmitPropertyInput} />
        : 
        <Grid container spacing={2}  >
          {/* Once budget is present show report */}
          <Grid item xs={12}>
          { (budget)
          ?

            <ASHPBudgetReport 
              budget={budget}
            />
          : <Alert severity="error">Could not display budget report for this input</Alert>}
          </Grid>
          <Grid item xs={6}>
          <Button variant="contained" color="primary"  onClick={()=> resetInput()}>Restart</Button>
          </Grid>
          <Grid item xs={6}>
          <Button variant="contained" color="primary"  onClick={()=> resetOutput()}>Recalculate</Button>
          </Grid>
        </Grid>
      }
      </Box>

      {/* <Box sx={{ border: 3, margin: 1, padding: 5 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      <h2>Is my heating system Heat Pump ready?</h2>
      {
      // If advice is not yet known, this is the start - collect input 
      (!HPReadyAdvice)
        ?
        <HeatingSystemInput existingHeatingInfo={existingHeatingInfo} onSubmit={handleSubmitExistingHeatingInfo} />
        : 
        <>
      
          { (HPReadyAdvice)
          ?
            <HPReadyReport 
              advice={HPReadyAdvice}
            />
          : <Alert severity="error">Could not display budget report for this input</Alert>}
        </>
      }
      </Box> */}

      {/* // <Box sx={{ border: 3, margin: 1, padding: 5 }}>
      // { (budget && <HPTypicalQuote budget={budget}></HPTypicalQuote> )}
      // </Box> */}
      </>
  ); 
}







