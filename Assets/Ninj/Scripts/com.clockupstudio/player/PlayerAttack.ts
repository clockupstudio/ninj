
namespace com.clockupstudio.player {

    @ut.executeAfter(ut.Shared.InputFence)
    export class PlayerStartAttackSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputAttack, game.Slash],
                (player, inputAttack, slash) => {
                    if (!inputAttack.pressed) {
                        return;
                    }
                    console.log(`Pressed attack: ${inputAttack.pressed}`);
                    if (!this.world.hasComponent(player.entity, game.StartAttack)) {
                        this.world.addComponent(player.entity, game.StartAttack);
                        let startAttack = new game.StartAttack();
                        startAttack.timeLeft = 0.5;
                        com.clockupstudio.util.EntityUtil.setActive(this.world, slash.entity, true);
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
                [game.PlayerTag, game.StartAttack],
                (player, startAttack) => {
                    startAttack.timeLeft -= dt;
                    console.log(startAttack.timeLeft, dt)
                    if (startAttack.timeLeft <= 0) {
                        this.world.removeComponent(player.entity, game.StartAttack);
                        this.world.addComponent(player.entity, game.DoneAttack);
                    }
                }
            )
        }
    }

    export class PlayerAttackedSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.DoneAttack, game.Slash],
                (player, _, slash) => {
                    com.clockupstudio.util.EntityUtil.setActive(this.world, slash.entity, false);
                    this.world.removeComponent(player.entity, game.DoneAttack);
                }
            );
        }
    }

}
