import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hearder from '../../components/Header';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CompanyTable from '../../components/Tables/CompanyTable';
import Notifications from '../../components/Form/Notification';
import CompanyStatistics from '../../components/Statistic/Company';
import clsx from 'clsx';

export default  function Company() {

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
            <Grid item xs={12}  md={8} lg={8}>
              <Paper className={classes.paper}>
                <CompanyTable />
              </Paper>
            </Grid>
            {/* Form Notifications */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <Notifications typeUser={3}/>
              </Paper>
            </Grid>
            {/* Statistics  of the year */}
            <Grid item xs={12}  md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <CompanyStatistics />
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