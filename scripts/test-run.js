import '~/scripts/helpers/cssModulesHook'
import path from 'path'
import Mocha from 'mocha'
import glob from 'glob'
import { TESTS, ROOT } from 'config/paths'
import { argv } from 'yargs'

const mocha = new Mocha({
  reporter: argv.reporter || 'nyan',
  ui: 'bdd',
})

const filesToRun = [
  ...[ `${TESTS}/index.js` ],
  ...glob.sync('./{src,test}/**/*.test.js'),
]

filesToRun.forEach(file => {
  mocha.addFile(path.resolve(ROOT, file))
})

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures)
  })
})

