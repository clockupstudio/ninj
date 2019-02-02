namespace com.clockupstudio.player {

    export class HitSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults],
                (_, overlapResults) => {
                    console.log(overlapResults.overlaps)
                }
            )
        }
    }
}
