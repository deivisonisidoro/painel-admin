import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Hearder from '../../components/Header';
import UserTable from '../../components/Tables/UserTable';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Notifications from '../../components/Form/Notification';
import CreateUser from '../../components/Form/Create/User';
import { useSelector } from 'react-redux';
import OptionAdminCard from '../../components/Cards/OptionAdminCard';
import ChooseUser from '../../components/Form/Choose/User';
import UserStatistics from '../../components/Statistic/User';
import clsx from 'clsx';


export default  function User() {

  /* STYLES */
  const classes = useStyles();
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);
  /* HOOKS */
  const {page_create_user, page_choose_user} = useSelector(state => state.utilsReducer);

  return (
    <div className={classes.root}>
      <Hearder/>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <Container  maxWidth="lg" className={classes.container}>
          <Grid container spacing={5}>
             {/* Recent Uers */}
             <Grid item xs={12}  md={8} lg={8}>
              <Paper className={classes.paper}>
                <UserTable />
              </Paper>
            </Grid>
            {/* Form Notifications */}
            <Grid item  xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                <Notifications typeUser={0}/>
              </Paper>
            </Grid>
            {/* Statistics  of the year */}
            <Grid item xs={12}  md={8} lg={8}>
              <Paper className={fixedHeightPaper}>
                <UserStatistics />
              </Paper>
            </Grid>
            {/* Create or Update */}
            <Grid item xs={12} md={4} lg={4}>
              <Paper className={classes.paper}>
                {!page_create_user && !page_choose_user ? 
                  <OptionAdminCard/>:
                  null
                }
                {page_create_user && 
                  <CreateUser/>
                }  
                {page_choose_user && 
                  <ChooseUser/>
                }
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