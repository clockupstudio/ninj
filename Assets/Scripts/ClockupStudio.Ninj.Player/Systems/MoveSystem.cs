using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using Unity.Entities;
using ClockupStudio.Ninj.Player.Components;

namespace ClockupStudio.Ninj.Player.Systems
{
    [UpdateAfter(typeof(MoveInputSystem))]
    public class MoveSystem : ComponentSystem
    {
        protected override void OnUpdate()
        {
            var dt = Time.deltaTime;
            ForEach((Movement movement, Transform transform, Rigidbody2D rb) =>
            {
                if (!movement.PressedMove)
                {
                    return;
                }
                rb.MovePosition(new Vector2(transform.position.x + (movement.Direction.x * movement.Speed * dt), 0));
            });
        }
    }

}
