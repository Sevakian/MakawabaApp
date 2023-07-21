import gameContext from './gaming/gameContext'
import consoleContext from './gaming/consoleContext'
import gameList from './gaming/gameList'
import consoleList from './gaming/consoleList'
import gameView from './gaming/gameView'

export default {
    namespaced: true,
    
    modules: {
      gameContext,
      consoleContext,
      gameList,
      consoleList,
      gameView
    }
  }
  