import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hearder from '../../components/Header';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import EngineerTable from '../../components/Tables/EngineerTable';
import Notifications from '../../components/Form/Notification';
import EngeneerStatistics from '../../components/Statistic/Engineer';
import clsx from 'clsx';

export default  function Engineer() {

  /* STYLES */
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  
  return (
    <div className={classes.root}>
      <Hearder/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
             {/* Recent Uers */}
             <Grid item xs={12}>
              <Paper className={classes.paper}>
                <EngineerTable />
              </Paper>
            </Grid>
            {/* Form Notifications */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <Notifications typeUser={5}/>
              </Paper>
            </Grid>
            {/* Statistics  of the year */}
            <Grid item xs={12}  md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <EngeneerStatistics />
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