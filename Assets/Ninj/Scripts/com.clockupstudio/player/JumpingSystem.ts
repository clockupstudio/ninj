namespace com.clockupstudio.player {

    export class JumpingSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Input, game.Grounded, ut.Entity],
                (_, input, grounded, entity) => {

                    if (ut.Runtime.Input.getKey(input.jump)) {
                        this.world.removeComponent(entity, game.Grounded);
                        if(!this.world.hasComponent(entity, game.Rising)){
                            //let r = new game.Rising();
                            //r.maxHeight = 5
                            this.world.addComponent(entity, game.Rising);
                            //this.world.setComponentData(entity, game.Rising);
                        }
                    }
                });
        }

    }
}