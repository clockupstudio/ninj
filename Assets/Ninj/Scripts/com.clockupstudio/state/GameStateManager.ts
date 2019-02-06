namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    //@ut.executeAfter(game.DamageSystem)
    @ut.executeBefore(ut.Shared.UserCodeEnd)
    export class GameManagerSystem extends ut.ComponentSystem {
        
        private state: string = "INIT";

        OnUpdate(): void {
            if (this.state == "INIT") {
                ut.EntityGroup.instantiate(this.world, 'game.GameScene');
                this.state = "PLAY";
            }

            if (this.state == "PLAY") {
                if (ut.Runtime.Input.getMouseButtonDown(0)) {
                    ut.EntityGroup.destroyAll(this.world, 'game.GameScene');
                    ut.EntityGroup.destroyAll(this.world, 'game.BossGroup');
                    ut.EntityGroup.destroyAll(this.world, 'game.EnemyGroup');

                    ut.EntityGroup.instantiate(this.world, 'game.GameOverScreen');

                    this.world.forEach([ut.Core2D.Camera2D], (camera) => {
                        camera.backgroundColor = new ut.Core2D.Color(67/255, 82/255, 61/255, 1);
                    });

                    this.state = "GAMEOVER";
                }
            }
        }
        
    }
}
