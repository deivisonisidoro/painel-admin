/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import {getCountEngineers} from '../../action'
import { useState } from 'react';


const useStyles = makeStyles((theme) => ({
  root:{
    textAlign: 'center',
    flexGrow: 1,
    padding:theme.spacing(3),
  },
  subTitle: {
    marginTop: theme.spacing(6),
  },
}))


export default function Engineer() {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [engineer, setEngineer] = useState();
  /* HOOKS */
  const dispatch = useDispatch();
  
  /* EFFECT */
  useEffect(()=>{
    fecthData();
  },[]);
  /* Functions */
  const fecthData= async ()=>{
    const response = dispatch(await getCountEngineers());
    setEngineer(response.payload.engineer);

  }
  return (
    <div className={classes.root}>
      <Title >Engenheiros Cadastrados</Title>
      <Typography  className={classes.subTitle} color="secondary" component="p" variant="h4">
        {engineer}
      </Typography>
     
     
    </div >
  );
}