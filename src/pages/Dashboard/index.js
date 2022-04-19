import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

/* COMPONENTS*/
import CompanyCard from '../../components/Cards/CompanyCard';
import UserCard from '../../components/Cards/UserCard';
import TechnicianCard from '../../components/Cards/TechnicianCard';
import ClientCard from '../../components/Cards/ClientCard';
import Hearder from '../../components/Header';
import { useHistory } from 'react-router-dom';
import OSCard from '../../components/Cards/OSCard';
import BudgetCard from '../../components/Cards/BudgetCard';
import PmocCard from '../../components/Cards/PmocCard';
import EngineerCard from '../../components/Cards/EngineerCard';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
    backgroundColor: theme.palette.background.default
  },
  container: {
    paddingTop: theme.spacing(8),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    '&:hover': {
      cursor:  'pointer',
   },
  },
  fixedHeight: {
    height: 200,
   
  },
}));

export default function Dashboard() {

  /* STYLES */
  const classes = useStyles();

  /* HOOKS */
  const history = useHistory();

  
  /* FUNCTION */
  

  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
    <div className={classes.root}>
      <Hearder/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Total User */}
            <Grid  item xs={12} md={4} lg={3} >
              <Paper  onClick={()=>history.push('/usuario')}  className={fixedHeightPaper}>
                <UserCard />
              </Paper>
            </Grid>
            {/* Total Client */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper onClick={()=>history.push('/cliente')} className={fixedHeightPaper}>
                <ClientCard/>
              </Paper>
            </Grid>
            {/* Total Technician */}
            <Grid  onClick={()=>history.push('/tecnico')} item xs={12} md={4} lg={3}>
              <Paper className={fixedHeightPaper}>
                <TechnicianCard/>
              </Paper>
            </Grid>
            {/* Total Company */}
            <Grid item xs={12} md={4} lg={3}>
              <Paper onClick={()=>history.push('/empresa')} className={fixedHeightPaper}>
                <CompanyCard />
              </Paper>
            </Grid>
            {/* Total OS */}
            <Grid item xs={12} md={6} >
              <Paper onClick={()=>history.push('/ordem-de-servico')} className={fixedHeightPaper}>
                <OSCard />
              </Paper>
            </Grid>
            <Grid item xs={12} md={6} >
              <Paper onClick={()=>history.push('/orcamento')} className={fixedHeightPaper}>
                <BudgetCard />
              </Paper>
            </Grid>
            {/* Total PMOC */}
            <Grid item xs={12} md={6}>
              <Paper onClick={()=>history.push('/pmoc')} className={fixedHeightPaper}>
                <PmocCard />
              </Paper>
            </Grid>
            {/* Total Engineer */}
            <Grid item xs={12}  md={6}>
              <Paper onClick={()=>history.push('/engenheiro')} className={fixedHeightPaper}>
                <EngineerCard />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}