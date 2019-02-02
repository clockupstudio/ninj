namespace com.clockupstudio.player {

    export class MovementSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            const dt = this.scheduler.deltaTime();
            this.world.forEach(
                [game.PlayerTag, game.Movement, ut.Core2D.TransformLocalPosition],
                (_, movement, transformLocalPosition) => {
                    let pos = transformLocalPosition.position

                    pos.x += movement.speed * dt
                    transformLocalPosition.position = pos
                    console.log(transformLocalPosition.position)
                }
            )
        }
    }
}
