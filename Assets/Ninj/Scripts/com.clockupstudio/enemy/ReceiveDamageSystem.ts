namespace com.clockupstudio.enemy {

    /**
     * ReceiveDamageSystem decrease hp if collide with player slash.
     */
    export class ReceiveDamageSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.EnemyTag, ut.Physics2D.ColliderContacts, ut.Entity],
                (_, colliderContacts, entity) => {
                    for (let contact of colliderContacts.contacts) {
                        if (this.world.getEntityName(contact) === 'Slash') {
                            console.debug('got slash')
                            util.EntityUtil.addComponent(this.world, entity, game.EnemyDead);
                        }
                    }
                }
            )
        }
    }
}
