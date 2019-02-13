namespace com.clockupstudio.player {

    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults, game.UnitStatus, ut.Core2D.TransformLocalPosition, ut.Core2D.TransformLocalScale],
                (_, overlapResults, status, position, scale) => {
                    status.health -= 1;
                    status.damaged = true;
                    position.position = this.calculateReactionDirection(position.position, scale.scale);
                }
            )
        }

        private calculateReactionDirection(position: Vector3, direction: Vector3): Vector3 {
            return new Vector3(position.x+(-1*direction.x), position.y, position.z);
        }
    }
}
