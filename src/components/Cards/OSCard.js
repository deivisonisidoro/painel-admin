/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import {getCountUsers} from '../../action'
// import { useState } from 'react';


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


export default function OSCard() {
  /* STYLES */
  const classes = useStyles();

  /* STATES */
  const [os, setOs] = useState('')

  /* HOOKS */
  const dispatch = useDispatch();

 

  /* EFFECT */
  useEffect(()=>{
    const fecthData= async ()=>{
      const response = dispatch(await getCountUsers());
      setOs(response.payload.os)
    }
    fecthData();
  },[]);

  return (
    <div className={classes.root}>
      <Title >OS Criadas</Title>
      <Typography  className={classes.subTitle} color="secondary" component="p" variant="h4">
        {os}
      </Typography>
    </div >
  );
}