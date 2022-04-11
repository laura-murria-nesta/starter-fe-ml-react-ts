import { useState } from "react";
import { Alert, Box, Button,StyledEngineProvider } from '@mui/material';

import {  EPC, ExistingHeatingInfo, PremiseAge, PremisesInfo, PremiseType, Region } from './data';
import { InputParams, predict } from './model';

import './App.css';
import './form.css';
import { ASHPBudget, generateASHPBudget } from "./budget";
import { ASHPBudgetReport } from "./report/ASHPBudgetReport";
import { PropertyInput, PropertyInputFormValues } from "./form/PropertyInput";
import { advise, HPReadyAdvice } from "./adviseHPReady";
import { HeatingSystemInput } from "./form/HeatingSystemInput";
import { HPReadyReport } from "./report/HPReadyReport";
import { HPTypicalQuote } from "./report/HPTypicalQuote";

export default function App() {

  const [ budget, setBudget ] = useState(null as ASHPBudget | null );
  const [ region, setRegion ] = useState(Region.Scotland);
  const [ premisesInfo, setPremisesInfo ] = useState({ floorArea: 0, numRooms: 0 , age: PremiseAge.Band1, type: PremiseType.SemiDetached } as PremisesInfo);
  const [ epc, setEPC ] = useState({ energyPerformance: { wall: 0, floor: 0, window: 0, mainHeating: 0, hotWater: 0 }} as EPC);
  const [ error, setError ] = useState(null as string | null);
  const [ existingHeatingInfo, setExistingHeatingInfo ] = useState({} as ExistingHeatingInfo);
  const [ HPReadyAdvice, setHPReadyAdvice ] = useState (null as HPReadyAdvice | null );

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

  const handleSubmitExistingHeatingInfo = (heatingInfo: ExistingHeatingInfo) => {
    try { 
      setExistingHeatingInfo(heatingInfo);
      const adviceCode = advise({ existingHeatingInfo } as InputParams);
      setHPReadyAdvice(adviceCode);
    } catch (error) {
      const errMess = `Unable to estimate heat pump costs for this property at this time: ${error}`;
      console.log(errMess);
      setError(errMess);
    }
  }

  const resetOutput = () => {
    setError(null);
    setBudget(null);
    setHPReadyAdvice(null);
  };

  const resetInput = () => {
    setError(null);
    setPremisesInfo({ floorArea: 0, numRooms: 0 , age: PremiseAge.Band1, type: PremiseType.SemiDetached } as PremisesInfo);
    setEPC({ energyPerformance: { wall: 0, floor: 0, window: 0, mainHeating: 0, hotWater: 0 }} as EPC);
    setExistingHeatingInfo({} as ExistingHeatingInfo);
    setRegion(Region.Scotland);
    resetOutput();
  };

  return ( 
    <StyledEngineProvider injectFirst>
      <Box sx={{ border: 3, margin: 1, padding: 5 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      <h2>How much might a Heat Pump cost me?</h2>
      {
      // If budget is not yet known, this is the start - collect input 
      (!budget)
        ?
        <PropertyInput region={region} premisesInfo={premisesInfo} epc={epc} onSubmit={handleSubmitPropertyInput} />
        : 
        <>
          {/* Once budget is present show report */}
          { (budget)
          ?
          <>
            <ASHPBudgetReport 
              budget={budget}
            />
           
          </>
          : <Alert severity="error">Could not display budget report for this input</Alert>}
          <Button onClick={()=> resetInput()}>Restart</Button>
          <Button onClick={()=> resetOutput()}>Recalculate</Button>
        </>
      }

      </Box>
      <Box sx={{ border: 3, margin: 1, padding: 5 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      <h2>Is my heating system Heat Pump ready?</h2>
      {
      // If advice is not yet known, this is the start - collect input 
      (!HPReadyAdvice)
        ?
        <HeatingSystemInput existingHeatingInfo={existingHeatingInfo} onSubmit={handleSubmitExistingHeatingInfo} />
        : 
        <>
          {/* Once advice is present show */}
          { (HPReadyAdvice)
          ?
            <HPReadyReport 
              advice={HPReadyAdvice}
            />
          : <Alert severity="error">Could not display budget report for this input</Alert>}
        </>
      }
      </Box>

      <Box sx={{ border: 3, margin: 1, padding: 5 }}>
      { (budget && <HPTypicalQuote budget={budget}></HPTypicalQuote> )}
      </Box>
    </StyledEngineProvider> 
  ); 
}







