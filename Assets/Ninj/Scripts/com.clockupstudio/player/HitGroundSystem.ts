namespace com.clockupstudio.player {

    /**
     * HitGroundSystem add component game.Grounded when player are on ground.
     */
    export class HitGroundSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.Entity, ut.Physics2D.ColliderContacts],
                (_, entity, colliderContacts) => {
                    const contacts = colliderContacts.contacts;
                    // means player are on the air.
                    if (contacts.length === 0) {
                        util.EntityUtil.removeComponent(this.world, entity, game.Grounded);
                        return;
                    }

                    if (this.world.getEntityName(contacts[0]) === 'Ground') {
                        util.EntityUtil.addComponent(this.world, entity, game.Grounded);
                    }
                }
            )
        }
    }
}
