import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { DrawMatchesInputDto } from '../draw-matches-input.dto'


describe('DrawMatchesInputDto unit test', () => {

  test('I expect the teams attribute to have 8 elements', async () => {

    const objt: DrawMatchesInputDto = {
      teams: [
        'Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8'
      ]
    }

    const prepValidate = plainToInstance(DrawMatchesInputDto, objt)
    const erros = await validate(prepValidate)

    expect(erros).toHaveLength(0)

  })

  test('I expect the object to be invalid when it has less than 8 elements', async () => {

    const objt: DrawMatchesInputDto = {
      teams: [
        'Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7'
      ]
    }

    const prepValidate = plainToInstance(DrawMatchesInputDto, objt)
    const erros = await validate(prepValidate)

    expect(erros).toHaveLength(1)
  })

  test('I expect the object to be invalid when it has more than 8 elements', async () => {

    const objt: DrawMatchesInputDto = {
      teams: [
        'Test 1', 'Test 2', 'Test 3', 'Test 4', 'Test 5', 'Test 6', 'Test 7', 'Test 8', 'Test 9'
      ]
    }

    const prepValidate = plainToInstance(DrawMatchesInputDto, objt)
    const erros = await validate(prepValidate)

    expect(erros).toHaveLength(1)
  })

  test('I expect the object to be invalid when any element is not a string', async () => {

    const objt = {
      teams: [
        'Test 1', 'Test 2', 123, 'Test 4', 'Test 5', 'Test 6', 'Test 7', 123
      ]
    }

    const prepValidate = plainToInstance(DrawMatchesInputDto, objt)
    const erros = await validate(prepValidate)

    expect(erros).toHaveLength(1)
  })

  test('I expect the object to be invalid when any element is not a string', async () => {

    const objt = {
      teams: [
        'Test 1', 'Test 2', 123, 'Test 4', 'Test 5', 'Test 6', 'Test 7', 123
      ]
    }

    const prepValidate = plainToInstance(DrawMatchesInputDto, objt)
    const erros = await validate(prepValidate)

    expect(erros).toHaveLength(1)
  })

  test('I expect the teams attribute to be an array', async () => {

    const objt = {
      teams: 'Test'
    }

    const prepValidate = plainToInstance(DrawMatchesInputDto, objt)
    const erros = await validate(prepValidate)

    expect(erros).toHaveLength(1)
  })

})