import React, { useState } from "react"
import Treemap from "./Treemap"
import "./App.css"
import { useData } from "./useData"
import { extractCountries, findCountryByName } from "./utilities"
import Select from "react-select"
import ClockLoader from "react-spinners/ClockLoader"

function App() {
  const data = useData()
  const [selectedOption, setSelectedOption] = useState("Germany")

  if (!data) {
    return <ClockLoader color="#80ABCD" cssOverride={{ display: "block", margin: "25vh auto" }} size={200} />
  }

  const options = extractCountries(data)
  const selectedData = findCountryByName(data, selectedOption)

  return (
    <div className="App">
      <div className="header">
        <h1>
          Time use{" "}
          <span role="img" aria-label="Card File Box">
            🗃️
          </span>{" "}
        </h1>
        <p className="opening">
          The chart displays how we allocate our time across different day-to-day activities.
          <span>Feel free to compare how people across the world spend their time.</span>
        </p>
      </div>
      <div className="select-container">
        <h3>How do people in</h3>
        <Select options={options} defaultValue={options[8]} onChange={(e) => setSelectedOption(e.value)} autoFocus isSearchable={false} className="select" />
        <h3>spend their average day?</h3>
      </div>
      <Treemap selected={selectedData} selectedOption={selectedOption} />
    </div>
  )
}

export default App
