import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useDispatch, useSelector } from 'react-redux';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { logout } from '../services/Authentication/auth';
import { useHistory } from 'react-router-dom';
import Link from '@material-ui/core/Link';
import Item from './ListItem';
import Switch from '@material-ui/core/Switch';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    paddingRight: 24, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  textLogout: {
   marginRight: theme.spacing(2),
  },
  drawerPaper: {
    position: 'relative',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(7),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(15),
    },
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  
  /* STATES */
  
  /*HOOKS*/
  const dispatch = useDispatch();
  const open = useSelector(state => state.utilsReducer.menu_open);
  const darkMode = useSelector(state => state.utilsReducer.darkMode);
  const history = useHistory();


  /* FUNCTION */
  const handleDrawerOpen = () => {
    dispatch({ type: 'TOGGLE_MENU', payload: true});
  };
  const handleDrawerClose = () => {
    dispatch({ type: 'TOGGLE_MENU', payload: false});
  };


  return (
    <div className={classes.root}>
      <AppBar position="absolute" className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6"  noWrap className={classes.title}>
            <Link href="/" color="inherit" >
              Painel de Controle
            </Link>
          
          </Typography>
          <Switch
            checked={darkMode}
                  value={darkMode}
                  color='secondary'
                  onChange={() =>{ 
                    dispatch({ type: 'DARK_MODE', payload: !darkMode})
                  }}
                  className={classes.icons}
          />
          <IconButton 
            color="inherit"
            onClick={
              ()=>{
                logout();
                dispatch({ type: 'LOGOUT' });
                history.push('/')
              }
            }
          > 
            <Typography  className={classes.textLogout} component="p" variant="h6" color="inherit" noWrap >
              Sair
            </Typography>
            <ExitToAppIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <Item/>
        </List>
      </Drawer>
    </div>
  );
}