namespace com.clockupstudio.player {

    export class MovementAnimationSystem extends ut.ComponentSystem {

        private state: PlayerAnimationState = new NormalState();

        OnUpdate(): void {
            this.state = this.state.OnUpdate(this.world);
        }
    }
}
