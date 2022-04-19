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
  Select,
  Typography
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {choosePmocModel,  getPmocMold,  showPmocTitle, updatePmocOption, showPmocOption} from '../../../action';


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

export default function EditPmocOption() {
  
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [values, setValues] = useState({
    name: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [fieldError, setFieldError] = useState(false);
  const [pmoc_title, setPmocTitle] = useState([]);
  const [pmoc_title_id, setPmocTitleId] = useState('');
  const [pmoc_mold_id, setPmocMoldId] = useState('');
  const [pmoc_option_id, setPmocOptionId] = useState('');
  const [title, setTitle] = useState('');
  const [monthly, setMonthly] = useState();
  const [semestral, setSemestral] = useState();
  const [yearly, setYearly] = useState();
  const [quarterly, setQuarterly] = useState();
  
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
        setTitleError("O nome não pode ficar vazio!");
        setSuccess(false);
      }else if(!pmoc_title_id){
        setTitleError("O  titulo não pode ficar vazio!");
        setSuccess(false);
      }else{
      
        const response = dispatch(await updatePmocOption(pmoc_option_id, {name: values.name, semestral, monthly, yearly, quarterly}));

        if(response.payload.data.error){
          setError(response.payload.data.error);
          setSuccess(false);
        }else{
          setFieldError(false)
          setTitleError(false);
          setSuccess(true);
          setError('');
          loadTitle();
        }
      }
    } catch (error) {
      console.log(error);
      setError("Ocorreu um problema, entre em contato com o suporte!")
    }
  }
  const handleMsg = ()=>{
    if(title.option){
      if(title.option.length === 0){
        return(
          <div className={classes.msgArea}>
            <Typography variant='p' color='error' >Ainda não há nenhum item</Typography>
          </div>
        )
      };
     
    }
  }
  const loadMold = async ()=>{
    dispatch(await getPmocMold());
   
  }
  
  const loadChoose = async ()=>{
    if(pmoc_mold_id){
      const response = dispatch(await choosePmocModel(pmoc_mold_id));
      setPmocTitle(response.payload.data);
    }
    
  }
  const loadTitle = async ()=>{
    if(pmoc_title_id){
      const response = dispatch(await showPmocTitle(pmoc_title_id));
      setTitle(response.payload.data);
    }
    
  }
  const loadOptions = async () =>{
    const response = dispatch(await showPmocOption(pmoc_option_id));
    setValues(response.payload.data);
    setMonthly(response.payload.data.monthly  === 1 ? true : false);
    setSemestral(response.payload.data.semestral  === 1 ? true : false);
    setYearly(response.payload.data.yearly  === 1 ? true : false);
    setQuarterly(response.payload.data.quarterly  === 1 ? true : false);
  }
  /* EFFECT */
  useEffect(()=>{
    loadMold();
  }, []);
  
  useEffect(()=>{
    loadChoose()
  }, [pmoc_mold_id]);

  useEffect(()=>{
    loadTitle()
  }, [pmoc_title_id]);
  useEffect(()=>{
    loadOptions()
  },[pmoc_option_id])
  return (
    <div className={classes.root}>
      <Title >Editar Item de Título</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>Ítem de título editado com sucesso</p>
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
        {title && title.option.length > 0 &&
          <>
            <InputLabel >Escolha o ítem</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={pmoc_option_id}
              label="Escolha o item"
              onChange={ (e) => {setPmocOptionId(e.target.value)}}
              fullWidth
              className={classes.select}
            >
              
              {title.option.map((item, key)=>(
                <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
              ))}
            </Select>
          </>
        }
        
        {pmoc_option_id && pmoc_title.length > 0 && title.option.length > 0&&
          <>
            <TextField
              name='name'
              label="Editar Nome do Ítem:"
              fullWidth
              margin="normal"
              variant="outlined"
              onChange={handleChange}
              required={titleError || fieldError ? true : false}
              error={titleError || fieldError? true : false}
              helperText={titleError || fieldError ? titleError: ''}
              value={values.name}
            />
            <FormLabel component="legend">Editar Período de Manutenção</FormLabel>
            <RadioGroup   row aria-label="Período de manutenção" name="maintenance">
              <FormControlLabel 
                value="monthly"
                control={<Checkbox color="primary"    checked={monthly} onChange={(e)=>{setMonthly(e.target.checked);}}/>}
                label="M" />
              <FormControlLabel 
                value="quarterly"
                control={<Checkbox color="primary" checked={quarterly} onChange={(e)=>setQuarterly(e.target.checked)} />}
                label="T" />
              <FormControlLabel 
                value="semestral"
                control={<Checkbox color="primary" checked={semestral} onChange={(e)=>setSemestral(e.target.checked)} />}
                label="S" />
              <FormControlLabel
                value="yearly"
                control={<Checkbox color="primary" checked={yearly} onChange={(e)=>setYearly(e.target.checked)} />}
                label="A" />
            </RadioGroup>
          </>
        }
        {pmoc_mold_id && pmoc_title.length === 0 &&
           <div className={classes.msgArea}>
            <Typography variant='p' color='error' >Ainda não há nenhum conteúdo nesse modelo</Typography>
          </div>
        }
        {pmoc_title_id && handleMsg()
          
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