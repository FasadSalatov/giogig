import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface CandlestickChartProps {
  data: {
    x: string;
    y: [number, number, number, number]; // [Open, High, Low, Close]
  }[];
  height?: number;
  showToolbar?: boolean;
}

export function CandlestickChart({
  data,
  height = 300,
  showToolbar = false
}: CandlestickChartProps) {
  const options: ApexOptions = {
    chart: {
      type: 'candlestick',
      height: height,
      width: '100%',
      background: 'transparent',
      toolbar: {
        show: showToolbar,
        tools: {
          download: false,
          selection: showToolbar,
          zoom: showToolbar,
          zoomin: showToolbar,
          zoomout: showToolbar,
          pan: showToolbar,
          reset: showToolbar,
        },
      },
      animations: {
        enabled: true,
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350
        }
      },
    },
    grid: {
      show: true,
      borderColor: 'rgba(255, 255, 255, 0.01)',
      strokeDashArray: 3,
      position: 'back',
      xaxis: {
        lines: {
          show: true
        }
      },
      yaxis: {
        lines: {
          show: true
        }
      },
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
    },
    theme: {
      mode: 'dark',
    },
    xaxis: {
      type: 'datetime',
      labels: {
        show: true,
        style: {
          colors: 'rgba(255, 255, 255, 0.5)',
          fontSize: '10px',
        },
        format: 'dd MMM',
        datetimeUTC: false,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      crosshairs: {
        show: true,
        stroke: {
          color: 'rgba(255, 255, 255, 0.1)',
          width: 1,
          dashArray: 3,
        },
      },
    },
    yaxis: {
      tooltip: {
        enabled: true,
      },
      labels: {
        style: {
          colors: 'rgba(255, 255, 255, 0.5)',
          fontSize: '10px',
        },
        formatter: (value) => value.toFixed(2),
      },
      floating: false,
      crosshairs: {
        show: true,
        position: 'back',
        stroke: {
          color: 'rgba(255, 255, 255, 0.1)',
          width: 1,
          dashArray: 3,
        },
      },
    },
    plotOptions: {
      candlestick: {
        colors: {
          upward: 'hsl(var(--chart-2))',
          downward: 'hsl(var(--chart-1))',
        },
        wick: {
          useFillColor: true,
        },
      },
    },
    tooltip: {
      theme: 'dark',
      style: {
        fontSize: '12px',
      },
      x: {
        show: true,
        format: 'dd MMM yyyy HH:mm',
      },
      y: {
        formatter: (value) => `${value.toFixed(2)} USDT`,
      },
      custom: ({ seriesIndex, dataPointIndex, w }) => {
        const o = w.globals.seriesCandleO[seriesIndex][dataPointIndex];
        const h = w.globals.seriesCandleH[seriesIndex][dataPointIndex];
        const l = w.globals.seriesCandleL[seriesIndex][dataPointIndex];
        const c = w.globals.seriesCandleC[seriesIndex][dataPointIndex];

        return `
          <div class="p-2">
            <div>O: ${o.toFixed(2)}</div>
            <div>H: ${h.toFixed(2)}</div>
            <div>L: ${l.toFixed(2)}</div>
            <div>C: ${c.toFixed(2)}</div>
          </div>
        `;
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
        }
      }
    },
  };

  const series = [{
    data: data.map(item => ({
      x: new Date(item.x).getTime(),
      y: item.y,
    })),
  }];

  return (
    <div className="max-w-6/12 overflow-auto overflow-y-hidden">
      <Chart
        options={options}
        series={series}
        type="candlestick"
        height={100}
        width="100%"
      />
    </div>
  );
}
