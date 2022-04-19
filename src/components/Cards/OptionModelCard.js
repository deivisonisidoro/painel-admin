/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import { Button } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root:{
    textAlign: 'center',
    flexGrow: 1,
    padding:theme.spacing(3),
  },
  btnArea:{
    
  },
  btn: {
    margin: theme.spacing(3),
  },
}))


export default function OptionModelCard() {
  /* STYLES */
  const classes = useStyles();

  
  /* HOOKS */
  const dispatch = useDispatch();
  

  return (
    <div className={classes.root}>
      <Title >Administrador</Title>
      <div className={classes.btnArea}>
      <Button onClick={()=>{dispatch({ type: 'PAGE_CHOOSE_MODEL', payload: true});}} className={classes.btn} variant="contained" color="primary">
        Buscar Modelo
      </Button>
      <Button onClick={()=>{dispatch({ type: 'PAGE_EDIT_MODEL', payload: true});}} className={classes.btn} variant="contained" color="primary">
       Editar Modelo
      </Button>
      </div>
    </div >
  );
}