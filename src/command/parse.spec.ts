import { parse } from './parse'
import { assess } from './assess'
import { init } from './init'
import { BrowsabilityMessage } from '../common/BrowsabilityMessage'

jest.mock('./assess')
jest.mock('./init')
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
