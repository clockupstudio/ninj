namespace com.clockupstudio.player {
    export interface PlayerState {
        OnUpdate(world: ut.World): PlayerState;
    }

    export class NormalState implements PlayerState {
        OnUpdate(world: ut.World): PlayerState {

            let nextState: PlayerState = this;
            world.forEach(
                [game.PlayerTag, game.InputDirection, game.InputAttack, game.PlayerActions, ut.Core2D.Sprite2DSequence, game.UnitStatus],
                (_, inputDirection, inputAttack, playerActions, sprite2DSequence, unitStatus) => {

                    if (unitStatus.damaged) {
                        nextState = new EnterHitState();
                        return;
                    }

                    let sprites = sprite2DSequence.sprites;
                    let dir = inputDirection.direction;

                    if (inputAttack.pressed) {
                        sprites = playerActions.attack;
                    } else if (dir.x != 0) {
                        sprites = playerActions.move;
                    } else {
                        sprites = playerActions.stand;
                    }
                    sprite2DSequence.sprites = sprites;
                });

            return nextState;
        }
    }

    export class EnterHitState implements PlayerState {
        OnUpdate(world: ut.World): PlayerState {
            world.forEach(
                [game.PlayerTag, game.PlayerActions, ut.Core2D.Sprite2DSequence],
                (_, playerActions, sprite2DSequence) => {
                    sprite2DSequence.sprites = playerActions.hit;

                    setTimeout(() => {
                        world.forEach(
                            [game.PlayerTag, game.UnitStatus],
                            (_, u) => {
                                u.damaged = false;
                            }
                        );
                    }, 100);
                });
            return new HittingState();
        }
    }

    export class HittingState implements PlayerState {
        OnUpdate(world: ut.World): PlayerState {
            let nextState: PlayerState = this;

            world.forEach(
                [game.PlayerTag, game.UnitStatus],
                (_, unitStatus) => {
                    if( unitStatus.damaged == false ){
                        nextState = new NormalState();
                    }
                });
            return nextState;
        }
    }
}