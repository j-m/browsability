import { parse } from '../../../src/command'
import { assess } from '../../../src/command/assess'
import { init } from '../../../src/command/init'
import { BrowsabilityMessage } from '../../../src/common/BrowsabilityMessage'
jest.mock('../../../src/command/assess')
jest.mock('../../../src/command/init')
global.console.log = jest.fn()

describe('version', () => {
  test('-v recognised', async (done) => {
    parse(['-v'])
    expect(global.console.log).toHaveBeenCalledWith(BrowsabilityMessage.VERSION)
    done()
  })

  test('--version recognised', async (done) => {
    parse(['--version'])
    expect(global.console.log).toHaveBeenCalledWith(BrowsabilityMessage.VERSION)
    done()
  })

  test('must be only param', async (done) => {
    parse(['-v', '--init'])
    expect(global.console.log).toHaveBeenCalledWith(BrowsabilityMessage.VERSION)
    done()
  })
})

describe('help', () => {
  test('-h recognised', async (done) => {
    parse(['-h'])
    expect(global.console.log).toHaveBeenCalledWith(BrowsabilityMessage.HELP)
    done()
  })

  test('--help recognised', async (done) => {
    parse(['--help'])
    expect(global.console.log).toHaveBeenCalledWith(BrowsabilityMessage.HELP)
    done()
  })
})

describe('init', () => {
  test('--init recognised', async (done) => {
    parse(['--init'])
    expect(init).toHaveBeenCalled()
    done()
  })
})

describe('assess', () => {
  test('. recognised', async (done) => {
    parse(['.'])
    expect(assess).toHaveBeenCalled()
    done()
  })
})
