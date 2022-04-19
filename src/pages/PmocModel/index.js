import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hearder from '../../components/Header';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import PmocMold from '../../components/Form/PmocMold';
import PmocTitle from '../../components/Form/PmocTitle';
import PmocOption from '../../components/Form/PmocOption';
import ChooseModel from '../../components/Form/Choose/PmocModel';
import EditModel from '../../components/Form/EditModel';
import EditPmocTitle from '../../components/Form/EditPmocTitle';
import EditPmocOption from '../../components/Form/EditPmocOption';
import DeletePmocModel from '../../components/Form/DeletePmocModel';
import DeletePmocTitle from '../../components/Form/DeletePmocTitle/inde';
import DeletePmocOption from '../../components/Form/DeleteOption';



export default  function PmocModel() {

  /* STYLES */
  const classes = useStyles();
  

  /* HOOKS */
  
  return (
    <div className={classes.root}>
      <Hearder/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            {/* Recent Pmoc */}
              <Grid item  xs={12}>
                <Paper className={classes.paper}>
                    <ChooseModel/>
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  <PmocMold />
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                  <PmocTitle />
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4} >
                <Paper className={classes.paper}>
                  <PmocOption />
                </Paper>
              </Grid> 
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <EditModel/>
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <EditPmocTitle/>
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <EditPmocOption/>
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <DeletePmocModel/>
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <DeletePmocTitle/>
                </Paper>
              </Grid>
              <Grid item  xs={12} md={6} lg={4}>
                <Paper className={classes.paper}>
                    <DeletePmocOption/>
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
  },
  fixedHeight: {
    height: 240,
  },
}))