namespace com.clockupstudio.player {

    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults, game.UnitStatus],
                (_, overlapResults, status) => {
                    console.log(overlapResults.overlaps)

                    status.health -= 1;

                    console.log(`Setting damaged before=${status.damaged}`);
                    status.damaged = true;
                }
            )
        }
    }
}
