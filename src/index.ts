import Map from './map'
class game {
  private map:Map
  constructor() {
    console.warn('tag', '')
    this.map = new Map()
  }
}
new game()