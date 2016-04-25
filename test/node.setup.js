import '~/scripts/helpers/cssModulesHook'
import '~/scripts/helpers/globalJSDOM'
import nodeHookFilename from 'node-hook-filename'

process.env.DEBUG = false

nodeHookFilename([ '.jpeg' ])
