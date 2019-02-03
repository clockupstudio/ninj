namespace com.clockupstudio.player {

    export class MovementDirectionSystem extends ut.ComponentSystem {

        private previousDirection: Vector2 = new Vector2(1, 0)

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputDirection, ut.Core2D.TransformLocalScale],
                (_, inputDirection, transformLocalScale) => {
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
                        this.previousDirection = Object.create(dir);
                    } else {
                        if (this.previousDirection.x < 0) {
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
