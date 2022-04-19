/* eslint-disable no-useless-escape */
import React, {useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { Button, Grid, InputAdornment, Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { chooseUser, updateUser } from '../../../action';
import moment from 'moment';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  titleArea:{
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
    margin: theme.spacing(10, 0, 0),
   
  },
  errorMessage:{
    color: "#F54348",
  },
  successMessage:{
    color: "green",
  },
  pagination:{
    "& > *": {
      marginTop: theme.spacing(6),
      justifyContent:"center",
      display:'flex'
    }
  },
  searchIcon:{
    '&:hover': {
      cursor:  'pointer',
    },
  }
}));

export default function User({typeUser}) {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState();
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    tel: "",
    usertype_id: "",
    created_at: ""
  }); 
 
  /* HOOKS */
  const dispatch = useDispatch();

  /* FUNCTION */
  const handleChange = (ev) => {
    const {name, value} = ev.target;
    setValues({...values, [name]: value});
  };
  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    let regEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    try {
      if(!values){
        setEmailError("O email não pode ficar vazio!");
        setSuccess(false);
      }else if(!values.email){
        setEmailError("O email não pode ficar vazio!");
        setSuccess(false);
      }else if(!regEmail.test(values.email)){
        setError('O email precisa ser preenchido corretamente');
      }else{
        const response = dispatch(await chooseUser(values));
        if(response.payload.data.error){
          setError(response.payload.data.error);
          setUser({
            name: "",
            email: "",
            tel: "",
            usertype_id: "",
            created_at: ""
          })
          setSuccess(false);
        }else{
          setEmailError(false);
          setFieldError(false)
          setError('');
          setUser(response.payload.data)
        }
      }
    } catch (error) {
      setError("Ocorreu um problema, tente novamente mais tarde!")
    }
  }
  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.root} noValidate >
        <Title >Tornar Administrador</Title>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>{success}</p>
            ) 
          }
        <TextField
          name='email'
          label="Email do usuário:"
          fullWidth
          margin="normal"
          variant="outlined"
          onChange={handleChange}
          required={emailError || fieldError ? true : false}
          error={emailError || fieldError ? true : false}
          helperText={emailError || fieldError  ? emailError: ''}
          InputProps={{
            endAdornment: (
              <InputAdornment onClick={handleSubmit} className={classes.searchIcon} position="end">
               <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </form>
      {user.name !== "" &&
        <>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Data de Cadastro</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefone</TableCell>
              <TableCell align="right">Tipo de Usuário</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
              <TableRow>
                <TableCell>{moment(user.created_at).format("DD/MM/YYYY")}</TableCell>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.tel}</TableCell>
                {user.admin ? 
                    <TableCell align="right">Administrador</TableCell>
                  :
                    <TableCell align="right">Normal</TableCell>
                }
              
              </TableRow>
          </TableBody>
        </Table>
        {user.admin ? 
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async()=>{
              const response = dispatch(await updateUser(user.id, {admin: false}));
              setUser(response.payload.data);
              setSuccess("Usuario transformado com sucesso!")
            }}
          >
          Tornar Usuario Normal
          </Button> 
          :
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={async()=>{
              const response = dispatch(await updateUser(user.id, {admin: true}));
              setUser(response.payload.data);
              setSuccess("Usuario transformado com sucesso!")
            }}
          >
            Tornar Administrador
          </Button>     
        }
          
          
        </>
      }
      <Grid container style={{marginTop: 30}} justifyContent="flex-end">
          <Grid item>
          <Button 
            onClick={()=>{
              dispatch({ type: 'PAGE_CHOOSE_USER', payload: false});
              dispatch({ type: 'PAGE_CREATE_USER', payload: true});
            }}  
            color="primary">
              Criar usuário administrador
          </Button>
          </Grid>
      </Grid>
    </div>
    
  );
}