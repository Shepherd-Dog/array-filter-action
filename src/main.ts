import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const inputArrayJSON: string|null = core.getInput('arrayToFilter', { required: true })
    let outputFormat: string|null = core.getInput('outputFormat')

    if (outputFormat == null) {
      outputFormat = "json"
    }

    const suffixFilter: string|null = core.getInput('suffixFilter')

    const inputArray = JSON.parse(inputArrayJSON);

    let filteredArray: any[]
    if (isStringArray(inputArray)) {
      const stringArray: string[] = inputArray
      filteredArray = stringArray.filter(item => {
        if (suffixFilter != null) {
          return item.endsWith(suffixFilter)
        }
        return true
      })
    } else {
      throw new TypeError("Array provided is not an array of strings")
    }

    let output = JSON.stringify(filteredArray)

    if (outputFormat.toLowerCase() == "space_delimited") {
      output = filteredArray.join(" ")
    } else if (outputFormat.toLowerCase() == "comma_delimited") {
      output = filteredArray.join(",")
    }

    core.setOutput('filteredArray', output)
  } catch (error) {
    core.setFailed(error.message)
  }
}

function isStringArray(value: any): boolean {
  return Array.isArray(value) && !value.some(item => typeof item !== "string");
}

run()

export default run