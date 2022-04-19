/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Title from '../../Title';
import { 
  Button,
  Checkbox,
  FormControlLabel,
  FormLabel,
  InputLabel,
  MenuItem,
  RadioGroup,
  Select
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {choosePmocModel, createPmocOption, getPmocMold} from '../../../action';

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

export default function PmocOption() {
  
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState({name: ''});
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [nameError, setNameError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [pmoc_title, setPmocTitle] = useState([]);
  const [pmoc_title_id, setPmocTitleId] = useState('');
  const [monthly, setMonthly] = useState();
  const [semestral, setSemestral] = useState();
  const [yearly, setYearly] = useState();
  const [quarterly, setQuarterly] = useState();
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
        setError("O modelo não pode ficar vazio!");
      setSuccess(false);
      }else if(!pmoc_title_id){
        setError("O titulo não pode ficar vazio!");
      setSuccess(false);
      }else if(!values){
        setFieldError("O campo não podem ficar vazios!");
        setSuccess(false);
      }else if(!values.name){
        setNameError("O nome não pode ficar vazio!");
        setSuccess(false);
      }else{
        let {name,} = values;
        const response = dispatch(await createPmocOption(pmoc_title_id, {name, semestral, monthly, yearly, quarterly}));
        if(response.payload.data.error){
          setError(response.payload.data.error);
          setSuccess(false);
        }else{
          setFieldError(false)
          setNameError(false);
          setSuccess(true);
          setError('');
          setValues({name:''});
        }
      }
    } catch (error) {
      setError("Ocorreu um problema, entre em contato com o suporte!")
    }
  }
  
  /* EFFECT */
  useEffect(()=>{
    const loadMold = async ()=>{
      dispatch(await getPmocMold());
   }
    loadMold();
  }, []);

  useEffect(()=>{
    const fetchData = async ()=>{
      if(pmoc_mold_id){
        const response = dispatch(await choosePmocModel(pmoc_mold_id));
        setPmocTitle(response.payload.data);
      }
      
    }
    fetchData() 
  }, [pmoc_mold_id]);
  
  return (
    <div className={classes.root}>
      <Title >Adicionar Item de Título</Title>
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
          className={classes.select}
        >
          
          {pmoc_mold.map((item, key)=>(
            <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
          ))}
        </Select>
        {pmoc_mold_id &&  pmoc_title.length > 0 &&
          <>
            <InputLabel >Escolha o titulo</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pmoc_title_id}
              label="Escolha o título"
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
        { pmoc_title.length > 0 && pmoc_title_id &&
          <>
            <TextField
              name='name'
              label="Nome:"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required={nameError || fieldError ? true : false}
              error={nameError || fieldError? true : false}
              className={classes.textField}
              value={values.name}
            />
            <FormLabel component="legend">Período de manutenção</FormLabel>
            <RadioGroup   row aria-label="Período de manutenção" name="maintenance">
              <FormControlLabel 
                value="monthly"
                control={<Checkbox color="primary"  onChange={(e)=>{setMonthly(e.target.checked);}}/>}
                label="M" />
              <FormControlLabel 
                value="quarterly"
                control={<Checkbox color="primary"  onChange={(e)=>setQuarterly(e.target.checked)} />}
                label="T" />
              <FormControlLabel 
                value="semestral"
                control={<Checkbox color="primary" onChange={(e)=>setSemestral(e.target.checked)} />}
                label="S" />
              <FormControlLabel
                value="yearly"
                control={<Checkbox color="primary" onChange={(e)=>setYearly(e.target.checked)} />}
                label="A" />
            </RadioGroup>
          </>
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