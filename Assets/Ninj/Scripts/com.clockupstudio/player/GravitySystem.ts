namespace com.clockupstudio.player {
    export class GravitySystem extends ut.ComponentSystem {
        
        OnUpdate(): void {
            const dt = this.scheduler.deltaTime();
            this.world.forEach(
                [game.PlayerTag, ut.Core2D.TransformLocalPosition, game.Gravity, game.Falling],
                (_, transform, gravity) =>{
                    let pos = transform.position;
                    pos.y -= gravity.fallSpeed * 1 * dt;
                    transform.position = pos;
                }
            );
        }

    }
}