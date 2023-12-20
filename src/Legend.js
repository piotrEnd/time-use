import React, { useRef } from "react"
import * as d3 from "d3"
import { colorScale } from "./utilities"
import "./App.css"

const Legend = ({ leaves, selected, totalTime }) => {
  const legendRef = useRef(null)

  const fontSize = 15

  const legendContainer = d3.select(legendRef.current)
  legendContainer.selectAll("g").remove()

  const legend = legendContainer.selectAll("g").data(leaves).join("g")
  legendContainer.attr("width", 375).attr("height", 425)

  legend
    .append("rect")
    .attr("width", fontSize * 2.25)
    .attr("height", fontSize)
    .attr("x", fontSize / 2)
    .attr("y", (_, i) => fontSize * 2 * i)
    .attr("fill", (d) => colorScale(d.data.name))

  legend
    .append("text")
    .attr("class", "legendText")
    .attr("transform", `translate(0, ${fontSize})`)
    .attr("x", fontSize * 4)
    .attr("y", (_, i) => fontSize * 2 * i)
    .style("font-size", fontSize)
    .text((d) => `${d.data.name}: ${d.data.value} min`)

  legend
    .on("mouseover", function (event, d) {
      d3.select(this)
        .select("text")
        .text((d) => `${d.data.name} consumes ${((d.data.value / totalTime) * 100).toFixed(2)}% of your day.`)
    })
    .on("mouseout", function (event, d) {
      d3.select(this)
        .select("text")
        .text((d) => `${d.data.name}: ${d.data.value} min`)
    })

  return (
    <>
      <div className="legend">
        <div className="left">
          <h3>Your average 24 hours in {selected.name}</h3>
          <svg ref={legendRef} />
        </div>

        <div className="right">
          <p className="story">The data comes from the OECD where respondents described their activities which were then re-coded by national statistical agencies into a set of descriptive categories. </p>
          <p className="story">There are many similarities across countries. We spend the most time working and sleeping; and paid work, housework, leisure, eating and sleeping take together 80-90% of the 1440 minutes that we all have available every day.</p>
          <p className="story">There are some differences too. In China and Mexico people spend, on an average day, almost twice as much time on paid work as people in Italy and France do. This is a general pattern: People in richer countries can afford to work less.</p>
          <p className="story">Keep in mind that this chart shows the average for all people in the working age bracket, from 15 to 64 years, whether they are actually employed or not.</p>
          <p className="story">
            Data source and story:{" "}
            <a href="https://ourworldindata.org/time-use" target="_blank" rel="noopener noreferrer">
              Our World in Data
            </a>
            <span>
              Designed by: <a href="mailto: piotrend@gmail.com">piotrEnd</a>
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Legend
