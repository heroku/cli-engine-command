// @flow

import nock from 'nock'
import Base from '../command'
import Heroku, {Vars} from './heroku'
import Netrc from 'netrc-parser'

jest.mock('netrc-parser', () => {
  return class {
    machines = {'api.heroku.com': {password: 'mypass'}}
  }
})

class Command extends Base {
  heroku = new Heroku(this, {required: false})
}

describe('vars', () => {
  it('sets vars by default', () => {
    const vars = new Vars({})
    expect(vars.host).toEqual('heroku.com')
    expect(vars.gitHost).toEqual('heroku.com')
    expect(vars.httpGitHost).toEqual('git.heroku.com')
  })

  it('respects HEROKU_HOST', () => {
    const vars = new Vars({HEROKU_HOST: 'https://customhost'})
    expect(vars.host).toEqual('https://customhost')
    expect(vars.gitHost).toEqual('customhost')
    expect(vars.httpGitHost).toEqual('customhost')
  })
})

describe('api client', () => {
  let api
  beforeEach(() => {
    api = nock('https://api.heroku.com')
  })
  afterEach(() => api.done())

  test('makes an HTTP request', async () => {
    api.get('/apps')
    .matchHeader('authorization', ':mypass')
    .reply(200, [{name: 'myapp'}])

    const cmd = await Command.run([], {mock: true})
    const response = await cmd.heroku.get('/apps')
    expect(response).toEqual([{name: 'myapp'}])
  })
})
