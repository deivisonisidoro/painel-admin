/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Title from '../../Title';
import { Button, InputLabel, MenuItem,Select, Typography } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import {choosePmocModel,  deletePmocOption,  getPmocMold,  showPmocTitle} from '../../../action';


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

export default function DeletePmocOption() {
  
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [pmoc_title, setPmocTitle] = useState([]);
  const [pmoc_title_id, setPmocTitleId] = useState('');
  const [pmoc_mold_id, setPmocMoldId] = useState('');
  const [pmoc_option_id, setPmocOptionId] = useState('');
  const [title, setTitle] = useState('');
 
  /*HOOKS*/
  const dispatch = useDispatch();
  const {pmoc_mold} = useSelector(state=>state.pmocReducer);
 
  /* FUNCTION */
  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    try {
      if(!pmoc_mold_id){
        setError("Escolha um modelo!");
        setSuccess(false);
      }else if(!pmoc_title_id){
        setError("Escolha um título!");
        setSuccess(false);
      }else if(!pmoc_option_id){
        setError("Escolha um item!");
        setSuccess(false);
      }else{
        const response = dispatch(await deletePmocOption(pmoc_option_id));
        if(response.payload.data.error){
          setError(response.payload.data.error);
          setSuccess(false);
        }else{
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
  const loadModel = async ()=>{
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
  const fetchData = async ()=>{
    dispatch(await getPmocMold());
  }
  /* EFFECT */
  useEffect(()=>{
    loadModel()
  }, [pmoc_mold_id]);
  
  useEffect(()=>{
    loadTitle()
  }, [pmoc_title_id]);

  useEffect(()=>{
    fetchData();
  }, []);
  
  return (
    <div className={classes.root}>
      <Title >Deletar Item de Título</Title>
      <form onSubmit={handleSubmit} className={classes.form}>
        {error && (
              <p className={classes.errorMessage}>{error}</p>
            ) 
          }
        {success && (
              <p className={classes.successMessage}>Ítem de título deletado com sucesso</p>
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
        {title &&
          title.option.length > 0 &&
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
            Excluir
        </Button>
      </form>
    </div>
    
  );
}