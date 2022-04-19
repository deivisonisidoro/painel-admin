import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { Button } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createNotification } from '../../../action';

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

export default function Notifications({typeUser}) {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [contentError, setContentError] = useState(false);
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
        setFieldError("Os campos não podem ficar vazios!");
        setSuccess(false);
      }else if(!values.title){
        setTitleError("O título não podem ficar vazios!");
        setSuccess(false);
      }else if(!values.content){
        setContentError("O conteudo não podem ficar vazios!");
        setSuccess(false);
      }else{
        let {title, content} = values
        const response = dispatch(await createNotification(typeUser,  {title, content}));
        if(response.payload.success){
          setSuccess(response.payload.success);
          setFieldError(false)
          setTitleError(false);
          setContentError(false);
          setError('');
          
        }else{
          setError(response.payload.error);
          setSuccess(false);
        }
      }
    } catch (error) {
      setError("Ocorreu um problema, tente novamente mais tarde!")
    }
  }
  return (
    <form onSubmit={handleSubmit} className={classes.root} noValidate >
      <Title >Enviar Notificações</Title>
      {error && (
            <p className={classes.errorMessage}>{error}</p>
          ) 
        }
       {success && (
            <p className={classes.successMessage}>{success}</p>
          ) 
        }
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
      />
      <TextField
        name='content'
        label="Conteudo:"
        fullWidth
        margin="normal"
        variant="outlined"
        multiline
        rows={4}
        onChange={handleChange}
        required={contentError || fieldError ? true : false}
        error={contentError || fieldError ? true : false}
        helperText={contentError || fieldError  ? contentError: ''}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Enviar
      </Button>
    </form>
  );
}