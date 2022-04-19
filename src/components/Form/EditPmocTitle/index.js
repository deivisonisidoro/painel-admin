/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { Button, InputLabel, MenuItem, Select, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {choosePmocModel,  getPmocMold,  showPmocTitle, updatePmocTitle } from '../../../action';


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
  },
  msgArea:{
    textAlign:"center"
  }
}));

export default function EditPmocTitle() {
  
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState({title:''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [pmoc_title, setPmocTitle] = useState([]);
  const [pmoc_title_id, setPmocTitleId] = useState('');
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
      }else if(!values.title){
        setTitleError("O nome não pode ficar vazio!");
        setSuccess(false);
      }else if(!pmoc_title_id){
        setTitleError("O  titulo não pode ficar vazio!");
        setSuccess(false);
      }else{
        let {title} = values
        const response = dispatch(await updatePmocTitle(pmoc_title_id, {name: title}));
        if(response.payload.data.error){
          setError(response.payload.data.error);
          setSuccess(false);
        }else{
          setFieldError(false)
          setTitleError(false);
          setSuccess(true);
          setError('');
          setValues({title: ''});
          loadMold();
        }
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um problema, entre em contato com o suporte!")
    }
  }
  
  const loadMold = async ()=>{
    if(pmoc_mold_id){
      const response = dispatch(await choosePmocModel(pmoc_mold_id));
      setPmocTitle(response.payload.data);
    }
  }
  const loadTitle = async ()=>{
    if(pmoc_title_id){
      dispatch(await showPmocTitle(pmoc_title_id));
    }
    
  }
  /* EFFECT */
  useEffect(()=>{
    loadMold()
  }, [pmoc_mold_id]);

  useEffect(()=>{
    loadTitle()
  }, [pmoc_title_id]);

  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch(await getPmocMold());
    }
    fetchData();
  }, [])
  return (
    <div className={classes.root}>
      <Title >Editar Título de Modelo</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>Título de modelo editado com sucesso</p>
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
        {pmoc_title.length > 0 &&
          <>
            <InputLabel >Escolha o titulo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pmoc_title_id}
              label="Escolha o modelo"
              onChange={ (e) => {setPmocTitleId(e.target.value)}}
              fullWidth
              className={classes.select}
            >
              
              {pmoc_title.map((item, key)=>(
                <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
              ))}
            </Select>
          </>
        }
        
        {pmoc_title_id &&
          <TextField
            name='title'
            label="Editar Título:"
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
        {pmoc_mold_id && pmoc_title.length === 0 &&
           <div className={classes.msgArea}>
            <Typography variant='p' color='error' >Ainda não há nenhum conteúdo nesse modelo</Typography>
          </div>
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