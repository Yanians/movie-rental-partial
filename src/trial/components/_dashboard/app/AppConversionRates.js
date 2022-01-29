import { merge } from 'lodash';

import ReactApexChart from 'react-apexcharts';

import { Box, Card, CardHeader } from '@mui/material';

import {fNumber } from '../../../utils/formatNumber';

import { BaseOptionChart } from '../../charts';

const CHART_DATA = [{data: [ 400, 430, 448, 470, 540, 580, 690, 1100, 1200, 1380 ]}];

export default function AppConversionRates(){

	const chartOptions = merge(BaseOptionChart(),{
		tooltip:{
			 marker: {show:false},
			 y:{
			 	formatter: seriesName => fNumber(seriesName),
			 	title:{formatter: seriesName => `#${seriesName}`}
			 }
		},

		plotOptions: {
			bar:{horizontal: true, barHeight:'28%',borderRadius:2}
		},

		xaxis: {category:[
			    'Italy',
			    'Japan',
			    'China',
			    'France',
			    'Canada',
			    'Germany',
			    'Netherlands',
			    'South Korea',
			    'United States',
			    'United Kingdom'
			]}
	});
    
    return(
       <Card>
       	<CardHeader title="Conversion Rates" subheader="(40%) than last year" />
         <Box sx={{mx:3}} alt="ltr">
          <ReactApexChart type="bar" series={CHART_DATA} options={chartOptions} height={364} />
         </Box>       		
       </Card>
    	);
}

















