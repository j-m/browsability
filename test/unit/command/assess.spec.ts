import { assess } from '../../../src/command/assess'

describe('assess', () => {
  test('does nothing', async (done) => {
    assess([])
    done()
  })
})
