import React, { useRef, useEffect } from "react"
import * as d3 from "d3"
import useResizeObserver from "./useResizeObserver"
import { fitTextInRectangle, colorScale } from "./utilities"
import Legend from "./Legend"

function Treemap({ selected, selectedOption }) {
  const svgRef = useRef()
  const wrapperRef = useRef()
  const dimensions = useResizeObserver(wrapperRef)

  const svg = d3.select(svgRef.current)
  svg.selectAll("g").remove()

  const root = d3
    .hierarchy(selected)
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value)

  const leaves = root.leaves()
  const totalTime = root.value

  useEffect(() => {
    if (!dimensions) return

    svg.attr("width", 500).attr("height", 500)

    const treemapRoot = d3.treemap().size([dimensions.width, dimensions.height]).padding(3).paddingInner(0)(root)

    const nodes = svg
      .selectAll("g")
      .data(treemapRoot.leaves())
      .join("g")
      .attr("transform", (d) => `translate(${d.x0},${d.y0})`)

    nodes
      .append("rect")

      .attr("height", (d) => d.y1 - d.y0)
      .attr("fill", (d) => colorScale(d.data.name))
      .style("stroke", "black")
      .style("stroke-width", 0.25)
      .attr("class", "rectangle")
      .transition()
      .duration(250)
      .attr("width", (d) => d.x1 - d.x0)

    nodes
      .append("text")
      .text((d) => d.data.name)
      .attr("text-anchor", "middle")
      .attr("class", "rectangleText")
      .attr("x", (d) => (d.x1 - d.x0) / 2) //rectangle's horizontal center
      .attr("y", (d) => (d.y1 - d.y0) / 1.5) // rectangle's vertical center
      .attr("font-size", (d) => `${Math.min((d.x1 - d.x0) / 8, (d.y1 - d.y0) / 2)}px`)
      .each(function (d) {
        fitTextInRectangle(this, d.x1 - d.x0)
      })

    nodes
      .on("mouseover", function (event, d) {
        d3.select(this)
          .select("text")
          .text((d) => `${((d.data.value / totalTime) * 100).toFixed(2)}%`)
          .attr("font-size", (d) => `${Math.min((d.x1 - d.x0) / 4, (d.y1 - d.y0) / 2)}px`)
      })
      .on("mouseout", function (event, d) {
        d3.select(this)
          .select("text")
          .text(d.data.name)
          .attr("font-size", (d) => `${Math.min((d.x1 - d.x0) / 8, (d.y1 - d.y0) / 4)}px`)
          .each(function (d) {
            fitTextInRectangle(this, d.x1 - d.x0)
          })
      })
  }, [selected, selectedOption, dimensions])

  return (
    <>
      <div ref={wrapperRef} style={{ marginBottom: "2rem" }}>
        <svg ref={svgRef} className="chart" />
      </div>
      <Legend leaves={leaves} selected={selected} totalTime={totalTime} />
    </>
  )
}

export default Treemap
