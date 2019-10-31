import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { useSelector} from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import Chart from 'react-apexcharts';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  }
}));

function ChartView() {
  const [chartOptions, setOptions] = useState({});
  const classes = useStyles();
  const chartData = useSelector(state => {
    if (state.storiesList.chartData)
      return [{
      name: 'Stories score chart',
      data: [...state.storiesList.chartData]
      }];
    else
      return false
    });
  
  return (
    <div className="Chart">
      <h1>Chart</h1>
      <Button variant="contained" color="secondary" className={classes.button} component={Link} to='/'>
        Back
      </Button>
      {chartData && chartData[0].data.length > 1 ? 
        <Chart
          options={chartOptions}
          series={chartData}
          type="line"
          width="100%"
          height="200%"
        />:
        <div>Data for graph not yet loaded, please wait ...</div>}
    </div>
  );
}

export default ChartView;
