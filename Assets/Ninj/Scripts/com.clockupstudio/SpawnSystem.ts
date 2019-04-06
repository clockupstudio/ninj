namespace com.clockupstudio {

    enum Side {
        Left,
        Right
    }

    function randomSide(): Side {
        return Math.random() > 0.5 ? Side.Right : Side.Left;
    }

    function setPositionFromSide(world: ut.World, entity: ut.Entity, side: Side) {
        let pos: Vector3;
        if (side == Side.Left) {
            pos = new Vector3(-10, 0);
        } else {
            pos = new Vector3(10, 0);
        }
        world.setComponentData(entity, new ut.Core2D.TransformLocalPosition(pos));
    }

    function setScaleFromSide(world: ut.World, entity: ut.Entity, side: Side) {
        world.usingComponentData(
            entity,
            [ut.Core2D.TransformLocalScale],
            (transformLocalScale) => {
                const scale = transformLocalScale.scale;
                if (side == Side.Left) {
                    scale.x = Math.abs(scale.x)
                } else {
                    scale.x = scale.x > 0 ? -scale.x : scale.x
                }
                transformLocalScale.scale = scale;
            })
    }

    function setDirectionFromSide(world: ut.World, entity: ut.Entity, side: Side) {
        let dir: Vector2;
        if (side == Side.Left) {
            dir = new Vector2(1, 0);
        } else {
            dir = new Vector2(-1, 0);
        }

        util.EntityUtil.addComponent(world, entity, game.InputDirection);
        const inputDir = new game.InputDirection();
        inputDir.direction = dir;
        world.setComponentData(entity, inputDir);
    }

    /**
     * SpawnSystem spawn an enemy and random position that it spawn.
     */
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

                    let entities = ut.EntityGroup.instantiate(this.world, spawner.group);
                    if (entities.length == 0) {
                        console.log('cannot find entity group');
                    }

                    const side = randomSide();
                    setPositionFromSide(this.world, entities[0], side);
                    setScaleFromSide(this.world, entities[0], side);
                    setDirectionFromSide(this.world, entities[0], side);
                }
            )
        }
    }
}
