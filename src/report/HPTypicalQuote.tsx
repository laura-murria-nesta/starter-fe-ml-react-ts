import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import { ASHPBudget } from "../budget";

export function HPTypicalQuote(props: { budget: ASHPBudget }) {

  return (
    <>
    <h2>Air-source Heat Pump Typical Quotation</h2>
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650,  }} aria-label="Quote illustration">
        <TableHead>
          <TableRow sx={{ bgcolor: 'gray', color: 'white'}}>
            <TableCell>Item</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Amount&nbsp;(£)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key='unit'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">Heat pump unit</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Hot water cylinder</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Design, survey, overheads</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Plumbing materials</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Electrical materials</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Labour (plumbing, electrical)</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Total</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </Table>
      <Table sx={{ minWidth: 650 }} aria-label="Quote illustration - extras">
        <TableHead>
          <TableRow sx={{ bgcolor: 'gray', color: 'white'}}>
            <TableCell>Item</TableCell>
            <TableCell align="left">Description</TableCell>
            <TableCell align="right">Amount&nbsp;(£)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            <TableRow
              key='unit'
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">Additional extras</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Heating system upgrades</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Building fabric energy efficiency upgrades</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Interior carpentry/redecoration</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
            <TableRow>
              <TableCell component="th" scope="row">Non-standard exterior works</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </>
  );
}
