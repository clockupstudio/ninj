namespace com.clockupstudio.player {
    export class SlashHitDetectionSystem extends ut.ComponentSystem {
        OnUpdate(): void {
            // we needs to query player entity not slash effect. Because slash effect
            // position depends on player position and it's not changed.
            this.world.forEach(
                [game.Slash, game.PreviousDirection, ut.Core2D.TransformLocalPosition],
                (slash, previousDir, transformLocalPosition) => {
                    // active only slash got enable.
                    if (this.world.hasComponent(slash.entity, ut.Disabled)) {
                        return;
                    }

                    const cam = this.world.getEntityByName("Camera");
                    if (cam.isNone()) {
                        console.error("[SlashHitDetectionSystem] camera not found.");
                        return;
                    }

                    // calculate raycast position.
                    const dir = previousDir.direction;
                    const pos = transformLocalPosition.position
                    const end = new Vector3().copy(pos);
                    if (dir.x < 0) {
                        end.x -= 2.5
                    } else {
                        end.x += 2.5
                    }

                    const result = ut.HitBox2D.HitBox2DService.rayCast(this.world, pos, end, cam);
                    if (result.entityHit.isNone()) {
                        console.debug('[SlashHitDetectionSystem] no hit detect');
                        return;
                    }

                    if (this.world.getEntityName(result.entityHit) === 'Enemy') {
                        util.EntityUtil.addComponent(this.world, result.entityHit, game.EnemyDead);
                    }
                });
        }
    }
}
