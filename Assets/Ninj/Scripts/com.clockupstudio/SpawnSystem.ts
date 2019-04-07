namespace com.clockupstudio {

    const bossGroup = 'game.BossGroup'

    function randomPosition(): number {
        return Math.random() > 0.5 ? 1 : 0;
    }

    /** New System */
    export class SpawnSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.Spawner],
                (spawner) => {
                    spawner.time += this.scheduler.deltaTime();
                    if (spawner.time < spawner.delay) {
                        return
                    }

                    spawner.time = 0

                    let entity = ut.EntityGroup.instantiate(this.world, spawner.group);
                    if (entity.length == 0) {
                        console.log('cannot find entity group');
                    }

                    this.world.usingComponentData(
                        entity[0],
                        [ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale, game.InputDirection],
                        (transformLocalPosition, transformLocalScale, inputDirection) => {
                            const spawnIndex = randomPosition()
                            const pos = spawner.positions[spawnIndex]

                            transformLocalPosition.position = pos
                            console.log(`spawn at position: [${transformLocalPosition.position.x},${transformLocalPosition.position.y}]`)

                            const scale = transformLocalScale.scale
                            if (spawnIndex === 0) {
                                scale.x = Math.abs(scale.x)
                                inputDirection.direction = new Vector2(1, 0);
                            } else {
                                scale.x = scale.x > 0 ? -scale.x : scale.x
                                inputDirection.direction = new Vector2(-1, 0);
                            }

                            transformLocalScale.scale = scale;
                        }
                    )
                }
            )
        }
    }
}
