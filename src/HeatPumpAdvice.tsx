import { useState } from "react";
import { Alert, Box, Button,StyledEngineProvider } from '@mui/material';

import {  PremisesInfo } from './data';
import { InputParams, Result, predict } from './model';

import './App.css';
import './form.css';
import { ASHPBudget, generateASHPBudget } from "./budget";
import { ASHPBudgetReport } from "./ASHPBudgetReport";
import { PropertyInput } from "./form/PropertyInput";

export default function App() {

  const [ budget, setBudget ] = useState(null as ASHPBudget | null );
  // TODO - dont keep result as well as budget in state in final version
  const [ result, setResult ] = useState(null as Result | null );
  const [ premisesInfo, setPremisesInfo ] = useState({} as PremisesInfo);
  const [ error, setError ] = useState(null as string | null);


  const handleSubmitPremisesInfo = (premInfo: PremisesInfo) => {
    try { 
      setPremisesInfo(premInfo);
      const result = predict({ premisesInfo } as InputParams);
      setResult(result);
      const budget = generateASHPBudget(result);
      setBudget(budget);
    } catch (error) {
      const errMess = `Unable to estimate heat pump costs for this property at this time: ${error}`;
      console.log(errMess);
      setError(errMess);
    }
  }

  const resetOutput = () => {
    setError(null);
    setResult(null);
    setBudget(null);
  };

  const resetInput = () => {
    setError(null);
    setPremisesInfo({} as PremisesInfo);
    resetOutput();
  };

  return ( 
    <StyledEngineProvider injectFirst>
      <Box sx={{ border: 3, padding: 5, minHeight: 400 }} >
      {error ? <Alert severity="error">{error}</Alert> : null}
      How much might a Heat Pump cost me?
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
            <ASHPBudgetReport 
              budget={budget}
            />

          : <Alert severity="error">Could not display budget report for this input</Alert>}
        </>
      }
      </Box>
      <Button onClick={()=> resetInput()}>Restart</Button>
      <Button onClick={()=> resetOutput()}>Recalculate</Button>
    </StyledEngineProvider> 
  ); 
}







