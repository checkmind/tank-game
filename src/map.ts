import Tank from './tank'
enum state {
  stop,
  run
}
const code = `(function runGame(tank) {
  tank.state = state.run
  setInterval(() => {
    var org = Math.random() * 100
    tank.runOrg += org
    tank.shoot(org)
  },3000)
})`
const code2 = `(function runGame(tank) {
  tank.state = state.run
  setInterval(() => {
    var org = Math.random() * 100
    tank.runOrg += org
    tank.shoot(org)
  },3000)
})`
import { checkHit } from './utils'
import render from './render'

export default class GameMap {
  static width = 500
  static height = 500
  public width = GameMap.width
  public height = GameMap.height
  public x = 0
  public y = 0
  private heros:Array<Tank> = []
  private entRender:render
  public id:number;
  constructor() {
    this.entRender = new render()
    this.createTank()
    this.worldTime()
    this.id = Math.random()
  }
  private createTank() {
    const tank = new Tank('cxk')
    
    tank.loadCtrl(code)
    tank.create(0, 0)
    this.heros.push(tank)

    const badTank = new Tank('badTank')
    badTank.loadCtrl(code2)
    badTank.create(200, 0)
    this.heros.push(badTank)

  }
  private timer = null
  private worldTime() {
    if(this.timer) {
      clearInterval(this.timer)
    }
    this.timer = setTimeout(() => {
      this.worldTime()
    }, 60)
    this.update()
  }
  private update() {
    this.heros.map((tank) => {
      tank.update()
      this.entRender.render(tank)
      tank.shootMap = tank.shootMap.filter((shoot) => {
        shoot.update()
        if(shoot.x < 0 || shoot.y < 0 || shoot.x > this.width || shoot.y > this.height) {
          shoot.kill()
          this.entRender.render(shoot)
          return false
        }
        this.entRender.render(shoot)
        return true
      })
    })
    this.checkHits()
  }
  private checkHits() {
    this.heros = this.heros.filter(tank => {
      this.heros.map(others => {
        others.shootMap = tank.shootMap.filter((shoot) => {
          shoot.update()
          if(checkHit(tank, shoot) && tank.name !== shoot.name) {
            shoot.kill()
            tank.beHurt()
            this.entRender.render(shoot)
            console.warn('射中了')
            return false
          }
          this.entRender.render(shoot)
          return true
        })
      })
      this.entRender.render(tank)
      return tank.life > 0
    })
  }

}

// (function runGame(tank: Tank) {
//   console.log(tank)
//   setTimeout(() => {
//     tank.state = state.run
//   }, 1000)
//   setTimeout(() => {
//     tank.state = state.stop
//   }, 3000)
// })
