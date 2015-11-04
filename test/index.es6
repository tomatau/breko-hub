import {expect} from 'chai'
import lodash from 'lodash/index'

setGlobals((typeof GLOBAL == 'undefined') ? window : GLOBAL)

function setGlobals(global){
  global.global = global
  global.expect = expect
  global._ = lodash
}
