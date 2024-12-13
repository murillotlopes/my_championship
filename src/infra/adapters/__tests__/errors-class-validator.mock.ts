
export const errorsClassValidatorMock = [
  {
    target: { name: 123 },
    value: 123,
    property: 'name',
    children: [],
    constraints: { isString: 'name must be a string', test: 'name must be a something' }
  },
  {
    target: { phone: '123' },
    value: '123',
    property: 'phone',
    children: [],
    constraints: { isNumber: 'phone must be a number', minLength: 'phone must have a seven digit length' }
  }
]