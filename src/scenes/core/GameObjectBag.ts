import GameObject from "../../gameobjects/core/GameObject";

export default class GameObjectBag {
    private bag: GameObject[];
    constructor() {
        this.bag = [];
    }
    addGameObject(gameObject: GameObject) {
        this.bag.push(gameObject);
    }
    addGameObjects(gameObjects: GameObject[]) {
        this.bag.push.apply(this.bag, gameObjects);
    }
    each(action: (gameObject: GameObject) => void) {
        this.bag.forEach(action);
    }
    update() {
        this.each(gameObject => gameObject.update());
    }
    render() {
        this.each(gameObject => gameObject.render());
    }
}