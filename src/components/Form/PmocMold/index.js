import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import {createPmocMold, getPmocMold } from '../../../action';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
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
  }
}));

export default function PmocMold() {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState({name: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [nameError, setNameError] = useState(false);
  const [fieldError, setFieldError] = useState(false);

  /*HOOKS*/
  const dispatch = useDispatch();
  
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
        let {name} = values
        const response = dispatch(await createPmocMold({name}));
        if(response.payload.error){
          setError(response.payload.error);
          setSuccess(false);
        }else{
          setFieldError(false)
          setNameError(false);
          setSuccess(true);
          setError('');
          setValues({name: ''});
          dispatch(await getPmocMold());
        }
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um problema, tente novamente mais tarde!")
    }
  }
  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate >
      <Title >Adicionar Modelo:</Title>
      {error && (
            <p className={classes.errorMessage}>{error}</p>
          ) 
        }
       {success && (
            <p className={classes.successMessage}>Nome de modelo adicionado com sucesso</p>
          ) 
        }
      <TextField
        name='name'
        label="Nome:"
        fullWidth
        margin="normal"
        variant="outlined"
        onChange={handleChange}
        required={nameError || fieldError ? true : false}
        error={nameError || fieldError? true : false}
        helperText={nameError || fieldError ? nameError: ''}
        value={values.name}
      />
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
  );
}