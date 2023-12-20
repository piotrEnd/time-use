import { useState, useEffect } from "react"
import * as d3 from "d3"
import dataset from "./Time-Use-in-OECD-Countries-OECD.csv"

export const useData = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const csvData = await d3.csv(dataset)
        const processedData = processData(csvData)
        setData(processedData)
      } catch (error) {
        console.error("Error loading data:", error)
      }
    }

    fetchData()
  }, [])

  const processData = (csvData) => {
    const result = { name: "countries", children: [] }

    csvData.forEach((row) => {
      const country = row.Country
      const category = row.Category
      const time = +row.Time

      let countryEntry = result.children.find((child) => child.name === country) //find the country in the children array or create a new entry

      if (!countryEntry) {
        countryEntry = {
          name: country,
          children: [
            { name: "occupation", children: [] },
            { name: "daily", children: [] },
            { name: "leisure", children: [] },
          ],
        }
        result.children.push(countryEntry)
      }

      let categoryEntry = countryEntry.children.find((child) => child.name === getCategoryType(category)) //find the category entry based on the category name
      categoryEntry.children.push({ name: category, value: time }) //add category and time to the category entry
    })

    return result
  }

  //helper function to determine the category type
  const getCategoryType = (category) => {
    if (category === "Paid work" || category === "Education" || category === "Other unpaid work & volunteering") {
      return "occupation"
    } else if (category === "Sleep" || category === "Housework" || category === "Eating and drinking" || category === "Personal care" || category === "Care for household members" || category === "Shopping") {
      return "daily"
    } else {
      return "leisure"
    }
  }

  return data
}
