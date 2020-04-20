# Array filter action

This action will take an array formatted as a JSON string, filter that array by the suffix provided, and return the filtered array.

## Inputs

### arrayToFilter

_Required_  - `string` - the array you want to filter formatted as a JSON string.

### suffixFilter

_Optional_  - `string` - the suffix you want to filter the array by, such as the file extension for an array of file names.

## Outputs

### filteredArray

steps.array_filter.outputs.filteredArray - `string` - A filtered array formatted as a JSON string.

## Example usage

```yaml
name: changes
on: push
jobs:
  changes:
    runs-on: ubuntu-latest
    steps:
      - id: file_changes
        uses: trilom/file-changes-action@v1.2.3
      - id: array_filter
        uses: shepherd-dog/array-filter-action@v1.2.3
        with:
          arrayToFilter: steps.file_changes.outputs.files
          suffixFilter: ".swift"
      - name: GitHub Action for SwiftLint (Only files changed in the PR)
          uses: norio-nomura/action-swiftlint@3.1.0
          env:
            changedFiles: ${{ steps.array_filter.outputs.filteredArray }}
```