import { init } from '../../../src/command/init'

describe('init', () => {
  test('does nothing', async (done) => {
    init([])
    done()
  })
})
