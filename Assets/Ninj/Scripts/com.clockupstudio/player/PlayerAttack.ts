
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

    export class SoundAttackingSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.StartAttack, game.PlayerAudioActions, ut.Entity],
                [ut.Subtractive(game.AudioPlayed)],
                (_, startAttack, audio, entity) => {
                    util.EntityUtil.addComponent(this.world, entity, ut.Audio.AudioSource);
                    this.world.setComponentData(entity, new ut.Audio.AudioSource(audio.slash, 1))
                    util.EntityUtil.addComponent(this.world, entity, ut.Audio.AudioSourceStart);
                    util.EntityUtil.addComponent(this.world, entity, game.AudioPlayed);
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
                [game.PlayerTag, game.DoneAttack, game.Slash, ut.Entity],
                (player, _, slash, entity) => {
                    com.clockupstudio.util.EntityUtil.setActive(this.world, slash.entity, false);
                    this.world.removeComponent(player.entity, game.DoneAttack);
                    util.EntityUtil.removeComponent(this.world, entity, game.AudioPlayed);
                }
            );
        }
    }

}
