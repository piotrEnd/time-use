import * as d3 from "d3"

// options for Select component
function extractCountries(data) {
  const countries = data.children.map((countryObj) => countryObj.name)

  //remove duplicates
  const uniqueCountries = [...new Set(countries)]

  //transform the array into the desired structure
  const options = uniqueCountries.map((country) => ({ value: country, label: country }))

  return options
}

//data to work with, single country
function findCountryByName(countryList, targetName) {
  return countryList.children.find((country) => country.name === targetName)
}

//displayed text fits into the rectangle
function fitTextInRectangle(textElement, maxWidth) {
  const text = d3.select(textElement)
  const fontSize = parseFloat(text.attr("font-size"))
  const initialText = text.text()

  text.text(initialText) //reset text to original content to measure its width

  //check if the text exceeds the maxWidth
  while (text.node().getComputedTextLength() > maxWidth) {
    //reduce font size
    const currentFontSize = parseFloat(text.attr("font-size"))
    const newFontSize = currentFontSize * 0.9 //reduction factor to adjust
    text.attr("font-size", `${newFontSize}px`)
  }

  text.text(initialText)
}

const colors = ["#6D8700", "#9DB300", "#BAC600", "#C8D741", "#D8E46B", "#E2F1A0", "#4E689A", "#728AB2", "#80ABCD", "#ACCDDF", "#CEE5F2", "#A091C9", "#BC9ED6", "#CEA7DE"]
const colorScale = d3.scaleOrdinal(colors)

export { fitTextInRectangle, colorScale, extractCountries, findCountryByName }
