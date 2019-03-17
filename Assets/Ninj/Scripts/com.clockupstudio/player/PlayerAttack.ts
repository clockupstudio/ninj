
namespace com.clockupstudio.player {

    export class EntityUtil {
        static setActive(world: ut.World, entity: ut.Entity, visible: boolean): void {
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
    export class PlayerStartAttackSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            // TODO: cleanup components query.
            this.world.forEach(
                [game.PlayerTag, game.InputAttack, game.Slash, ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale],
                (player, inputAttack, slash, transformLocalPosition, transformLocalScale) => {
                    if (!inputAttack.pressed) {
                        return;
                    }
                    console.log(`Pressed attack: ${inputAttack.pressed}`);
                    if (!this.world.hasComponent(player.entity, game.StartAttack)) {
                        this.world.addComponent(player.entity, game.StartAttack);
                        let startAttack = new game.StartAttack();
                        startAttack.timeLeft = 0.5;
                        startAttack.showSlashEffect = true;
                        this.world.setComponentData(player.entity, startAttack);
                    }
                }
            )
        }
    }

    export class PlayerAttackingSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            const dt = this.world.scheduler().deltaTime();
            this.world.forEach(
                [game.PlayerTag, game.StartAttack, game.Slash],
                (player, startAttack, slash) => {
                    startAttack.timeLeft -= dt;
                    console.log(startAttack.timeLeft, dt)
                    if (startAttack.timeLeft <= 0) {
                        startAttack.showSlashEffect = false;
                        this.world.removeComponent(player.entity, game.StartAttack);
                        this.world.addComponent(player.entity, game.DoneAttack);
                    }
                    EntityUtil.setActive(this.world, slash.entity, startAttack.showSlashEffect);
                }
            )
        }
    }

    export class PlayerAttackedSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.DoneAttack],
                (player, _) => {
                    this.world.removeComponent(player.entity, game.DoneAttack);
                }
            );
        }
    }

}
