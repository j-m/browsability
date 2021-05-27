import { init } from './init'

describe('init', () => {
  test('does nothing', async (done) => {
    init([])
    done()
  })
})
