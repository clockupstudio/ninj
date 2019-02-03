namespace com.clockupstudio.player {

    export class IncreaseCollisionnAttackSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            this.world.forEach(
                [game.PlayerTag, game.InputAttack, ut.HitBox2D.RectHitBox2D],
                (_, inputAttack, rectHitBox2D) => {
                    const box = rectHitBox2D.box

                    if (inputAttack.pressed) {
                        box.width = 2.5
                    } else {
                        box.width = 1
                    }

                    rectHitBox2D.box = box
                    console.log(`expand hit box width to: ${rectHitBox2D.box.width}`)
                }
            )
        }
    }
}
