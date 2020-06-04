
/**
 * 坦克状态，停止或跑
 */
enum state {
  stop,
  run,
  defend,
  shoot
}
import { calMove } from './utils'
import Shoot from './Shoot'
import GameMap from './map';
export default class Tank {
  public name:string;
  public id:number;
  public life:number = 10
  public width:number = 20
  public height:number = 20
  public x:number = 0
  public y:number = 0
  // 步长
  private step:number = 1
  // 状态
  public state: state = state.stop
  public runOrg:number = 90
  private shootOrg:number
  private defend:boolean = false
  // 子弹cd 1s
  private shootCD = 0
  public shootMap:Array<Shoot> = []
  constructor(name: string) {
    this.name = name
    this.id = Math.random()
  }
  public create(x, y) {
    console.log(`创建${this.name}`)
    this.x = x
    this.y = y
  }
  public beHurt() {
    this.life -=  1
    if(this.life <= 0) {
      this.kill()
    }
  }
  private kill() {
    console.log(`${this.name}被杀死`)
  }
  public toDefend() {
    console.log('守卫')
    this.state = state.defend
    setTimeout(() => {
      this.state = state.stop
    }, 1000)
  }
  public move() {
    this.runOrg = (this.runOrg % 360)
    const { x, y } = calMove(this.runOrg)
    if(this.x <= 0 && this.runOrg >= 180) {
      return
    }
    if(this.y <= 0 ) {
      if(this.runOrg > 270 && this.runOrg <= 360) {
        return
      }
      if(this.runOrg >= 0 && this.runOrg < 90) {
        return
      }
    }
    if(this.y > GameMap.height) {
      if(this.runOrg > 90 && this.runOrg < 270) {
        return
      }
    }
    if(this.x > GameMap.width) {
      if(this.runOrg > 0 && this.runOrg < 180) {
        return
      }
    }
    this.x = Math.round((this.x + Math.round(x)) * 100) / 100
    this.y = Math.round((this.y + Math.round(y)) * 100) / 100
  }
  /**
   * 
   * @param org 射击方向
   */
  public shoot(org:number) {
    // 可以射击
    if(this.shootCD === 0) {
      this.shootCD = 1
      const shoot = new Shoot(this.x, this.y, org, this.name)
      this.shootMap.push(shoot)
      const id = setTimeout(() => {
        this.shootCD = 0
        clearTimeout(id)
      }, 500)
      return
    }
    console.log('未冷却')
  }
  public update() {
    if(this.state === state.stop) {
      return
    }
    this.move()
  }
  /**
   * 载入蔡徐坤 ctrl
   * 会把当前坦克的所有信息传过去
   * @param code
   */
  public loadCtrl(code: string) {
    try {
      const runGame = eval(code)
      runGame(this)
    } catch(e) {
      console.log(e)
    }
  }
}
