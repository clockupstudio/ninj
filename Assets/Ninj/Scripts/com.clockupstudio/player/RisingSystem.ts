namespace com.clockupstudio.player {

    export class RisingSystem extends ut.ComponentSystem {

        jumpLimit: number = 2.5;

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.Input, game.Rising, ut.Core2D.TransformLocalPosition, ut.Entity],
                (_, input, rising, transform, entity) => {

                    if (ut.Runtime.Input.getKey(input.jump)) {

                        let pos = transform.position;
                        const dt = this.scheduler.deltaTime();
                        pos.y = pos.y + (20 * dt);

                        transform.position = pos

                        if (pos.y > this.jumpLimit) {
                            this.beginFall(entity);
                            return;
                        }
                    }

                    if (ut.Runtime.Input.getKeyUp(input.jump)) {
                        this.beginFall(entity);
                    }
                });
        }

        beginFall(entity: ut.Entity): void {
            com.clockupstudio.util.EntityUtil.removeComponent(this.world, entity, game.Rising);
            com.clockupstudio.util.EntityUtil.addComponent(this.world, entity, game.Falling);
        }
    }
}
