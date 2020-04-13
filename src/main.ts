import * as core from '@actions/core'

async function run(): Promise<void> {
  try {
    const inputArrayJSON: string = core.getInput('arrayToFilter', { required: true })

    const suffixFilter: string = core.getInput('suffixFilter')

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

    core.setOutput('filteredArray', JSON.stringify(filteredArray))
  } catch (error) {
    core.setFailed(error.message)
  }
}

function isStringArray(value: any): boolean {
  return Array.isArray(value) && !value.some(item => typeof item !== "string");
}

run()

export default run