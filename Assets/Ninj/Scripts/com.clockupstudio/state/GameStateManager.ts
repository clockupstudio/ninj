namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    export class GameStateManager extends ut.ComponentSystem {

        private state: string = "INIT";
        private restartKey = ut.Core2D.KeyCode.Return;

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
                        camera.backgroundColor = new ut.Core2D.Color(67 / 255, 82 / 255, 61 / 255, 1);
                    });

                    this.state = "GAMEOVER";
                }
            }

            if (this.state == "GAMEOVER") {

                if (ut.Runtime.Input.getKeyUp(this.restartKey)) {
                    ut.EntityGroup.destroyAll(this.world, 'game.GameOverScreen');

                    ut.EntityGroup.instantiate(this.world, 'game.GameScene');
                    ut.EntityGroup.instantiate(this.world, 'game.BossGroup');
                    ut.EntityGroup.instantiate(this.world, 'game.EnemyGroup');

                    this.world.forEach([ut.Core2D.Camera2D], (camera) => {
                        camera.backgroundColor = new ut.Core2D.Color(199 / 255, 240 / 255, 216 / 255, 1);
                    });

                    this.state = "PLAY";
                }
            }
        }

    }
}
