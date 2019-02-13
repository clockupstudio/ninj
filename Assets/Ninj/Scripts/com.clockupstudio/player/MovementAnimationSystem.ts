namespace com.clockupstudio.player {

    export class MovementAnimationSystem extends ut.ComponentSystem {

        private state: PlayerState = new NormalState();

        OnUpdate(): void {
            this.state = this.state.OnUpdate(this.world);
        }
    }
}
