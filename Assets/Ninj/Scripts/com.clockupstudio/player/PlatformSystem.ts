namespace com.clockupstudio.player {

    export class PlatformHitSystem extends ut.ComponentSystem {

        OnUpdate(): void {

            let groundedStatus = false;

            this.world.forEach(
                [game.PlayerTag, ut.HitBox2D.HitBoxOverlapResults],
                (_, overlapResults) => {
                    console.log("OVERLAPPED FOUNDED")
                    overlapResults.overlaps.forEach((v) => {
                        if (this.world.hasComponent(v.otherEntity, game.PlatformTag)) {
                            groundedStatus = true;
                        }
                    })
                }
            );

            this.SetGroundedStatus(groundedStatus);
        }

        SetGroundedStatus(status:boolean) {
            this.world.forEach(
                [game.PlayerTag, game.UnitStatus],
                (_, u) => {
                    u.grounded = status
                }
            );
        }
    }
}