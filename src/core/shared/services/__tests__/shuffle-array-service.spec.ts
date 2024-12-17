import { ShuffleArray } from '../shuffle-array.service'



describe('ShuffleArray unit tests', () => {

  let sut: ShuffleArray

  beforeAll(() => {

    sut = new ShuffleArray()

  })

  test('I expect to be defined', () => {

    expect(sut).toBeDefined()

  })

  test('I expect it to return a shuffled list', () => {

    const arrayA = [0, 1, 2, 3, 4, 5, 6]
    const arrayB = [{ name: 'q' }, { name: 'w' }, { name: 'e' }, { name: 'r' }, { name: 't' }]

    const resultA = sut.shuffle([...arrayA])
    const resultB = sut.shuffle([...arrayB])

    expect(resultA).not.toStrictEqual(arrayA)
    expect(resultB).not.toStrictEqual(arrayB)

    expect(resultA).toEqual(expect.arrayContaining(arrayA))
    expect(resultB).toEqual(expect.arrayContaining(arrayB))

  })

})