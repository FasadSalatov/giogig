"use client";

import { useEffect, useRef } from 'react';
import { createChart, IChartApi } from 'lightweight-charts';

interface PriceChartProps {
  data: Array<{
    time: string;
    value: number;
  }>;
  title?: string;
  height?: number;
}

const PriceChart = ({ data, title = '', height = 300 }: PriceChartProps) => {
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const chartRef = useRef<IChartApi | null>(null);

  useEffect(() => {
    const updateDimensions = () => {
      if (chartContainerRef.current) {
        const width = chartContainerRef.current.clientWidth;
        
        if (chartRef.current) {
          chartRef.current.applyOptions({ 
            width: width,
            height: width < 600 ? Math.min(300, height) : height
          });
        }
      }
    };

    if (!chartContainerRef.current) return;

    const chart = createChart(chartContainerRef.current, {
      layout: {
        background: { color: '#000000' },
        textColor: '#DDD',
      },
      grid: {
        vertLines: { color: '#1e222d' },
        horzLines: { color: '#1e222d' },
      },
      width: chartContainerRef.current.clientWidth,
      height: chartContainerRef.current.clientWidth < 600 ? Math.min(300, height) : height,
    });

    const areaSeries = chart.addAreaSeries({
      lineColor: '#F1DA8B',
      topColor: '#F1DA8B50',
      bottomColor: '#00000000',
    });

    areaSeries.setData(data);
    chart.timeScale().fitContent();
    chartRef.current = chart;

    window.addEventListener('resize', updateDimensions);
    const resizeObserver = new ResizeObserver(updateDimensions);
    resizeObserver.observe(chartContainerRef.current);

    return () => {
      window.removeEventListener('resize', updateDimensions);
      resizeObserver.disconnect();
      chart.remove();
    };
  }, [data, height]);

  return (
    <div className="w-full">
      {title && (
        <h3 className="text-base sm:text-lg font-semibold mb-2 text-white/90 px-2 sm:px-0">{title}</h3>
      )}
      <div ref={chartContainerRef} className="w-full overflow-hidden" />
    </div>
  );
};

export default PriceChart;
