/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-useless-escape */
import React, {useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import Title from '../../Title';
import { Button, Checkbox, MenuItem, Select,  Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { choosePmocModel,  getPmocMold } from '../../../action';
import { useSelector } from 'react-redux';

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
  },
  msgArea:{
    textAlign:"center"
  }
}));

export default function PmocModel({typeUser}) {
  /* STYLES */
  const classes = useStyles();
  
  /* STATES */
 
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [model, setModel] = useState([]); 
  // const [pmoc_mold, setPmocMold] = useState([]);
  const [pmoc_mold_id, setPmocMoldId] = useState('');
  const [searched, setSearched] = useState(false);

  /* HOOKS */
  const dispatch = useDispatch();
  const {pmoc_mold} = useSelector(state=> state.pmocReducer);
  /* EFFECT */
  useEffect(()=>{
    const fetchData = async ()=>{
      dispatch(await getPmocMold());
    }
    fetchData()
  }, [])
  /* FUNCTION */

  const handleSubmit = async (ev)=>{
    ev.preventDefault();
    
    try {
      const response = dispatch(await choosePmocModel(pmoc_mold_id));
      setSearched(true);
      if(response.payload.data.error){
        setError("Selecione algum modelo!");
        setSearched(false);
        setModel({
          name: "",
          email: "",
          tel: "",
          usertype_id: "",
          created_at: ""
        })
        setSuccess(false);
      }else{
        setError('');
        setModel(response.payload.data)
      }
    } catch (error) {
      setSearched(false);
      setError("Selecione algum modelo!")
    }
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit} className={classes.root} noValidate >
        <Title >Buscar por Modelo</Title>
        {error && (
              <Typography variant='p' color='error'>{error}</Typography>
            ) 
          }
        {success && (
              <Typography variant='p' color='green'>{success}</Typography>
            ) 
          }

        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={pmoc_mold_id}
          label="Escolha o modelo"
          onChange={ (e) => {setPmocMoldId(e.target.value)}}
          fullWidth
        >
          
          {pmoc_mold.map((item, key)=>(
            <MenuItem value={item.id} key={key}>{item.name}</MenuItem>
          ))}
        </Select>
        <Button
            type="submit"
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
          Buscar
          </Button> 
      </form>
      {model.length > 0 ?
        <>
        {model.map((row)=>(
          <Table stickyHeader key={row.id} size="small">
            <TableHead>
              <TableRow>
                <TableCell  align="center" colSpan={5}>{row.name}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell />
                <TableCell align="right">M</TableCell>
                <TableCell align="right">T</TableCell>
                <TableCell align="right">S</TableCell>
                <TableCell align="right">A</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {row.option.map((item)=>(
                  <TableRow key={item.id}>
                    <TableCell>{item.name}</TableCell>
                    
                    <TableCell align="right"padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={item.monthly}
                      />
                    </TableCell>
                    <TableCell align="right"padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={item.quarterly}
                      />
                    </TableCell>
                    <TableCell align="right"padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={item.semestral}
                      />
                    </TableCell>
                    <TableCell align="right"padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={item.yearly}
                      />
                    </TableCell>
                  
                  </TableRow>
                ))}
             
            </TableBody>
        </Table>
        ))}
        
        </>
        :
          searched&&
          <div className={classes.msgArea}>
              <Typography variant='h6' color='error' >Ainda não há nenhum conteúdo nesse modelo</Typography>
          </div>
        
      }    
      
    </div>
    
  );
}