/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import { getUsers } from '../../action';
import { Pagination } from '@material-ui/lab';
import moment from 'moment';

export default function UserTable() {
  
  /*STYLES*/
  const classes = useStyles();

  /* STATES */
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [lastPage, setLastPage] = useState();


  /* HOOKS */
  const dispatch = useDispatch(page);

  /* EFFECTS */
  useEffect(()=>{
    const getPage = async ()=>{
      const response = dispatch(await getUsers(page));
      setLastPage(response.payload.user.lastPage);
      setUsers(response.payload.user.data);
    };

    getPage();
  }, []);
  
  /* FUNCTION */
 
  const handleChange = async (event, value) => {
    setPage(value);
    const response = dispatch(await getUsers(value));
    setUsers(response.payload.user.data);
   
  };
  return (
    <React.Fragment>
      <Title>Usuários Recentes</Title>
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
          {users.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{moment(row.created_at).format("DD/MM/YYYY")}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.email}</TableCell>
              <TableCell>{row.tel}</TableCell>
              {row.usertype_id  === 1 && 
                <TableCell align="right">Cliente</TableCell>
              }
              {row.usertype_id  === 2 && 
                <TableCell align="right">Técnico</TableCell>
              }
              {row.usertype_id  === 3 && 
                <TableCell align="right">Empresa</TableCell>
              }
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className={classes.seeMore}>
        <Pagination size="medium" shape="rounded" className={classes.pagination} page={page} onChange={handleChange}  count={lastPage} color="primary" />
      </div>
    </React.Fragment>
  );
}



const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
  pagination:{
    "& > *": {
      marginTop: theme.spacing(6),
      justifyContent:"center",
      display:'flex'
    }
  }
}));