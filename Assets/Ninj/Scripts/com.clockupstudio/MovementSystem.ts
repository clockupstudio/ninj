namespace com.clockupstudio {

    export class MovementSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            const dt = this.scheduler.deltaTime();
            this.world.forEach(
                [game.InputDirection, game.Movement, ut.Entity, ut.Physics2D.Velocity2D],
                (inputDirection, movement, entity, _) => {
                    var velocity2D = new ut.Physics2D.SetVelocity2D();
                    velocity2D.velocity = new Vector2(inputDirection.direction.x * movement.speed, 0);
                    this.world.addComponentData(entity, velocity2D);
                }
            )
        }
    }
}
