namespace com.clockupstudio.player {

    export class JumpingSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            console.log("JUMP UPDATE");
            this.world.forEach(
                [game.PlayerTag, ut.Entity, game.Input, ut.Core2D.TransformLocalPosition],
                (_, entity, input, transform) => {
                    console.log("JUMP QUERY");
                    console.log(input.jump);
                    console.log(ut.Runtime.Input.getKey(input.jump));
                    console.log(`Key up ${ut.Runtime.Input.getKeyUp(input.jump)}`);
                    if (ut.Runtime.Input.getKeyUp(input.jump)) {
                        console.log("JUMP BEGIN===========================");
                        
                        let player = this.world.getEntityByName("Player")
                        let transform = this.world.getComponentData(player,ut.Core2D.TransformLocalPosition);
                        
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
                    }
                });
        }

    }
}