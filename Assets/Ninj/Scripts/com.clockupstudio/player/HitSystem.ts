namespace com.clockupstudio.player {

    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults, game.UnitStatus, ut.Core2D.TransformLocalPosition],
                (_, overlapResults, status, transform) => {
                    status.health -= 1;
                    status.damaged = true;
                    transform.position = new Vector3(transform.position.x-1, transform.position.y, transform.position.z)
                }
            )
        }
    }
}
