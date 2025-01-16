'use client'

import { useEffect, useRef } from 'react'
import * as d3 from 'd3'
import { feature } from 'topojson-client'
import type { Topology } from 'topojson-specification'
import type { FeatureCollection, Geometry } from 'geojson'

export function WorldMap() {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      const topology = await response.json() as Topology
      const geojson = feature(topology, topology.objects.countries) as FeatureCollection<Geometry>

      if (!svgRef.current) return

      const svg = d3.select(svgRef.current)
      const width = svgRef.current.clientWidth
      const height = svgRef.current.clientHeight

      // Создаем проекцию
      const projection = d3.geoMercator()
        .fitSize([width, height], geojson)

      // Создаем path generator
      const pathGenerator = d3.geoPath().projection(projection)

      // Очищаем предыдущую карту
      svg.selectAll('*').remove()

      // Добавляем страны
      svg.selectAll('path')
        .data(geojson.features)
        .enter()
        .append('path')
        .attr('d', pathGenerator)
        .attr('fill', '#27272a')
        .attr('stroke', '#f59e0b')
        .attr('stroke-width', 0.5)
        .attr('stroke-opacity', 0.2)
        .attr('class', 'transition-all duration-300')
        .on('mouseover', function() {
          d3.select(this)
            .attr('fill', '#f59e0b')
            .attr('fill-opacity', 0.1)
            .attr('stroke-opacity', 0.5)
        })
        .on('mouseout', function() {
          d3.select(this)
            .attr('fill', '#27272a')
            .attr('stroke-opacity', 0.2)
        })
    }

    fetchData()
  }, [])

  return (
    <svg 
      ref={svgRef} 
      width="100%" 
      height="100%" 
      viewBox="0 0 800 500" 
      preserveAspectRatio="xMidYMid meet"
    />
  )
}
