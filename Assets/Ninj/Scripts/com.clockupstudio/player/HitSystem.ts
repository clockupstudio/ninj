namespace com.clockupstudio.player {

    /**
     * HitSystem decrease health when player hit enemy.
     */
    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.Physics2D.ColliderContacts, ut.Entity],
                (_, colliderContacts, entity) => {
                    const contacts = colliderContacts.contacts
                    if (contacts.length === 0) {
                        return;
                    }

                    for (var contact of contacts) {
                        if (this.world.hasComponent(contact, game.EnemyTag)) {
                            // skip decrease because they are in damaged state.
                            if (this.world.hasComponent(entity, game.Damaged)) {
                                continue
                            }
                            console.debug('received damage')
                            let damaged = new game.Damaged();
                            damaged.damage = 1
                            this.world.addComponentData(entity, damaged);
                        } else if (this.world.getEntityName(contact) === 'Ground') {
                            // game.Grounded always add because it received collision and jump event at
                            // the same time.
                            if (!this.world.hasComponent(entity, game.Jumping)) {
                                util.EntityUtil.addComponent(this.world, entity, game.Grounded);
                            }
                        }
                    }
                }
            )
        }
    }

    /**
     * HealthDecreaseSystem decrease health base from received damaged.
     */
    export class HealthDecreaseSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Damaged, game.UnitStatus, ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale, ut.Entity],
                (_, damaged, status, transformPosition, transformScale, entity) => {
                    // don't decrease if status still true.
                    if (status.damaged) {
                        return;
                    }
                    console.debug('decrease damaged');
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
