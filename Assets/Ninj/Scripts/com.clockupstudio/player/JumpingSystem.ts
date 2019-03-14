namespace com.clockupstudio.player {

    export class JumpingSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Input, game.JumpingCount],
                (_, input, jumpingCount) => {
                    if( jumpingCount.count > 0) {
                        return;
                    }

                    if (ut.Runtime.Input.getKey(input.jump)) {
                        let player = this.world.getEntityByName("Player")
                        let transform = this.world.getComponentData(player, ut.Core2D.TransformLocalPosition);

                        ut.Tweens.TweenService.addTween(this.world,
                            player,
                            ut.Core2D.TransformLocalPosition.position.y,
                            transform.position.y, transform.position.y + 2,
                            .1,
                            0,
                            ut.Core2D.LoopMode.Once,
                            ut.Tweens.TweenFunc.Linear,
                            true
                        );

                        jumpingCount.count += 1;
                    }
                });
        }

    }
}