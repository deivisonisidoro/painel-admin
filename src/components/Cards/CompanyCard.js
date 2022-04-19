/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import {getCountUsers} from '../../action'
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


export default function Company() {
  /* STYLES */
  const classes = useStyles();

  /* STATES */
  const [company, setCompany] = useState();

  /* HOOKS */
  const dispatch = useDispatch();
  
  /* EFFECT */
  useEffect(()=>{
    const fecthData= async ()=>{
      const response = dispatch(await getCountUsers());
      setCompany(response.payload.company);
    }
    fecthData();
  },[]);

  return (
    <div className={classes.root}>
      <Title >Empresas Cadastradas</Title>
      <Typography  className={classes.subTitle} color="secondary" component="p" variant="h4">
        {company}
      </Typography>
    </div >
  );
}