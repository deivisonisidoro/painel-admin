/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip} from 'recharts';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import { getUserStatistics } from '../../action';




export default function UserStatistics() {
  const theme = useTheme();
  

  const [user, setUser] = useState();

  const dispatch = useDispatch();
   /* EFFECTS */
   useEffect(()=>{
    const getPage = async ()=>{
      const response = dispatch(await getUserStatistics());
      setUser(response.payload);
      
    };

    getPage();
  }, []);
 
  return (
    <React.Fragment>
      <Title>Estatisticas de Criação de Usuário</Title>
      <ResponsiveContainer>
        <LineChart
          data={user}
          margin={{
            top: 16,
            right: 16,
            bottom: 0,
            left: 24,
          }}
        > 
          <XAxis dataKey="month" stroke={theme.palette.text.secondary}>
            <Label
                angle={0}
                position="insideBottom"
                style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
              >
              MÊS
              </Label>
          </XAxis>
          
          <YAxis stroke={theme.palette.text.secondary}>
            <Label
              angle={270}
              position="left"
              style={{ textAnchor: 'middle', fill: theme.palette.text.primary }}
            >
             USUÁRIOS CRIADOS
            </Label>
          </YAxis>
          <Line type="monotone" dataKey="quantity" stroke={theme.palette.primary.main} dot={true} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}