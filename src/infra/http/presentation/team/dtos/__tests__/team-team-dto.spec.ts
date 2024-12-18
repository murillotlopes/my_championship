import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { extractErrorClassValidator } from '../../../../../adapters/extract-error-class-validator'
import { EditTeamDto } from '../edit-team.dto'

describe('EditTeamDto unit test', () => {

  test('I expect the name attribute to be a string', async () => {

    const objtTest = { name: 'Test' }

    const prepValidate = plainToInstance(EditTeamDto, objtTest)
    const erros = await validate(prepValidate)

    expect(erros.length).toBe(0)

  })

  test('I expect the name attribute to not be validated when its value is different from a string', async () => {

    const objtTest = { name: 123 }

    const prepValidate = plainToInstance(EditTeamDto, objtTest)
    const erros = await validate(prepValidate)
    const errorExtracted = extractErrorClassValidator(erros)

    expect(erros.length).toBe(1)
    expect(errorExtracted).toStrictEqual({ name: ['name must be a string'] })

  })


})