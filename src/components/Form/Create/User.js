/* eslint-disable no-useless-escape */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Title from '../../Title';
import { useState } from 'react';
import { InputAdornment } from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../action';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  paper: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  margin: {
    margin: theme.spacing(1),
  },
  errorMessage:{
    color: "#F54348",
  },
  successMessage:{
    color: "green",
  }
}));

export default function CreateUser() {
  /* STYLES */
  const classes = useStyles();

  /* STATES*/
  const [values, setValues] = useState();
  const [seePassword, setSeePassword] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [nameError, setNameError] = useState(false);
  const [telError, setTelError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [confirmPasswordError, setConfirmPasswordError] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState();

  /* HOOKS */
  const dispatch = useDispatch();

  /* FUNCTION */
  const handleChange = (ev) => {
    const {name, value} = ev.target;
    setValues({...values, [name]: value});
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      let regTel= /(\(?\d{2}\)?\s)?(\d{4,5}\d{4})/
      if(!values.name){
        setNameError(true);
        setSuccess(false);
      }else if(!values.tel){
        setTelError(true);
        setSuccess(false);
      }else if(!values.email){
        setEmailError(true);
        setSuccess(false);
      }else if(!regEmail.test(values.email)){
        setError('O email precisa ser preenchido corretamente');
        setSuccess(false);
      }else if(!regTel.test(values.tel)){
        setError('O telefone precisa ser preenchido corretamente');
        setSuccess(false);
      }else if(!values.password){
        setPasswordError(true);
        setSuccess(false);
      }else if(!values.confirm_password){
        setConfirmPasswordError(true);
        setSuccess(false);
      }else if(!values.password !== !values.confirm_password){
        setError('A confirmação de senha está diferente da senha!');
      }else{
        const response = dispatch(await createUser({...values, usertype_id: 3,admin: true}));
        console.log(response);
        if(response.payload.data.error){
          setError(response.payload.data.error);
          setSuccess(false);
        }else{
          setSuccess("Usuário Criado com sucesso");
          setError(false);
          setPasswordError(false);
        }
    }

      
    } catch (error) {
      setError("Ocorreu um problema, tente novamente mais tarde!")
    }
  }
  return (
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <Title >Criar Usuario Administrativo</Title>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            {error &&
              (
                <p className={classes.errorMessage}>{error}</p>
              ) 
            }
            {success && (
                <p className={classes.successMessage}>{success}</p>
              ) 
            }
            <Grid container spacing={5}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="fname"
                  name="name"
                  variant="outlined"
                  fullWidth
                  id="name"
                  label="Nome"
                  autoFocus
                  required={nameError ? true : false}
                  error={nameError? true : false}
                  helperText={nameError ? "Não pode ficar vazio": ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  autoComplete="ftel"
                  name="tel"
                  variant="outlined"
                  fullWidth
                  id="tel"
                  label="Telefone"
                  autoFocus
                  required={telError ? true : false}
                  error={telError? true : false}
                  helperText={telError ? "Não pode ficar vazio": ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="email"
                  required={emailError ? true : false}
                  error={emailError? true : false}
                  helperText={emailError ? "Não pode ficar vazio": ''}
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  fullWidth
                  name="password"
                  label="Senha"
                  type={seePassword ? "text" : "password"}
                  id="password"
                  autoComplete="current-password"
                  onChange={handleChange}
                  required={passwordError ? true : false}
                  error={passwordError? true : false}
                  helperText={passwordError ? "Não pode ficar vazio": ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment onClick={()=>{setSeePassword(!seePassword)}} position="end">
                        {seePassword ? 
                          <VisibilityIcon color='primary' />
                          :
                          <VisibilityOffIcon color='primary'/>
                        }
                       
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Confirmar Senha"
                  variant="outlined"
                  name="confirm_password"
                  id="confirm_password"
                  fullWidth
                  type={seePassword ? "text" : "password"}
                  required={confirmPasswordError ? true : false}
                  error={confirmPasswordError? true : false}
                  helperText={confirmPasswordError ? "Não pode ficar vazio": ''}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment onClick={()=>{setSeePassword(!seePassword)}} position="end">
                        {seePassword ? 
                          <VisibilityIcon color='primary' />
                          :
                          <VisibilityOffIcon color='primary'/>
                        }
                       
                      </InputAdornment>
                    ),
                  }}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
            Cadastrar
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
              <Button 
                onClick={()=>{
                  dispatch({ type: 'PAGE_CHOOSE_USER', payload: true});
                  dispatch({ type: 'PAGE_CREATE_USER', payload: false});
                }}  
                color="primary">
                 Torna usuário administrador
              </Button>
              </Grid>
          </Grid>
          </form>
        </div>
      </Container>
  );
}