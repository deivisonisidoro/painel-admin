/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {createPmocTitle, getPmocMold } from '../../../action';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(5),
  },
  textField: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
    width: '100%',
  },
  select:{
    marginBottom: theme.spacing(5),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage:{
    color: "#F54348",
  },
  successMessage:{
    color: "green",
  }
}));

export default function PmocTitle() {
  
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState({title: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [pmoc_mold_id, setPmocMoldId] = useState('');

  /*HOOKS*/
  const dispatch = useDispatch();
  const {pmoc_mold} = useSelector(state=> state.pmocReducer);

  /* FUNCTION */
  const handleChange = (ev) => {
    const {name, value} = ev.target;
    setValues({...values, [name]: value});
  };
 
  const handleSubmit = async (ev)=>{
    ev.preventDefault();

    try {
      if(!pmoc_mold_id){
        setError("O  modelo não pode ficar vazio!");
        setSuccess(false);
      }else if(!values){
        setFieldError("O campo não podem ficar vazios!");
        setSuccess(false);
      }else if(!values.title){
        setTitleError("O nome não pode ficar vazio!");
        setSuccess(false);
      }else{
        let {title} = values
        const response = dispatch(await createPmocTitle(pmoc_mold_id, {name: title}));
        if(response.payload.data.error){
          setError(response.payload.data.error);
          setSuccess(false);
        }else{
          setFieldError(false)
          setTitleError(false);
          setSuccess(true);
          setError('');
          setValues({title: ''})
        }
      }
    } catch (error) {
      setError("Ocorreu um problema, entre em contato com o suporte!")
    }
  }
  const fetchData = async ()=>{
    dispatch(await getPmocMold());
  }
  /* EFFECT */
  useEffect(()=>{
    fetchData()
  }, [])
  return (
    <div className={classes.root}>
      <Title >Adicionar Título de Modelo</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>Título de modelo adicionado com sucesso</p>
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
        >
          
          {pmoc_mold.map((item, key)=>(
            <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
          ))}
        </Select>
        {pmoc_mold_id  &&
          <TextField
            name='title'
            label="Título:"
            fullWidth
            margin="normal"
            variant="outlined"
            onChange={handleChange}
            required={titleError || fieldError ? true : false}
            error={titleError || fieldError? true : false}
            helperText={titleError || fieldError ? titleError: ''}
            value={values.title}
          />
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
            Adicionar
        </Button>
      </form>
    </div>
    
  );
}