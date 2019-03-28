namespace com.clockupstudio {

    const bossGroup = 'game.BossGroup'

    function randomPosition(): number {
        return Math.random() > 0.5 ? 1 : 0;
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

                    const spawnIndex = randomPosition()
                    const pos = spawner.positions[spawnIndex]

                    let dir = new game.InputDirection();
                    switch (spawnIndex) {
                        case 0:
                            dir.direction = new Vector2(1, 0);
                            break;
                        case 1:
                            dir.direction = new Vector2(-1, 0);
                            break;
                    }
                    this.world.setComponentData(entities[0], dir)

                    // set flip direction
                    this.world.usingComponentData(
                        entities[0],
                        [ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale],
                        (transformLocalPosition, transformLocalScale) => {
                            transformLocalPosition.position = pos
                            console.log(`spawn at position: [${transformLocalPosition.position.x},${transformLocalPosition.position.y}]`)

                            const scale = transformLocalScale.scale
                            // TODO: should remove after boss sprite got flipped.
                            if (spawnIndex === 0) {
                                if (spawner.group === bossGroup) {
                                    scale.x = scale.x > 0 ? -scale.x : scale.x
                                } else {
                                    scale.x = Math.abs(scale.x)
                                }
                            } else {
                                if (spawner.group === bossGroup) {
                                    scale.x = scale.x > 0 ? scale.x : -scale.x
                                } else {
                                    scale.x = scale.x > 0 ? -scale.x : scale.x
                                }
                            }

                            transformLocalScale.scale = scale;
                        }
                    )
                }
            )
        }
    }
}
