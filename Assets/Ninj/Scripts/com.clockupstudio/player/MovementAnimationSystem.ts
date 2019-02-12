namespace com.clockupstudio.player {

    export class MovementAnimationSystem extends ut.ComponentSystem {

        private state:string = "IDLING";

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputDirection, game.InputAttack, game.PlayerActions, ut.Core2D.Sprite2DSequence, game.UnitStatus, ut.Entity],
                (_, inputDirection, inputAttack, playerActions, sprite2DSequence, unitStatus, entity) => {
                    let sprites = sprite2DSequence.sprites;
                    let dir = inputDirection.direction;

                    // assume player are moving.
                    console.log(this.state);
                    console.log(`Damaged status === ${unitStatus.damaged}`)
                    if(this.state == "ENTER_HIT") {
                        sprites = playerActions.hit;
                        this.state = "HITTING"
                        setTimeout((s: game.UnitStatus)=>{
                            console.log("HITTING DONE!!!")
                            //s.damaged = false;
                            this.world.forEach(
                                [game.PlayerTag, game.UnitStatus],
                                (_, u) => {
                                    u.damaged = false;
                                }
                            );
                            console.log(`After set ${s.damaged}`)
                            this.state = "IDLING"
                        }, 100, unitStatus);
                        //return;
                    }
                    else if(this.state == "IDLING") {
                        console.log(unitStatus.damaged);
                        if( unitStatus.damaged ) {
                            this.state = "ENTER_HIT";
                            return; 
                        }

                        if (inputAttack.pressed) {
                            sprites = playerActions.attack;
                        } else if (dir.x != 0) {
                            sprites = playerActions.move;
                        } else {
                            sprites = playerActions.stand;
                        }
                    }
                    

                    sprite2DSequence.sprites = sprites;
                }
            )
        }
    }
}
