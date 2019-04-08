
namespace com.clockupstudio.player {

    /**
     * DecreaseHpSystem decrease health base from received damaged.
     */
    export class DecreaseHpSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Damaged, game.UnitStatus, ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale, ut.Entity],
                (_, damaged, status, transformPosition, transformScale, entity) => {
                    // don't decrease if status still true.
                    if (status.damaged) {
                        return;
                    }
                    status.health -= damaged.damage;
                    status.damaged = true;
                    transformPosition.position = this.calculateReactionDirection(transformPosition.position, transformScale.scale)
                    util.EntityUtil.removeComponent(this.world, entity, game.Damaged);
                }
            )
        }

        /**
         * calculateReactionDirection calculate a new position base on current position and direction.
         * @param position current position of entity.
         * @param direction current direction of entity.
         */
        private calculateReactionDirection(position: Vector3, direction: Vector3): Vector3 {
            return new Vector3(position.x + (-1 * direction.x), position.y, position.z);
        }
    }
}
