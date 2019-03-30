namespace com.clockupstudio.player {

    @ut.executeAfter(ut.Shared.InputFence)
    export class JumpInputSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Grounded, game.Input, ut.Entity],
                (_, grounded, input, entity) => {
                    if (ut.Runtime.Input.getKeyUp(input.jump)) {
                        console.debug('start jumping...')
                        util.EntityUtil.removeComponent(this.world, entity, game.Grounded);
                        util.EntityUtil.addComponent(this.world, entity, game.Jumping);
                    }
                });
        }
    }

    @ut.executeAfter(ut.Shared.UserCodeStart)
    export class JumpingSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Jumping, game.Gravity, ut.Physics2D.SetVelocity2D, ut.Core2D.TransformLocalPosition, ut.Entity],
                (_, rising, gravity, setVelocity2D, transformPosition, entity) => {
                    const velocity = setVelocity2D.velocity;
                    velocity.y = gravity.fallSpeed;
                    setVelocity2D.velocity = velocity;

                    if (transformPosition.position.y > 1.5) {
                        util.EntityUtil.removeComponent(this.world, entity, game.Jumping);
                        util.EntityUtil.addComponent(this.world, entity, game.Falling);
                    }
                }
            )
        }
    }

    @ut.executeAfter(ut.Shared.UserCodeStart)
    export class FallingSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Falling, game.Gravity, ut.Physics2D.SetVelocity2D, ut.Entity],
                (_, falling, gravity, setVelocity2D, entity) => {
                    console.debug('falling...')
                    const velocity = setVelocity2D.velocity;
                    velocity.y = -gravity.fallSpeed;
                    setVelocity2D.velocity = velocity;
                }
            )
        }
    }

    @ut.executeAfter(ut.Shared.UserCodeStart)
    export class OnGroundedSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Grounded, ut.Entity],
                (_, grounded, entity) => {
                    util.EntityUtil.removeComponent(this.world, entity, game.Falling);
                }
            )
        }
    }
}
