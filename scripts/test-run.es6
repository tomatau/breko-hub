import path from 'path'
import Mocha from 'mocha'
import glob from 'glob'
import { TESTS, ROOT } from '~/src/config/paths'

const mocha = new Mocha({
  reporter: 'nyan',
  ui: 'bdd',
})

const filesToRun = [
  ...[ `${TESTS}/index.es6` ],
  ...glob.sync('**/*.test.es6'),
]

filesToRun.forEach(file => {
  mocha.addFile(path.resolve(ROOT, file))
})

mocha.run(failures => {
  process.on('exit', () => {
    process.exit(failures)
  })
})

