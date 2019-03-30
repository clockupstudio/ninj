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
}
