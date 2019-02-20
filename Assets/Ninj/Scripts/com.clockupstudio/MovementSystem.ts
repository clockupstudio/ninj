namespace com.clockupstudio {

    export class MovementSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            const dt = this.scheduler.deltaTime();
            this.world.forEach(
                [game.InputDirection, game.Movement, ut.Core2D.TransformLocalPosition],
                (inputDirection, movement, transformLocalPosition) => {
                    let pos = transformLocalPosition.position

                    pos.x += inputDirection.direction.x * movement.speed * dt
                    pos.y += inputDirection.direction.y * movement.speed

                    transformLocalPosition.position = pos
                }
            )
        }
    }
}
