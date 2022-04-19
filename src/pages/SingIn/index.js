/* eslint-disable no-useless-escape */
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { requestLogin } from '../../action';
import { login } from '../../services/Authentication/auth';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/Logo-Clima-Code-OK.svg'

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  input:{
    backgroundColor: theme.palette.background.default,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  errorMessage:{
    color: "#F54348",
  }
}));

export default function SignIn() {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState();
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState();
  
  /* HOOKS */
  const dispatch = useDispatch();
  const history = useHistory();

  /* ARROW FUNCTION*/
  const handleChange = (ev) => {
    const {name, value} = ev.target;
    setValues({...values, [name]: value});
  };
  const handleSubmit = async (ev) => {
    ev.preventDefault();
    try {
      let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
      if(!values.email){
        setEmailError(true);
      }else if(!reg.test(values.email)){
        setError('O email precisa ser preenchido corretamente');
      }else if(!values.password){
        setPasswordError(true);
      }else{
        const response = dispatch(await requestLogin(values.email, values.password));
        console.log(response);
        // if(response.payload.data.token){
        //   login(response.payload.data.token);
        //   history.push('/')
          
        // }else  if(response.payload.data.error){
        //   setError(response.payload.data.error)
        // }
    }

      
    } catch (error) {
      setError("Ocorreu um problema, tente novamente mais tarde!")
    }
  };
  return (
    <div className={classes.root}>
      <Container component="main" maxWidth="xs">
        <div className={classes.paper}>
          <div className={classes.logo}>
            <img src={Logo} style={{width: 300,  height: 300}}alt="Logo" />
          </div>
          <form onSubmit={handleSubmit} className={classes.form} noValidate>
            {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) }
            <TextField
              variant="outlined"
              margin="normal"
              required={emailError ? true : false}
              error={emailError? true : false}
              helperText={emailError ? "Não pode ficar vazio": ''}
              fullWidth
              id="email"
              label="Email"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
              className={classes.input}
            />
            <TextField
              variant="outlined"
              margin="normal"
              required={passwordError ? true : false}
              error={passwordError? true : false}
              helperText={passwordError ? "Não pode ficar vazio": ''}
              fullWidth
              name="password"
              label="Senha"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
              className={classes.input}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Entrar
            </Button>
          </form>
        </div>
      </Container>
    </div>
  );
}