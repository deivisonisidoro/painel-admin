import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import PersonIcon from '@material-ui/icons/Person';
import PeopleIcon from '@material-ui/icons/People';
import BusinessIcon from '@material-ui/icons/Business';
import BuildIcon from '@material-ui/icons/Build';
import AssignmentIcon from '@material-ui/icons/Assignment';
import { useHistory } from 'react-router-dom';
import { Divider, ListSubheader } from '@material-ui/core';

export default function Item() {
  /*HOOKS*/
  const history = useHistory();

  return (
    <div>
       <ListItem onClick={()=>{history.push('/usuario')}} button>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText  primary="Usuários" />
          </ListItem>
          <ListItem onClick={()=>{history.push('/empresa')}} button>
            <ListItemIcon>
              <BusinessIcon />
            </ListItemIcon>
            <ListItemText primary="Empresas" />
          </ListItem>
          <ListItem  onClick={()=>{history.push('/tecnico')}} button>
            <ListItemIcon>
              <BuildIcon />
            </ListItemIcon>
            <ListItemText primary="Técnicos" />
          </ListItem>
          <ListItem onClick={()=>{history.push('/cliente')}} button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Clientes" />
          </ListItem>
          <ListItem onClick={()=>{history.push('/engenheiro')}} button>
            <ListItemIcon>
              <PersonIcon />
            </ListItemIcon>
            <ListItemText primary="Engenheiros" />
          </ListItem>
          <Divider />
          <ListSubheader inset>Serviços</ListSubheader>
          <ListItem onClick={()=>{history.push('/ordem-de-servico')}} button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="OS" />
          </ListItem>
          <ListItem onClick={()=>{history.push('/orcamento')}} button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Orçamento" />
          </ListItem>
          <ListItem onClick={()=>history.push('/pmoc')} button>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Pmoc" />
          </ListItem>
    </div>
  );
}
