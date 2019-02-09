namespace game {

    export interface GameState {
        OnUpdate(world: ut.World): GameState;
    }
    
    export class InitPlay implements GameState {

        OnUpdate(world: ut.World): GameState {
            ut.EntityGroup.instantiate(world, 'game.GameScene');
            ut.EntityGroup.instantiate(world, 'game.BossGroup');
            ut.EntityGroup.instantiate(world, 'game.EnemyGroup');

            world.forEach([ut.Core2D.Camera2D], (camera) => {
                camera.backgroundColor = new ut.Core2D.Color(199 / 255, 240 / 255, 216 / 255, 1);
            });

            return new PlayState();
        }
    }

    export class PlayState implements GameState {
        OnUpdate(world: ut.World): GameState {
            let nextState: GameState = this;

            world.forEach(
                [game.PlayerTag, game.UnitStatus],
                (_, status) => {
                    if (status.health <= 0) {
                        nextState = new InitGameOver();
                    }
                }
            )
            return nextState;
        }
    }

    export class InitGameOver implements GameState {
        OnUpdate(world: ut.World): GameState {
            ut.EntityGroup.destroyAll(world, 'game.GameScene');
            ut.EntityGroup.destroyAll(world, 'game.BossGroup');
            ut.EntityGroup.destroyAll(world, 'game.EnemyGroup');

            ut.EntityGroup.instantiate(world, 'game.GameOverScene');

            world.forEach([ut.Core2D.Camera2D], (camera) => {
                camera.backgroundColor = new ut.Core2D.Color(67 / 255, 82 / 255, 61 / 255, 1);
            });

            return new GameOverState();
        }

    }

    export class GameOverState implements GameState {

        private restartKey = ut.Core2D.KeyCode.Return;

        OnUpdate(world: ut.World): GameState {
            if (ut.Runtime.Input.getKeyUp(this.restartKey)) {
                ut.EntityGroup.destroyAll(world, 'game.GameOverScene');
                return new InitPlay();
            }
            
            return this;
        }

    }


}