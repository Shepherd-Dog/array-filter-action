import * as process from 'process'
import * as core from '@actions/core'
import * as main from '../src/main'

test('input provided for `arrayToFilter` that is not a JSON array', async() => {
  process.env['INPUT_ARRAYTOFILTER'] = 'not a JSON array'

  const setFailedMock = jest.spyOn(core, 'setFailed')
  await main.default()
  expect(setFailedMock).toBeCalled()
})

test('input provided for `arrayToFilter` that is not a JSON array of strings', async() => {
  process.env['INPUT_ARRAYTOFILTER'] = '[1, 2, 3]'

  const setFailedMock = jest.spyOn(core, 'setFailed')
  await main.default()
  expect(setFailedMock).toBeCalled()
})

test('array is not filtered when no filter is provided', async() => {
  process.env['INPUT_ARRAYTOFILTER'] = '["test1.swift", "test2.swift", "test3.yml"]'

  const setOutputMock = jest.spyOn(core, 'setOutput')
  await main.default()
  expect(setOutputMock).toHaveBeenCalledWith(
    'filteredArray',
    '["test1.swift","test2.swift","test3.yml"]',
  )
})

test('array is filtered by suffix when one is provided', async() => {
  process.env['INPUT_ARRAYTOFILTER'] = '["test1.swift", "test2.swift", "test3.yml"]'
  process.env['INPUT_SUFFIXFILTER'] = '.swift'

  const setOutputMock = jest.spyOn(core, 'setOutput')
  await main.default()
  expect(setOutputMock).toHaveBeenCalledWith(
    'filteredArray',
    '["test1.swift","test2.swift"]',
  )
})