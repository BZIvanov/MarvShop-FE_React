import Chart from 'react-apexcharts';

const state = {
  series: [
    {
      name: 'Orders',
      data: [23, 34, 45, 56, 76, 34, 23, 76, 87, 78, 34, 45],
    },
    {
      name: 'Revenue',
      data: [67, 39, 45, 56, 90, 56, 23, 56, 87, 78, 67, 78],
    },
    {
      name: 'Sellers',
      data: [34, 39, 56, 56, 80, 67, 23, 56, 98, 78, 45, 56],
    },
  ],
  options: {
    color: ['#181ee8', '#181ee8'],
    plotOptions: {
      radius: 30,
    },
    chart: {
      background: 'transparent',
      foreColor: '#d0d2d6',
    },
    dataLabels: {
      enabled: false,
    },
    strock: {
      show: true,
      curve: ['smooth', 'straight', 'stepline'],
      lineCap: 'butt',
      colors: '#f0f0f0',
      width: 0.5,
      dashArray: 0,
    },
    xaxis: {
      categories: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    },
    legend: {
      position: 'top',
    },
    responsive: [
      {
        breakpoint: 565,
        yaxis: {
          categories: [
            'Jan',
            'Feb',
            'Mar',
            'Apr',
            'May',
            'Jun',
            'Jul',
            'Aug',
            'Sep',
            'Oct',
            'Nov',
            'Dec',
          ],
        },
        options: {
          plotOptions: {
            bar: {
              horizontal: true,
            },
          },
          chart: {
            height: '550px',
          },
        },
      },
    ],
  },
};

const ChartSection = () => {
  return (
    <div className='w-full bg-[#6a5fdf] p-4 rounded-md'>
      <Chart
        options={state.options}
        series={state.series}
        type='bar'
        height={350}
      />
    </div>
  );
};

export default ChartSection;
