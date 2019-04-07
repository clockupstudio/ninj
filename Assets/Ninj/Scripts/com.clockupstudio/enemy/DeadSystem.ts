namespace com.clockupstudio.enemy {

    /**
     * DeadSystem set dead animationn and remove collision component
     */
    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    export class DeadSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.EnemyTag, game.EnemyDead, game.EnemyActions, ut.Core2D.Sprite2DSequence, ut.Entity],
                (_, dead, actions, sprite2DSeq, entity) => {
                    sprite2DSeq.sprites = actions.dead;
                    // prevent it move and hit the player.
                    util.EntityUtil.removeComponent(this.world, entity, game.Movement);
                    util.EntityUtil.removeComponent(this.world, entity, ut.Physics2D.SetVelocity2D);
                    util.EntityUtil.removeComponent(this.world, entity, ut.Physics2D.Velocity2D);
                    util.EntityUtil.removeComponent(this.world, entity, ut.Physics2D.BoxCollider2D);
                    util.EntityUtil.removeComponent(this.world, entity, ut.Physics2D.RigidBody2D);
                }
            )
        }
    }
}
