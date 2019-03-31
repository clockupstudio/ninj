namespace com.clockupstudio.enemy {

    /**
     * DeadSystem set dead animationn and remove collision component
     */
    @ut.executeAfter(ut.Shared.UserCodeStart)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    export class DeadSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.EnemyTag, game.EnemyDead, game.EnemyActions, ut.Core2D.Sprite2DSequence, ut.Physics2D.SetVelocity2D, ut.Entity],
                (_, dead, actions, sprite2DSeq, setVelocity2D, entity) => {
                    setVelocity2D.velocity = new Vector2(0, 0);
                    sprite2DSeq.sprites = actions.dead;
                    // prevent hit player when enemy die.
                    util.EntityUtil.removeComponent(this.world, entity, ut.Physics2D.BoxCollider2D);
                }
            )
        }
    }
}
