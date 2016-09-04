// This file ensures JSDOM is loaded before React is included
import 'helpers/cssModulesHook'
import 'helpers/globalJSDOM'
import nodeHookFilename from 'node-hook-filename'

process.env.DEBUG = false

nodeHookFilename([ '.jpeg' ])
