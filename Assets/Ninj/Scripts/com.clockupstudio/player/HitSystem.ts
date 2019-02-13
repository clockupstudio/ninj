namespace com.clockupstudio.player {

    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults, game.UnitStatus, ut.Core2D.TransformLocalPosition, game.InputDirection],
                (_, overlapResults, status, transform, direction) => {
                    status.health -= 1;
                    status.damaged = true;
                    transform.position = this.calculateReactionDirection(transform.position, direction.direction);
                }
            )
        }

        private calculateReactionDirection(position: Vector3, direction: Vector2): Vector3 {
            return new Vector3(position.x+(-1*direction.x), position.y, position.z);
        }
    }
}
