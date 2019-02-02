namespace com.clockupstudio.player {

    // InputMovementSystem detect direction base on input.
    export class InputMovementSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Input, game.InputDirection],
                (_, input, inputDirection) => {
                    let dir = inputDirection.direction
                    if (ut.Runtime.Input.getKey(input.left)) {
                        [dir.x, dir.y] = [-1,0]
                    } else if (ut.Runtime.Input.getKey(input.right)) {
                        [dir.x, dir.y] = [1, 0]
                    } else {
                        [dir.x, dir.y] = [0, 0]
                    }
                    inputDirection.direction = dir
                }
            )
        }
    }
}
