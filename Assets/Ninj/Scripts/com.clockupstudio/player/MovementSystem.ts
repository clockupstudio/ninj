namespace com.clockupstudio.player {

    export class MovementSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            const dt = this.scheduler.deltaTime();
            this.world.forEach(
                [game.PlayerTag, game.InputDirection, game.Movement, ut.Core2D.TransformLocalPosition],
                (_, inputDirection, movement, transformLocalPosition) => {
                    let pos = transformLocalPosition.position

                    pos.x += inputDirection.direction.x * movement.speed * dt
                    transformLocalPosition.position = pos
                }
            )
        }
    }
}
