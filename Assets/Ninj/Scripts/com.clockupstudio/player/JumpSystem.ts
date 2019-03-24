namespace com.clockupstudio.player {

    export class JumpSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Input, game.Gravity, ut.Entity, ut.Physics2D.SetVelocity2D],
                (_, input, gravity, entity, setVelocity2D) => {
                    const velocity = setVelocity2D.velocity;
                    if (ut.Runtime.Input.getKey(input.jump)) {
                        velocity.y = gravity.fallSpeed;
                    } else {
                        velocity.y = -gravity.fallSpeed
                    }
                    setVelocity2D.velocity = velocity;
                });
        }
    }
}
