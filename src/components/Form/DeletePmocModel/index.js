/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Title';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { deletePmocMold, getPmocMold } from '../../../action';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(5),
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: '25ch',
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage:{
    color: "#F54348",
  },
  successMessage:{
    color: "green",
  },
  select:{
    marginBottom: theme.spacing(5),
  }
}));

export default function DeletePmocModel() {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */

  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pmoc_mold_id, setPmocMoldId] = useState('');
  
  /*HOOKS*/
  const dispatch = useDispatch();
  const {pmoc_mold} = useSelector(state=>state.pmocReducer);
  
  /* FUNCTION */
  const handleSubmit = async (ev)=>{
    ev.preventDefault();

 
      if(!pmoc_mold_id){
        setError("Escolha um modelo!");
        setSuccess(false);
      }else{
        try {
          const response = dispatch(await deletePmocMold(pmoc_mold_id));
            if(response.payload.error){
              setError(response.payload.error);
              setSuccess(false);
            }else{
              setSuccess(true);
              setError('');
              setPmocMoldId();
              fetchData();
            }
        } catch (error) {
          console.log(error);
          setError("Ocorreu um problema, tente novamente mais tarde!")
        }
      }

      
  }
  const fetchData = async ()=>{
    dispatch(await getPmocMold());
  }
  /* EFFECT */
  useEffect(()=>{
    fetchData()
  }, []);
  return (
    <div className={classes.root}>
      <Title >Deletar Modelo:</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>Modelo excluido com sucesso</p>
            ) 
          }
        <InputLabel >Escolha o modelo</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pmoc_mold_id}
          label="Escolha o modelo"
          onChange={ (e) => {setPmocMoldId(e.target.value)}}
          fullWidth
          className={classes.select}
        >
            
          {pmoc_mold.map((item, key)=>(
            <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
          ))}
        </Select>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Excluir
        </Button>
      </form>    
    </div>
    
  );
}