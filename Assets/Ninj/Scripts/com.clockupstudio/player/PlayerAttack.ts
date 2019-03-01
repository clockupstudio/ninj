
namespace com.clockupstudio.player {

    const EntityUtil = {
        setActive(world: ut.World, entity: ut.Entity, visible: boolean) {
            if (visible) {
                if (world.hasComponent(entity, ut.Disabled)) {
                    world.removeComponent(entity, ut.Disabled);
                }
            } else {
                if (!world.hasComponent(entity, ut.Disabled)) {
                    world.addComponent(entity, ut.Disabled);
                }
            }
        }
    }

    @ut.executeAfter(ut.Shared.InputFence)
    export class PlayerAttack extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputAttack, game.Slash, ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale],
                (_, inputAttack, slash, transformLocalPosition, transformLocalScale) => {
                    if (inputAttack.pressed == false) {
                        EntityUtil.setActive(this.world, slash.entity, false);
                        return;
                    }
                    EntityUtil.setActive(this.world, slash.entity, true);
                }
            )
        }
    }
}
