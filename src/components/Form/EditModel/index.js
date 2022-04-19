/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { Button, InputLabel, MenuItem, Select } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getPmocMold, updatePmocMold } from '../../../action';

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

export default function EditPmocMold() {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState({name: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [nameError, setNameError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [pmoc_mold_id, setPmocMoldId] = useState('');

  /*HOOKS*/
  const dispatch = useDispatch();
  const {pmoc_mold} = useSelector(state=>state.pmocReducer);
  /* FUNCTION */
  const handleChange = (ev) => {
    const {name, value} = ev.target;
    setValues({...values, [name]: value});
  };
  const handleSubmit = async (ev)=>{
    ev.preventDefault();

    try {
      if(!values){
        setFieldError("O campo não podem ficar vazios!");
        setSuccess(false);
      }else if(!values.name){
        setNameError("O nome não pode ficar vazio!");
        setSuccess(false);
      }else{
        let {name} = values;
        const response = dispatch(await updatePmocMold(pmoc_mold_id, {name}));
        if(response.payload.error){
          setError(response.payload.error);
          setSuccess(false);
        }else{
          setFieldError(false)
          setNameError(false);
          setSuccess(true);
          setError('');
          setValues({name: ''});
          fetchData();
        }
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um problema, tente novamente mais tarde!")
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
      <Title >Editar Nome do Modelo:</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>Nome de modelo atualizado com sucesso</p>
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
        
        {pmoc_mold_id &&
          <TextField
          name='name'
          label="Editar Nome:"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          required={nameError || fieldError ? true : false}
          error={nameError || fieldError? true : false}
          helperText={nameError || fieldError ? nameError: ''}
          value={values.name}
        />
        }
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Editar
        </Button>
      </form>    
    </div>
    
  );
}