namespace com.clockupstudio.player {

    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults, game.UnitStatus],
                (_, overlapResults, status) => {
                    status.health -= 1;
                    status.damaged = true;
                }
            )
        }
    }
}
