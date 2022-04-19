/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from 'react';
import { useTheme } from '@material-ui/core/styles';
import { LineChart, Line, XAxis, YAxis, Label, ResponsiveContainer, Tooltip} from 'recharts';
import Title from '../Title';
import { useDispatch } from 'react-redux';
import { getClientStatistics } from '../../action';




export default function ClientStatistics() {
  const theme = useTheme();
  

  const [client, setClient] = useState();

  const dispatch = useDispatch();
   /* EFFECTS */
   useEffect(()=>{
    const getPage = async ()=>{
      const response = dispatch(await getClientStatistics());
      setClient(response.payload);
      
    };

    getPage();
  }, []);

  return (
    <React.Fragment>
      <Title>Estatisticas de Criação de Clientes</Title>
      <ResponsiveContainer>
        <LineChart
          data={client}
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
                style={{ textAnchor: 'start', fill: theme.palette.text.primary }}
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
             CLIENTES CRIADAS
            </Label>
          </YAxis>
          <Line type="monotone"  dataKey="quantity"  stroke={theme.palette.primary.main} dot={true} />
          <Tooltip />
        </LineChart>
      </ResponsiveContainer>
    </React.Fragment>
  );
}