namespace com.clockupstudio.player {

    export class MovementDirectionSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.PreviousDirection, game.InputDirection, ut.Core2D.TransformLocalScale],
                (_, previousDirection, inputDirection, transformLocalScale) => {
                    const scale = transformLocalScale.scale;
                    const dir = inputDirection.direction;

                    if (dir.x != 0) {
                        if (dir.x < 0) {
                            // flip to left side.
                            scale.x = scale.x > 0 ? -scale.x : scale.x;
                        } else if (dir.x > 0) {
                            // flip to right side.
                            scale.x = Math.abs(scale.x);
                        }
                        previousDirection.direction = Object.create(dir);
                    } else {
                        if (previousDirection.direction.x < 0) {
                            scale.x = scale.x > 0 ? -scale.x : scale.x;
                        } else {
                            scale.x = Math.abs(scale.x);
                        }
                    }

                    transformLocalScale.scale = scale;
                }
            )
        }
    }
}
