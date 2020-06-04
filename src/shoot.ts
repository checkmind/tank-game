
/**
 * 子弹状态，停止或跑
 */
enum state {
  stop,
  run,
  defend,
  shoot
}
import { calMove } from './utils'
export default class Shoot {
  public name:string;
  public life:number = 1
  public width:number = 5
  public height:number = 5
  public x:number = 0
  public y:number = 0
  public id:number;
  // 步长
  private step:number = 1
  // 状态
  public state: state = state.stop
  public runOrg:number = 90
  private shootOrg:number
  private defend:boolean = false
  constructor(x: number, y:number, org:number, name:string) {
    this.x = x
    this.y = y
    this.runOrg = org
    this.name = name
    this.id = Math.random()
  }
  public create() {
    console.log(`创建子弹`)
  }
  public beHurt() {
    this.life -=  1
    if(this.life <= 0) {
      this.kill()
    }
  }
  public kill() {
    console.log('子弹销毁')
    this.life = 0
  }
  public move() {
    const { x, y } = calMove(this.runOrg, this.step)
    this.x = Math.round((this.x + Math.round(x)) * 1000) / 1000
    this.y = Math.round((this.y + Math.round(y)) * 1000) / 1000
  }
  /**
   * 
   * @param org 射击方向
   */
  public shoot(org:number) {
    this.shootOrg = org
  }
  public update() {
    if(this.life <= 0) {
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
    const runGame = eval(code)
    runGame(this)
  }
}
