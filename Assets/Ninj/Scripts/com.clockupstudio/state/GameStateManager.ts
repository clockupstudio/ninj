namespace game {

    @ut.executeAfter(ut.Shared.UserCodeStart)
    export class GameStateManager extends ut.ComponentSystem {

        private state: GameState = new InitPlay();

        OnUpdate(): void {
            this.state = this.state.OnUpdate(this.world);
        }
    }
}
