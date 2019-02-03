namespace com.clockupstudio.player {

    export class MovementAnimationSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputDirection, game.InputAttack, game.PlayerActions, ut.Core2D.Sprite2DSequence],
                (_, inputDirection, inputAttack, playerActions, sprite2DSequence) => {
                    let sprites = sprite2DSequence.sprites;
                    let dir = inputDirection.direction;

                    // assume player are moving.
                    if (inputAttack.pressed) {
                        sprites = playerActions.attack;
                    } else if (dir.x != 0) {
                        sprites = playerActions.move;
                    } else {
                        sprites = playerActions.stand;
                    }

                    sprite2DSequence.sprites = sprites;
                }
            )
        }
    }
}
