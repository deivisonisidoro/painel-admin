import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hearder from '../../components/Header';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import ModelCard from '../../components/Cards/ModelCard';
import { useHistory } from 'react-router-dom';


export default  function Pmoc() {
  /* STYLES */
  const classes = useStyles();
  
  /* HOOKS */ 
  const history = useHistory();

  /*FUNCTION*/
 
  return (
    <div className={classes.root}>
      <Hearder/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Pmoc Model */}
            <Grid  item xs={12} md={4} lg={3} >
              <Paper  onClick={()=>history.push('/modelo-de-pmoc')}   className={classes.paper}>
                <ModelCard />
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}

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
    height: 240,
  },
}))