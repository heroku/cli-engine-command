// // @flow

// import Topic from './topic'
// import Command from './command'
// import Output from './output'
// import Config from './config'
// import {Flag} from './flag'

// class PluginsTopic extends Topic {
//   static topic = 'plugins'
// }

// class PluginsIndex extends Command {
//   static topic = 'plugins'
// }

// class PluginsInstall extends Command {
//   static topic = 'plugins'
//   static command = 'install'
//   static description = 'installs a plugin'
//   static args = [
//     {name: 'plugin'},
//     {name: 'channel', optional: true}
//   ]
//   static flags = {
//     force: Flag.with({char: 'f', description: 'jam it'}),
//     aflag: Flag.with({char: 'a'}),
//     bflag: Flag.with({char: 'b'}),
//     cflag: Flag,
//     dflag: Flag
//   }
// }

// const commands = [ PluginsIndex, PluginsInstall ]

// test('listCommandsHelp()', async () => {
//   let output = new Output(new Config({mock: true}))
//   const topic = new PluginsTopic(commands, output)
//   await topic.help(['plugins'])
//   expect(output.stdout.output).toContain('plugins:install PLUGIN [CHANNEL] # installs a plugin')
// })

// test('commandHelp()', async () => {
//   let output = new Output(new Config({mock: true}))
//   const topic = new PluginsTopic(commands, output)
//   await topic.help(['plugins'], PluginsInstall)
//   expect(output.stdout.output).toContain('cli-engine-command plugins:install PLUGIN [CHANNEL]')
//   expect(output.stdout.output).toContain('-f, --force # jam it')
// })
