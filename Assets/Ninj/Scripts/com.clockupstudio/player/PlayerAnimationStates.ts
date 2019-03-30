namespace com.clockupstudio.player {
    export interface PlayerAnimationState {
        OnUpdate(world: ut.World): PlayerAnimationState;
    }

    export class NormalState implements PlayerAnimationState {
        OnUpdate(world: ut.World): PlayerAnimationState {

            let nextState: PlayerAnimationState = this;
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

    export class EnterHitState implements PlayerAnimationState {
        OnUpdate(world: ut.World): PlayerAnimationState {
            world.forEach(
                [game.PlayerTag, game.PlayerActions, ut.Core2D.Sprite2DSequence],
                (_, playerActions, sprite2DSequence, entity) => {
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

    export class HittingState implements PlayerAnimationState {
        OnUpdate(world: ut.World): PlayerAnimationState {
            let nextState: PlayerAnimationState = this;

            world.forEach(
                [game.PlayerTag, game.UnitStatus],
                (_, unitStatus) => {
                    if (unitStatus.damaged == false) {
                        nextState = new NormalState();
                    }
                });
            return nextState;
        }
    }
}
