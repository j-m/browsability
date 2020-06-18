import {expect, test} from '@oclif/test'

import cmd = require('../../src')

describe('browsability', () => {
  test
  .stdout()
  .do(() => cmd.run([]))
  .it('runs', ctx => {
    expect(ctx.stdout).to.contain('hello world')
  })
})
