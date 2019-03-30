namespace com.clockupstudio.enemy {

    function randomSpawnSide(): SpawnSide {
        return Math.random() > 0.5 ? SpawnSide.Right : SpawnSide.Left;
    }

    enum SpawnSide {
        Left = 0,
        Right
    }

    const MoveDirection = {
        Left: new Vector2(-1, 0),
        Right: new Vector2(1, 0),
    }

    /**
     * directionFromSpawnSide set move direction base on spawn side.
     * @param side which side that enemy spawn.
     */
    function directionFromSpawnSide(side: SpawnSide): Vector2 {
        if (side == SpawnSide.Left) {
            return MoveDirection.Right;
        }
        return MoveDirection.Left;
    }

    /**
     * SpawnSystem spawn entity from given EntityGroup and flip horizontal base
     * which side that spawn.
     */
    export class SpawnSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            const dt = this.scheduler.deltaTime();

            this.world.forEach(
                [game.Spawner],
                (spawner) => {
                    spawner.time += dt;
                    if (spawner.time < spawner.delay) {
                        return
                    }

                    spawner.time = 0

                    let entities = ut.EntityGroup.instantiate(this.world, spawner.group);
                    if (entities.length == 0) {
                        console.log('cannot find entity group');
                        return;
                    }

                    const side = randomSpawnSide()

                    let dir = new game.InputDirection();
                    dir.direction = directionFromSpawnSide(side);
                    this.world.setComponentData(entities[0], dir)

                    // set flip direction
                    this.world.usingComponentData(
                        entities[0],
                        [ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale],
                        (transformLocalPosition, transformLocalScale) => {
                            transformLocalPosition.position = spawner.positions[side]
                            console.log(`spawn at position: [${transformLocalPosition.position.x},${transformLocalPosition.position.y}]`)

                            const scale = transformLocalScale.scale
                            if (side === SpawnSide.Left) {
                                scale.x = Math.abs(scale.x);
                            } else {
                                scale.x = scale.x > 0 ? -scale.x : scale.x;
                            }

                            transformLocalScale.scale = scale;
                        }
                    )
                }
            )
        }
    }
}
