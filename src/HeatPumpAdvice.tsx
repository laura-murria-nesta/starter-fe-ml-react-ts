import { useState } from "react";
import { Alert, Box, Button,StyledEngineProvider } from '@mui/material';

import {  ExistingHeatingInfo, PremisesInfo } from './data';
import { InputParams, predict } from './model';

import './App.css';
import './form.css';
import { ASHPBudget, generateASHPBudget } from "./budget";
import { ASHPBudgetReport } from "./report/ASHPBudgetReport";
import { PropertyInput } from "./form/PropertyInput";
import { advise, HPReadyAdvice } from "./adviseHPReady";
import { HeatingSystemInput } from "./form/HeatingSystemInput";
import { HPReadyReport } from "./report/HPReadyReport";
import { HPTypicalQuote } from "./report/HPTypicalQuote";

export default function App() {

  const [ budget, setBudget ] = useState(null as ASHPBudget | null );
  const [ premisesInfo, setPremisesInfo ] = useState({} as PremisesInfo);
  const [ error, setError ] = useState(null as string | null);
  const [ existingHeatingInfo, setExistingHeatingInfo ] = useState({} as ExistingHeatingInfo);
  const [ HPReadyAdvice, setHPReadyAdvice ] = useState (null as HPReadyAdvice | null );

  const handleSubmitPremisesInfo = (premInfo: PremisesInfo) => {
    try { 
      setPremisesInfo(premInfo);
      const result = predict({ premisesInfo } as InputParams);
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
    setPremisesInfo({} as PremisesInfo);
    setExistingHeatingInfo({} as ExistingHeatingInfo);
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
        <PropertyInput premisesInfo={premisesInfo} onSubmit={handleSubmitPremisesInfo} />
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







