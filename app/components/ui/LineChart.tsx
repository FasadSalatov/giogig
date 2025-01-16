import dynamic from 'next/dynamic';
import { ApexOptions } from 'apexcharts';
import { useEffect, useState } from 'react';

const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });

interface LineChartProps {
  data: {
    x: string;
    y: [number, number, number, number];
  }[];
  height?: number;
  showToolbar?: boolean;
}

export function LineChart({
  data,
  height = 120,
  showToolbar = false
}: LineChartProps) {
  const [windowWidth, setWindowWidth] = useState<number>(0);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Set initial width
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Convert candlestick data to line chart data (using closing prices)
  const seriesData = data?.map(item => ({
    x: new Date(item.x).getTime(),
    y: item.y[3] // Using closing price
  })) || [];

  const getFontSize = () => {
    if (windowWidth < 640) return '8px'; // sm
    if (windowWidth < 768) return '9px'; // md
    return '10px'; // lg and above
  };

  const options: ApexOptions = {
    chart: {
      type: 'bubble',
      height: height,
      background: 'transparent',
      toolbar: {
        show: showToolbar,
      },
      animations: {
        enabled: true,
        speed: 300,
        dynamicAnimation: {
          enabled: true,
          speed: 150
        }
      },
      parentHeightOffset: 0,
      sparkline: {
        enabled: false
      },
      zoom: {
        enabled: true
      }
    },
    stroke: {
      curve: 'straight',
      width: 3,
      lineCap: 'square',
    },
    colors: ['#f1da8b'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.2,
        opacityFrom: 0.15,
        opacityTo: 0.5,
        stops: [0, 100]
      },
    },
    grid: {
      show: true,
      borderColor: 'rgba(255, 255, 255, 0.14)',
      strokeDashArray: 6,
      position: 'back',
      padding: {
        top: -10,
        right: 0,
        bottom: -10,
        left: 0
      },
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
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
          colors: 'rgba(255, 255, 255, 0.4)',
          fontSize: getFontSize(),
          fontFamily: 'Inter, sans-serif',
        },
        format: 'dd MMM',
        datetimeUTC: false,
        offsetY: -5,
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
          color: 'rgba(241, 218, 139, 0.2)',
          width: 1,
          dashArray: 0,
        },
      },
      tooltip: {
        enabled: false,
      },
    },
    yaxis: {
      labels: {
        show: true,
        style: {
          colors: 'rgba(255, 255, 255, 0.4)',
          fontSize: getFontSize(),

        },
        formatter: (value) => value.toFixed(1),
        offsetX: -10,
      },
      axisBorder: {
        show: false,
      },
      axisTicks: {
        show: false,
      },
      floating: false,
      forceNiceScale: true,
    },
    tooltip: {
      theme: 'dark',
      x: {
        format: 'dd MMM yyyy',
      },
      style: {
        fontSize: getFontSize(),
      },
      marker: {
        show: false,
      },
      custom: function ({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const timestamp = w.globals.seriesX[seriesIndex][dataPointIndex];
        const date = new Date(timestamp).toLocaleDateString('en-US', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        });
        return '<div class="custom-tooltip">' +
          '<span class="date">' + date + '</span>' +
          '<span class="value">$' + value.toFixed(2) + '</span>' +
          '</div>';
      }
    },
    markers: {
      size: 0,
      strokeWidth: 0,
      hover: {
        size: 0,
        sizeOffset: 0,
      }
    },
    dataLabels: {
      enabled: false
    },
    plotOptions: {
      bubble: {
        minBubbleRadius: 0,
        maxBubbleRadius: 0
      }
    },
    responsive: [{
      breakpoint: 640,
      options: {
        chart: {
          height: '100%'
        },
        yaxis: {
          tickAmount: 3,
          labels: {
            offsetX: -20,
          }
        },
        grid: {
          padding: {
            top: 0,
            right: 0,
            bottom: 0,
            left: 5
          }
        }
      }
    }]
  };

  return (
    <div className="w-6/12 h-[130px] overflow-hidden">
      <Chart
        options={options}
        series={[{
          name: 'Price',
          data: seriesData
        }]}
        type="area"
        height={height}
        width="100%"
        className="min-w-[200px]"
      />
    </div>
  );
}
