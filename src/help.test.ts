import Help from './help'
import { Command } from './command'
import { buildConfig } from 'cli-engine-config'
import { flags } from 'cli-flags'

class AppsCreate extends Command {
  static topic = 'apps'
  static command = 'create'
  static description = 'description of apps:create'

  static args = [{ name: 'app_name', description: 'app to use', required: false }]

  static help = `some

multiline help
`

  static flags = {
    force: flags.boolean({ description: 'force it' }),
    app: flags.string({ char: 'a', hidden: true }),
    foo: flags.string({ char: 'f', description: 'foobar' }),
    remote: flags.string({ char: 'r' }),
  }
}

const help = new Help(buildConfig({ mock: true }))

describe('commandLine()', () => {
  test('has help', () => {
    expect(help.command(AppsCreate)).toEqual(`Usage: cli-engine apps:create [APP_NAME] [flags]

description of apps:create

APP_NAME  app to use

Flags:
 -f, --foo FOO        foobar
 -r, --remote REMOTE
 --force              force it

some

multiline help
`)
  })

  test('has just flags', () => {
    expect(
      help.command(
        class extends Command {
          static topic = 'apps'
          static command = 'create'
          static flags = {
            force: flags.boolean({
              description: 'force it',
            }),
            app: flags.string({
              char: 'a',
              hidden: true,
            }),
            foo: flags.string({ char: 'f', description: 'foobar' }),
            remote: flags.string({ char: 'r' }),
          }
        },
      ),
    ).toEqual(`Usage: cli-engine apps:create [flags]

Flags:
 -f, --foo FOO        foobar
 -r, --remote REMOTE
 --force              force it
`)
  })

  test('has flags + description', () => {
    expect(
      help.command(
        class extends Command {
          static topic = 'apps'
          static command = 'create'
          static description = 'description of apps:create'
          static flags = {
            force: flags.boolean({
              description: 'force it',
            }),
            app: flags.string({
              char: 'a',
              hidden: true,
            }),
            foo: flags.string({ char: 'f', description: 'foobar' }),
            remote: flags.string({ char: 'r' }),
          }
        },
      ),
    ).toEqual(`Usage: cli-engine apps:create [flags]

description of apps:create

Flags:
 -f, --foo FOO        foobar
 -r, --remote REMOTE
 --force              force it
`)
  })

  test('has description + help', () => {
    expect(
      help.command(
        class extends Command {
          static topic = 'apps'
          static command = 'create'
          static help = 'description of apps:create'
          static flags = {
            force: flags.boolean({
              description: 'force it',
            }),
            app: flags.string({
              char: 'a',
              hidden: true,
            }),
            foo: flags.string({ char: 'f', description: 'foobar' }),
            remote: flags.string({ char: 'r' }),
          }
        },
      ),
    ).toEqual(`Usage: cli-engine apps:create [flags]

Flags:
 -f, --foo FOO        foobar
 -r, --remote REMOTE
 --force              force it

description of apps:create
`)
  })

  test('has description + args', () => {
    expect(
      help.command(
        class extends Command {
          static topic = 'apps'
          static command = 'create'
          static description = 'description of apps:create'
          static args = [{ name: 'app_name', description: 'app to use', required: false }]
        },
      ),
    ).toEqual(`Usage: cli-engine apps:create [APP_NAME]

description of apps:create

APP_NAME  app to use
`)
  })

  test('has aliases', () => {
    expect(
      help.command(
        class extends Command {
          static topic = 'apps'
          static command = 'create'
          static description = 'description of apps:create'
          static aliases = ['foo', 'bar']
          static args = [{ name: 'app_name', description: 'app to use', required: false }]
        },
      ),
    ).toEqual(`Usage: cli-engine apps:create [APP_NAME]

description of apps:create

Aliases:
  $ cli-engine foo
  $ cli-engine bar

APP_NAME  app to use
`)
  })
})

describe('command()', () => {
  test('has help', () => {
    expect(help.commandLine(AppsCreate)).toEqual(['apps:create [APP_NAME]', 'description of apps:create'])
  })
})