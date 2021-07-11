import { assess } from './assess'

describe('assess', () => {
  test('does nothing', async (done) => {
    assess([])
    done()
  })
})
