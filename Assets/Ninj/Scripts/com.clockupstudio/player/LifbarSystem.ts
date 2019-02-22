namespace com.clockupstudio.player {

    @ut.requiredComponents(game.LifebarRenderer)
    export class LifebarSystem extends ut.ComponentSystem {

        OnUpdate(): void {
            //Query health
            let health = 0;
            this.world.forEach(
                [game.PlayerTag, game.UnitStatus],
                (_, unitStatus)=>{
                    health = unitStatus.health;
                });

            //Render by health
            this.world.forEach(
                [game.LifebarRenderer],
                (lifebar) => {
                    lifebar.points.forEach((point, index) => {

                        let spriteRenderer = this.world.getComponentData(point, ut.Core2D.Sprite2DRenderer);

                        if(index < health){
                            spriteRenderer.color.a = 1;
                        } else {
                            spriteRenderer.color.a = 0;
                        }

                        this.world.setComponentData(point, spriteRenderer);
                    });
                });
        }

    }
}