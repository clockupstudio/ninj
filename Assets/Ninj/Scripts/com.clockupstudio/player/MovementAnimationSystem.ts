namespace com.clockupstudio.player {

    export class MovementAnimationSystem extends ut.ComponentSystem {

        private state: string = "IDLING";

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputDirection, game.InputAttack, game.PlayerActions, ut.Core2D.Sprite2DSequence, game.UnitStatus, ut.Entity],
                (_, inputDirection, inputAttack, playerActions, sprite2DSequence, unitStatus, entity) => {
                    let sprites = sprite2DSequence.sprites;
                    let dir = inputDirection.direction;

                    if (this.state == "ENTER_HIT") {
                        sprites = playerActions.hit;
                        this.state = "HITTING";
                        setTimeout((s: game.UnitStatus) => {
                            this.world.forEach(
                                [game.PlayerTag, game.UnitStatus],
                                (_, u) => {
                                    u.damaged = false;
                                }
                            );
                            this.state = "IDLING"
                        }, 100, unitStatus);
                    }
                    else if (this.state == "IDLING") {
                        if (unitStatus.damaged) {
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
