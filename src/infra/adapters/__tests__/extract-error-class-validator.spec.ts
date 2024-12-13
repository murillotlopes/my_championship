import { extractErrorClassValidator } from '../extract-error-class-validator'
import { errorsClassValidatorMock } from './errors-class-validator.mock'

describe('ExtractErrorClassValidation unit tests', () => {

  test('I expect it to return an object that contains the validation errors', () => {

    const extractedError = extractErrorClassValidator(errorsClassValidatorMock)

    expect(extractedError).toStrictEqual({
      name: ['name must be a string', 'name must be a something'],
      phone: ['phone must be a number', 'phone must have a seven digit length']
    })

  })

})